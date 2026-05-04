/**
 * displaySettings.reducer.js
 *
 * Redux reducer for display settings state management.
 */
import { __ } from '@wordpress/i18n';
import {
	SET_ACTIVE_TAB,
	SET_DISPLAY_SETTING_FIELD,
	SET_DISPLAY_SETTINGS,
} from './displaySettings.actions';

const initialState = {
	activeTab: 'mode',
	mode: {},
	position: {},
	style: {},
	preview: {
		title: __('Sample Article Title', 'pointwise-summary'),
		body: __('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.', 'pointwise-summary'),
	},
};

const displaySettingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ACTIVE_TAB:
			return { ...state, activeTab: action.payload };

		case SET_DISPLAY_SETTING_FIELD:
			return {
				...state,
				[action.payload.group]: {
					...state[action.payload.group],
					[action.payload.field]: action.payload.value,
				},
			};

		case SET_DISPLAY_SETTINGS:
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};

export default displaySettingsReducer;
