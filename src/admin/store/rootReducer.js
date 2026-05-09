/**
 * rootReducer.js
 *
 * Root reducer combining all reducers in the application.
 */

import { combineReducers } from 'redux';
import advancedSettingsReducer from './advancedSettings.reducer';
import aiSettingsReducer from './aiSettings.reducer';
import analyticsReducer from './analytics.reducer';
import displaySettingsReducer from './displaySettings.reducer';
import helpReducer from './help.reducer';
import overviewReducer from './overview.reducer';
import socialSharingReducer from './socialSharing.reducer';
import uiReducer from './ui.reducer';

const rootReducer = combineReducers( {
	advancedSettings: advancedSettingsReducer,
	aiSettings: aiSettingsReducer,
	analytics: analyticsReducer,
	displaySettings: displaySettingsReducer,
	help: helpReducer,
	overview: overviewReducer,
	socialSharing: socialSharingReducer,
	ui: uiReducer,
} );

export default rootReducer;
