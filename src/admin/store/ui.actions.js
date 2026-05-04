/**
 * ui.actions.js
 *
 * Redux action creators for UI state management.
 */

// Action Types
export const TOGGLE_MOBILE_MENU = 'TOGGLE_MOBILE_MENU';
export const SET_MOBILE_MENU = 'SET_MOBILE_MENU';

// Action Creators
export const toggleMobileMenu = () => ( {
	type: TOGGLE_MOBILE_MENU,
} );

export const setMobileMenu = ( isOpen ) => ( {
	type: SET_MOBILE_MENU,
	payload: isOpen,
} );
