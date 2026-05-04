/**
 * aiSettings.actions.js
 *
 * Redux action creators for AI settings state management.
 */

export const SET_AI_SETTINGS = 'SET_AI_SETTINGS';
export const SET_EXPANDED_PLATFORM = 'SET_EXPANDED_PLATFORM';
export const SET_AI_SETTING_FIELD = 'SET_AI_SETTING_FIELD';
export const UPDATE_PLATFORM_PROMPT = 'UPDATE_PLATFORM_PROMPT';
export const TOGGLE_PLATFORM = 'TOGGLE_PLATFORM';
export const APPLY_GLOBAL_PROMPT_TO_ALL = 'APPLY_GLOBAL_PROMPT_TO_ALL';

export const setAiSettings = (settings) => ({
	type: SET_AI_SETTINGS,
	payload: settings,
});

export const setExpandedPlatform = (id) => ({
	type: SET_EXPANDED_PLATFORM,
	payload: id,
});

export const setAiSettingField = (field, value) => ({
	type: SET_AI_SETTING_FIELD,
	payload: { field, value },
});

export const updatePlatformPrompt = (id, prompt) => ({
	type: UPDATE_PLATFORM_PROMPT,
	payload: { id, prompt },
});

export const togglePlatform = (id) => ({
	type: TOGGLE_PLATFORM,
	payload: id,
});

export const applyGlobalPromptToAll = () => ({
	type: APPLY_GLOBAL_PROMPT_TO_ALL,
});
