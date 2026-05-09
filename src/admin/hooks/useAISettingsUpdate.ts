import { __ } from '@wordpress/i18n';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { aiSettingsApi } from '../services/api';
import { setAiSettings } from '../store/aiSettings.actions';
import type { RootState } from '../store/types';

/**
 * Provides AI settings state and a persistence helper for the admin UI.
 *
 * The hook merges optional override values with the current Redux state,
 * saves the result via the API, and rehydrates the store from the API response.
 */
export function useAISettingsUpdate() {
	const dispatch = useDispatch();
	const aiSettings = useSelector( ( state: RootState ) => state.aiSettings );
	const [ isSaving, setIsSaving ] = useState( false );

	/**
	 * Saves AI settings and synchronizes Redux with the server response.
	 *
	 * @param overrideSettings Optional values to override current settings before save.
	 */
	const persistSettings = useCallback(
		async ( overrideSettings?: Partial< RootState[ 'aiSettings' ] > ) => {
			setIsSaving( true );
			try {
				const payload = {
					...aiSettings,
					...overrideSettings,
				};
				const data = await aiSettingsApi.update( payload );

				if ( data ) {
					dispatch( setAiSettings( data ) );
				}
			} catch ( error ) {
				toast.error(
					__(
						'Failed to save settings. Please try again.',
						'pointwise-summary'
					)
				);
			} finally {
				setIsSaving( false );
			}
		},
		[ aiSettings ]
	);

	return {
		persistSettings,
		isSaving,
		aiSettings,
	};
}
