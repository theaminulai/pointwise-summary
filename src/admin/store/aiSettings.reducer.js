/**
 * aiSettings.reducer.js
 *
 * Redux reducer for AI settings state management.
 */

import {
	APPLY_GLOBAL_PROMPT_TO_ALL,
	SET_AI_SETTINGS,
	SET_AI_SETTING_FIELD,
	SET_EXPANDED_PLATFORM,
	TOGGLE_PLATFORM,
	UPDATE_PLATFORM_PROMPT,
} from './aiSettings.actions';

const initialState = {
	summaryLength: '',
	includeHeadings: false,
	includeMetadata: false,
	globalPrompt: '',
	useGlobalPrompt: true,
	enableAiSummary: true,
	expandedPlatform: null,
	platforms: [],
};

const aiSettingsReducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case SET_AI_SETTING_FIELD:
			return { ...state, [ action.payload.field ]: action.payload.value };
		case SET_EXPANDED_PLATFORM:
			return {
				...state,
				expandedPlatform:
					state.expandedPlatform === action.payload
						? null
						: action.payload,
			};
		case TOGGLE_PLATFORM:
			return {
				...state,
				platforms: state.platforms.map( ( platform ) =>
					platform.id === action.payload
						? { ...platform, enabled: ! platform.enabled }
						: platform
				),
			};
		case UPDATE_PLATFORM_PROMPT:
			return {
				...state,
				platforms: state.platforms.map( ( platform ) =>
					platform.id === action.payload.id
						? { ...platform, prompt: action.payload.prompt }
						: platform
				),
			};
		case APPLY_GLOBAL_PROMPT_TO_ALL:
			return {
				...state,
				platforms: state.platforms.map( ( platform ) => ( {
					...platform,
					prompt: state.globalPrompt,
				} ) ),
			};
		case SET_AI_SETTINGS:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};

export default aiSettingsReducer;
