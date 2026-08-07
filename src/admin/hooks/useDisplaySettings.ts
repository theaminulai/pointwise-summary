import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setActiveTab,
	setDisplaySettingField,
} from '../store/displaySettings.actions';
import type { RootState } from '../store/types';
import { useDisplaySettingsUpdate } from './useDisplaySettingsUpdate';

/** The currently selected tab in the display settings panel. */
type ActiveTab = RootState[ 'displaySettings' ][ 'activeTab' ];

/**
 * Encapsulates all state and actions for the DisplaySettings feature.
 *
 * Keeps the component tree free of business logic by exposing only
 * stable, memoized callbacks alongside the current settings state.
 *
 * @return Settings state and action handlers.
 */
export function useDisplaySettings() {
	const dispatch = useDispatch();

	const settings = useSelector(
		( state: RootState ) => state.displaySettings
	);

	const { isSaving, persistSettings } = useDisplaySettingsUpdate();

	/**
	 * Dispatches a setting change for any group.
	 *
	 * @param group - The settings group (e.g., 'mode').
	 * @param field - The field within the group.
	 * @param value - The new value.
	 */
	const changeGroupSetting = useCallback(
		( group: string, field: string, value: unknown ) => {
			dispatch( setDisplaySettingField( group, field, value ) );
		},
		[ dispatch ]
	);

	/**
	 * Switches the active settings tab.
	 *
	 * @param tab - The tab to activate.
	 */
	const changeActiveTab = useCallback(
		( tab: ActiveTab ) => dispatch( setActiveTab( tab ) ),
		[ dispatch ]
	);

	return {
		settings,
		changeGroupSetting,
		changeActiveTab,
		isSaving,
		saveSettings: persistSettings,
	};
}
