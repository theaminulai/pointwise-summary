/**
 * advancedSettings.actions.js
 *
 * Redux action creators for advanced settings state management.
 */

export const SET_ADVANCED_POST_TYPES = 'SET_ADVANCED_POST_TYPES';
export const SET_ADVANCED_EXCLUSION = 'SET_ADVANCED_EXCLUSION';
export const SET_ADVANCED_STYLING = 'SET_ADVANCED_STYLING';
export const SET_ADVANCED_PERFORMANCE = 'SET_ADVANCED_PERFORMANCE';
export const SET_ADVANCED_ACCESSIBILITY = 'SET_ADVANCED_ACCESSIBILITY';
export const SET_ADVANCED_SEO = 'SET_ADVANCED_SEO';
export const SET_ADVANCED_TRANSLATIONS = 'SET_ADVANCED_TRANSLATIONS';
export const SET_ADVANCED_EDITOR_SUPPORT = 'SET_ADVANCED_EDITOR_SUPPORT';
export const SET_ADVANCED_SETTINGS = 'SET_ADVANCED_SETTINGS';

export const setAdvancedSettings = ( payload ) => ( {
	type: SET_ADVANCED_SETTINGS,
	payload,
} );

export const setAdvancedPostTypes = ( payload ) => ( {
	type: SET_ADVANCED_POST_TYPES,
	payload,
} );

export const setAdvancedExclusion = ( payload ) => ( {
	type: SET_ADVANCED_EXCLUSION,
	payload,
} );

export const setAdvancedStyling = ( payload ) => ( {
	type: SET_ADVANCED_STYLING,
	payload,
} );

export const setAdvancedPerformance = ( payload ) => ( {
	type: SET_ADVANCED_PERFORMANCE,
	payload,
} );

export const setAdvancedAccessibility = ( payload ) => ( {
	type: SET_ADVANCED_ACCESSIBILITY,
	payload,
} );

export const setAdvancedSeo = ( payload ) => ( {
	type: SET_ADVANCED_SEO,
	payload,
} );

export const setAdvancedTranslations = ( payload ) => ( {
	type: SET_ADVANCED_TRANSLATIONS,
	payload,
} );

export const setAdvancedEditorSupport = ( payload ) => ( {
	type: SET_ADVANCED_EDITOR_SUPPORT,
	payload,
} );
