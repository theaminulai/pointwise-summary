/**
 * displaySettings.actions.js
 *
 * Redux action creators for display settings state management.
 */

export const SET_DISPLAY_SETTINGS = 'SET_DISPLAY_SETTINGS';
export const SET_DISPLAY_SETTING_FIELD = 'SET_DISPLAY_SETTING_FIELD';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

/**
 * Updates the entire display settings state.
 *
 * @param {Object} settings - The new display settings object.
 * @return {{type: string, payload: Object}} Action object.
 */
export const setDisplaySettings = ( settings ) => ( {
	type: SET_DISPLAY_SETTINGS,
	payload: settings,
} );

/**
 * Updates a single setting field within a specific group.
 *
 * @param {string} group - The group key (e.g., 'style', 'mode').
 * @param {string} field - The field key within that group.
 * @param {*}      value - The new value.
 * @return {{type: string, payload: Object}} Action object.
 */
export const setDisplaySettingField = ( group, field, value ) => ( {
	type: SET_DISPLAY_SETTING_FIELD,
	payload: { group, field, value },
} );

/**
 * Sets the currently active navigation tab.
 *
 * @param {string} tab - The tab identifier.
 * @return {{type: string, payload: string}} Action object.
 */
export const setActiveTab = ( tab ) => ( {
	type: SET_ACTIVE_TAB,
	payload: tab,
} );
