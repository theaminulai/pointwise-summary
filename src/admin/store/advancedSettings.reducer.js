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
	postTypes: [],
	exclusion: {
		excludedIds: '',
	},
	styling: {
		customCss: '',
		customCssClass: '',
	},
	performance: {
		enableCache: false,
		cacheExpiry: 0,
		dataCleanup: false,
	},
	accessibility: {
		enableKeyboard: false,
		keyboardShortcut: '',
		enableRTL: false,
		enableAccessibility: false,
	},
	seo: {
		excludeNoindex: false,
		seoElement: 'link',
		noFollow: false,
		platform: [],
	},
	translations: [],
	editorSupport: [],
};

const advancedSettingsReducer = ( state = initialState, action ) => {
	switch ( action.type ) {
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
			if ( Array.isArray( action.payload ) ) {
				return {
					...state,
					editorSupport: action.payload,
				};
			}

			return {
				...state,
				editorSupport: Array.isArray( action.payload?.editorSupport )
					? action.payload.editorSupport
					: state.editorSupport,
			};

		default:
			return state;
	}
};

export default advancedSettingsReducer;
