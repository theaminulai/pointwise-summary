/**
 * api.js
 *
 * API service layer for making HTTP requests.
 * Handles all communication with the WordPress REST API and external APIs.
 */

import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { toast } from 'sonner';
// Get API configuration from WordPress localized script
const getApiConfig = () => {
	if (typeof pointwiseSummary !== 'undefined') {
		return {
			apiRoot: pointwiseSummary.apiUrl,
			nonce: pointwiseSummary.nonce,
		};
	}
	return {
		apiRoot: '/wp-json/pointwise-summary/v1',
		nonce: '',
	};
};

const joinApiUrl = (root, endpoint) => {
	const normalizedRoot = root.endsWith('/') ? root.slice(0, -1) : root;
	return `${normalizedRoot}${endpoint}`;
};

const apiRequest = async (endpoint, options = {}) => {
	const { apiRoot, nonce } = getApiConfig();
	const headers = {
		...options.headers,
	};

	if (nonce) {
		headers['X-WP-Nonce'] = nonce;
	}

	try {
		const data = await apiFetch({
			...options,
			headers,
			url: joinApiUrl(apiRoot, endpoint),
		});
		return data?.data || data;
	} catch (error) {
		console.error('API Request Failed:', error);
		throw error;
	}
};

const getErrorDescription = (error) =>
	error instanceof Error ? error.message : __('Please try again.', 'pointwise-summary');

const safeApiRequest = async ({
	request,
	errorTitle,
	successTitle,
	successDescription,
}) => {
	try {
		const data = await request();
		if (successTitle) {
			toast.success(successTitle, {
				description: successDescription,
			});
		}
		return data;
	} catch (error) {
		toast.error(errorTitle, {
			description: getErrorDescription(error),
		});
		return null;
	}
};


/**
 * AI settings API methods
 */
export const aiSettingsApi = {
	get: () =>
		safeApiRequest({
			request: () => apiRequest('/ai-settings'),
			errorTitle: __('Failed to load AI settings', 'pointwise-summary'),
		}),
	update: (settings) =>
		safeApiRequest({
			request: () =>
				apiRequest('/ai-settings', {
					method: 'POST',
					data: settings,
				}),
			errorTitle: __('Failed to save AI settings', 'pointwise-summary'),
			successTitle: __('AI settings saved', 'pointwise-summary'),
			successDescription: __('Your AI configuration has been updated.', 'pointwise-summary'),
		}),
	reset: () =>
		safeApiRequest({
			request: () =>
				apiRequest('/ai-settings/reset', {
					method: 'POST',
				}),
			errorTitle: __('Failed to reset AI settings', 'pointwise-summary'),
			successTitle: __('AI settings reset to defaults', 'pointwise-summary'),
		}),
};

/**
 * Display settings API methods
 */
export const displaySettingsApi = {
	get: () =>
		safeApiRequest({
			request: () => apiRequest('/display-settings'),
			errorTitle: __('Failed to load display settings', 'pointwise-summary'),
		}),
	update: (settings) =>
		safeApiRequest({
			request: () =>
				apiRequest('/display-settings', {
					method: 'POST',
					data: settings,
				}),
			errorTitle: __('Failed to save display settings', 'pointwise-summary'),
			successTitle: __('Display settings saved', 'pointwise-summary'),
			successDescription: __('Your button display settings have been updated.', 'pointwise-summary'),
		}),
	reset: () =>
		safeApiRequest({
			request: () =>
				apiRequest('/display-settings/reset', {
					method: 'POST',
				}),
			errorTitle: __('Failed to reset display settings', 'pointwise-summary'),
			successTitle: __('Display settings reset to defaults', 'pointwise-summary'),
		}),
};

/**
 * Social sharing settings API methods
 */
export const socialSharingApi = {
	get: () =>
		safeApiRequest({
			request: () => apiRequest('/social-sharing'),
			errorTitle: __('Failed to load social sharing settings', 'pointwise-summary'),
		}),
	update: (settings) =>
		safeApiRequest({
			request: () =>
				apiRequest('/social-sharing', {
					method: 'POST',
					data: settings,
				}),
			errorTitle: __('Failed to save social sharing settings', 'pointwise-summary'),
			successTitle: __('Social sharing settings saved', 'pointwise-summary'),
			successDescription: __('Your social sharing configuration has been updated.', 'pointwise-summary'),
		}),
	reset: () =>
		safeApiRequest({
			request: () =>
				apiRequest('/social-sharing/reset', {
					method: 'POST',
				}),
			errorTitle: __('Failed to reset social sharing settings', 'pointwise-summary'),
			successTitle: __('Social sharing settings reset to defaults', 'pointwise-summary'),
		}),
};

/**
 * Advanced settings API methods
 */
export const advancedSettingsApi = {
	get: () =>
		safeApiRequest({
			request: () => apiRequest('/advanced-settings'),
			errorTitle: __('Failed to load advanced settings', 'pointwise-summary'),
		}),
	update: (settings) =>
		safeApiRequest({
			request: () =>
				apiRequest('/advanced-settings', {
					method: 'POST',
					data: settings,
				}),
			errorTitle: __('Failed to save advanced settings', 'pointwise-summary'),
			successTitle: __('Advanced settings saved', 'pointwise-summary'),
			successDescription: __('Your advanced configuration has been updated.', 'pointwise-summary'),
		}),
	reset: () =>
		safeApiRequest({
			request: () =>
				apiRequest('/advanced-settings/reset', {
					method: 'POST',
				}),
			errorTitle: __('Failed to reset advanced settings', 'pointwise-summary'),
			successTitle: __('Advanced settings reset to defaults', 'pointwise-summary'),
		}),
};

export const prefetchInitialApiData = async () => {
	await Promise.allSettled([
		aiSettingsApi.get(),
		displaySettingsApi.get(),
		socialSharingApi.get(),
		advancedSettingsApi.get(),
	]);
};

export default {
	aiSettingsApi,
	displaySettingsApi,
	socialSharingApi,
	advancedSettingsApi,
	prefetchInitialApiData,
};
