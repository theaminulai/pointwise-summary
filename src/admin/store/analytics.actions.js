/**
 * analytics.actions.js
 *
 * Redux action creators for analytics state management.
 */

export const SET_ANALYTICS_RANGE = 'SET_ANALYTICS_RANGE';
export const SET_ANALYTICS_CUSTOM_RANGE = 'SET_ANALYTICS_CUSTOM_RANGE';

export const setAnalyticsRange = (range) => ({
	type: SET_ANALYTICS_RANGE,
	payload: range,
});

export const setAnalyticsCustomRange = (payload) => ({
	type: SET_ANALYTICS_CUSTOM_RANGE,
	payload,
});
