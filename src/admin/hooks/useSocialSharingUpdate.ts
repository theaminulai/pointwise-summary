import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { socialSharingApi } from '../services/api';
import { setSocialSharing } from '../store/socialSharing.actions';
import type { RootState } from '../store/types';
import { __ } from '@wordpress/i18n';
/**
 * Hook for managing persistence of social sharing settings.
 *
 * Saves and resets social-sharing settings via REST API,
 * then keeps Redux state in sync with server responses.
 */
export function useSocialSharingUpdate() {
	const dispatch = useDispatch();
	const socialSharing = useSelector(
		( state: RootState ) => state.socialSharing
	);
	const [ isSaving, setIsSaving ] = useState( false );

	const persistSettings = useCallback(
		async (
			overrideSettings?: Partial< RootState[ 'socialSharing' ] >
		) => {
			setIsSaving( true );
			try {
				const payload = {
					...socialSharing,
					...overrideSettings,
				};
				const data = await socialSharingApi.update( payload );

				if ( data ) {
					dispatch( setSocialSharing( data ) );
				}
			} catch ( error ) {
				toast.error(
					__(
						'Failed to save social sharing settings. Please try again.',
						'pointwise-summary'
					)
				);
			} finally {
				setIsSaving( false );
			}
		},
		[ socialSharing, dispatch ]
	);

	return {
		persistSettings,
		isSaving,
		socialSharing,
	};
}
