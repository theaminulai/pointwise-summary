import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { displaySettingsApi } from '../services/api';
import { setDisplaySettings } from '../store/displaySettings.actions';
import type { RootState } from '../store/types';
import { __ } from '@wordpress/i18n';
/**
 * Hook for managing the persistence of display settings.
 *
 * Handles saving individual settings or whole groups to the WordPress database
 * and keeping the Redux store in sync with the server.
 *
 * @return Object containing persist function, loading state, and current settings.
 */
export function useDisplaySettingsUpdate() {
	const dispatch = useDispatch();
	const displaySettings = useSelector(
		( state: RootState ) => state.displaySettings
	);
	const [ isSaving, setIsSaving ] = useState( false );

	/**
	 * Persists the current display settings to the server.
	 *
	 * @param overrideSettings - Optional partial settings to merge before saving.
	 */
	const persistSettings = useCallback(
		async (
			overrideSettings?: Partial< RootState[ 'displaySettings' ] >
		) => {
			setIsSaving( true );
			try {
				const payload = {
					...displaySettings,
					...overrideSettings,
				};
				// We exclude UI-only state like activeTab and preview data from DB persistence
				const { activeTab, preview, ...dbPayload } = payload;

				const data = await displaySettingsApi.update( dbPayload );
				if ( data ) {
					dispatch( setDisplaySettings( data ) );
				}
			} catch ( error ) {
				toast.error(
					__(
						'Failed to save display settings. Please try again.',
						'pointwise-summary'
					)
				);
			} finally {
				setIsSaving( false );
			}
		},
		[ displaySettings, dispatch ]
	);

	return {
		persistSettings,
		isSaving,
		displaySettings,
	};
}
