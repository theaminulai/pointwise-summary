/**
 * advancedSettings.reducer.js
 *
 * Redux reducer for advanced settings state management.
 */

import {
	SET_ADVANCED_ACCESSIBILITY,
	SET_ADVANCED_EDITOR_SUPPORT,
	SET_ADVANCED_EXCLUSION,
	SET_ADVANCED_PERFORMANCE,
	SET_ADVANCED_POST_TYPES,
	SET_ADVANCED_SEO,
	SET_ADVANCED_SETTINGS,
	SET_ADVANCED_STYLING,
	SET_ADVANCED_TRANSLATIONS,
} from './advancedSettings.actions';

const initialState = {
	postTypes: [
		{ id: 'post', label: 'Posts', enabled: true },
		{ id: 'page', label: 'Pages', enabled: true },
		{ id: 'product', label: 'Products', enabled: false },
		{ id: 'portfolio', label: 'Portfolio', enabled: false },
	],
	exclusion: {
		excludedIds: '12, 45, 789',
	},
	styling: {
		customCss:
			'/* Add your custom CSS here */\n.pointwise-summary-btn {\n  /* Custom styles */\n}',
		customCssClass: 'my-custom-class',
	},
	performance: {
		enableCache: true,
		cacheExpiry: 24,
		dataCleanup: false,
	},
	accessibility: {
		enableKeyboard: true,
		keyboardShortcut: 'Alt+S',
		enableRTL: false,
		enableAccessibility: true,
	},
	seo: {
		excludeNoindex: true,
		seoElement: 'link',
		noFollow: true,
		platform: ['Yoast SEO', 'Rank Math', 'All in One SEO', 'SEOPress', 'The SEO Framework'],
	},
	translations: [
		{ locale: 'en_US', label: 'English', buttonText: 'AI Summary' },
		{ locale: 'es_ES', label: 'Spanish', buttonText: 'Resumen IA' },
		{ locale: 'fr_FR', label: 'French', buttonText: 'Resume IA' },
	],
	editorSupport: [
		{
			editor: 'classic',
			label: 'Classic Editor',
			description: 'Supports the traditional WordPress editor.',
			supported: true
		},
		{
			editor: 'block',
			label: 'Gutenberg Block Editor',
			description: 'Supports the modern Gutenberg block editor.',
			supported: true
		},
		{
			editor: 'elementor',
			label: 'Elementor Page Builder',
			description: 'Supports the Elementor page builder.',
			supported: true
		},
		{
			editor: 'other-builders',
			label: 'Other Page Builders',
			description: 'Supports other page builders. like Divi, Beaver Builder, etc.',
			supported: false
		}
	]
};

const advancedSettingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ADVANCED_SETTINGS:
			return {
				...state,
				...action.payload,
			};

		case SET_ADVANCED_POST_TYPES:
			return {
				...state,
				...action.payload,
			};

		case SET_ADVANCED_EXCLUSION:
			return {
				...state,
				exclusion: {
					...state.exclusion,
					...action.payload,
				},
			};

		case SET_ADVANCED_STYLING:
			return {
				...state,
				styling: {
					...state.styling,
					...action.payload,
				},
			};

		case SET_ADVANCED_PERFORMANCE:
			return {
				...state,
				performance: {
					...state.performance,
					...action.payload,
				},
			};

		case SET_ADVANCED_ACCESSIBILITY:
			return {
				...state,
				accessibility: {
					...state.accessibility,
					...action.payload,
				},
			};

		case SET_ADVANCED_SEO:
			return {
				...state,
				seo: {
					...state.seo,
					...action.payload,
				},
			};

		case SET_ADVANCED_TRANSLATIONS:
			return {
				...state,
				...action.payload,
			};
		case SET_ADVANCED_EDITOR_SUPPORT:
			if (Array.isArray(action.payload)) {
				return {
					...state,
					editorSupport: action.payload,
				};
			}

			return {
				...state,
				editorSupport: Array.isArray(action.payload?.editorSupport)
					? action.payload.editorSupport
					: state.editorSupport,
			};

		default:
			return state;
	}
};

export default advancedSettingsReducer;
