import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	advancedSettingsApi,
	aiSettingsApi,
	displaySettingsApi,
	shortcodesApi,
	socialSharingApi,
	systemInfoApi,
} from '../services/api';
import { setAdvancedSettings } from '../store/advancedSettings.actions';
import { setAiSettings } from '../store/aiSettings.actions';
import { setDisplaySettings } from '../store/displaySettings.actions';
import { setShortcodeExamples, setSystemInfo } from '../store/help.actions';
import { setSocialSharing } from '../store/socialSharing.actions';
/**
 * Custom hook to fetch all initial application data.
 *
 * This hook handles fetching all initial configuration data (AI settings, Display settings, etc.)
 * from the WordPress REST API and populating the Redux store. It serves as the single
 * point of truth for data retrieval for the entire admin application.
 *
 * @returns Query state.
 * `isLoading`: True if any data is still being fetched.
 * `error`: Any error that occurred during the query.
 * `refetch`: Function to manually trigger a data refresh.
 */
export function useGetQuery() {
	const dispatch = useDispatch();
	const [ isLoading, setIsLoading ] = useState( true );
	const [ error, setError ] = useState< Error | null >( null );

	/**
	 * Fetches all required application data in parallel.
	 */
	const initializeData = useCallback( async () => {
		setIsLoading( true );
		setError( null );

		try {
			// Fetch all core settings in parallel
			const [
				aiSettings,
				displaySettings,
				socialSharingSettings,
				advancedSettings,
				shortcodeExamples,
				systemInfo,
			] = await Promise.all( [
				aiSettingsApi.get(),
				displaySettingsApi.get(),
				socialSharingApi.get(),
				advancedSettingsApi.get(),
				shortcodesApi.get(),
				systemInfoApi.get(),
			] );

			// Dispatch results to Redux if they exist
			if ( aiSettings ) {
				dispatch( setAiSettings( aiSettings ) );
			}

			if ( displaySettings ) {
				dispatch( setDisplaySettings( displaySettings ) );
			}

			if ( socialSharingSettings ) {
				dispatch( setSocialSharing( socialSharingSettings ) );
			}

			if ( advancedSettings ) {
				dispatch( setAdvancedSettings( advancedSettings ) );
			}

			// Help data (dispatch individually to match other APIs)
			if ( Array.isArray( shortcodeExamples ) ) {
				dispatch( setShortcodeExamples( shortcodeExamples ) );
			}
			if ( systemInfo ) {
				dispatch( setSystemInfo( systemInfo ) );
			}
		} catch ( err ) {
			console.error( 'Failed to initialize app data:', err );
			setError(
				err instanceof Error
					? err
					: new Error( 'Unknown initialization error' )
			);
		} finally {
			setIsLoading( false );
		}
	}, [ dispatch ] );

	// Run initialization once on mount
	useEffect( () => {
		void initializeData();
	}, [ initializeData ] );

	return {
		isLoading,
		error,
		refetch: initializeData,
	};
}
