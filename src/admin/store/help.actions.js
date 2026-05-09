/**
 * help.actions.js
 *
 * Redux action creators for help data.
 */

export const SET_HELP_DATA = 'SET_HELP_DATA';

export const SET_SHORTCODE_EXAMPLES = 'SET_SHORTCODE_EXAMPLES';
export const SET_SYSTEM_INFO = 'SET_SYSTEM_INFO';

/**
 * Set help-related data (shortcodes, systemInfo, etc.).
 * @param {Object} data
 */
export const setHelpData = ( data ) => ( {
	type: SET_HELP_DATA,
	payload: data,
} );

/**
 * Set fetched shortcode examples
 * @param {Array} examples
 */
export const setShortcodeExamples = ( examples ) => ( {
	type: SET_SHORTCODE_EXAMPLES,
	payload: examples,
} );

/**
 * Set fetched system information
 * @param {Object} info
 */
export const setSystemInfo = ( info ) => ( {
	type: SET_SYSTEM_INFO,
	payload: info,
} );
