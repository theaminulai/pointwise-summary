/**
 * ui.reducer.js
 *
 * Redux reducer for UI state management.
 * Handles UI-related actions like mobile menu state, modals, etc.
 */

const initialState = {
	mobileMenuOpen: false,
	// Add other UI states here as needed
};

const uiReducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case 'TOGGLE_MOBILE_MENU':
			return {
				...state,
				mobileMenuOpen: ! state.mobileMenuOpen,
			};

		case 'SET_MOBILE_MENU':
			return {
				...state,
				mobileMenuOpen: action.payload,
			};

		default:
			return state;
	}
};

export default uiReducer;
