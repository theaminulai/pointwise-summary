import { __ } from '@wordpress/i18n';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { advancedSettingsApi } from '../services/api';
import { setAdvancedSettings } from '../store/advancedSettings.actions';
import type { RootState } from '../store/types';

/**
 * Provides advanced settings state and persistence helpers for the admin UI.
 */
export function useAdvancedSettingsUpdate() {
	const dispatch = useDispatch();
	const advancedSettings = useSelector(
		( state: RootState ) => state.advancedSettings
	);
	const [ isSaving, setIsSaving ] = useState( false );

	/**
	 * Saves advanced settings and synchronizes Redux with the server response.
	 *
	 * @param overrideSettings Optional values to merge before save.
	 */
	const persistSettings = useCallback(
		async (
			overrideSettings?: Partial< RootState[ 'advancedSettings' ] >
		) => {
			setIsSaving( true );
			try {
				const payload = {
					...advancedSettings,
					...overrideSettings,
				};
				const data = await advancedSettingsApi.update( payload );
				if ( data ) {
					dispatch( setAdvancedSettings( data ) );
				}
			} catch ( error ) {
				toast.error(
					__(
						'Failed to save advanced settings. Please try again.',
						'pointwise-summary'
					)
				);
			} finally {
				setIsSaving( false );
			}
		},
		[ advancedSettings, dispatch ]
	);

	return {
		advancedSettings,
		isSaving,
		persistSettings,
	};
}
