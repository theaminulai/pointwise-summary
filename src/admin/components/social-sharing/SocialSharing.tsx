import { __ } from '@wordpress/i18n';
import type * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocialSharingUpdate } from '../../hooks/useSocialSharingUpdate';
import { socialSharingApi } from '../../services/api';
import {
	setEnableSocialSharing,
	setSocialSharing,
} from '../../store/socialSharing.actions';
import type { RootState } from '../../store/types';
import { ResetButton, Title, Toggle } from '../common';
import { ButtonConfiguration } from './ButtonConfiguration';
import { ButtonPreview } from './ButtonPreview';
import { SocialNetworks } from './SocialNetworks';

export type ButtonOrder = 'social-first' | 'ai-first' | 'mixed';

export const SocialSharing: React.FC = () => {
	const dispatch = useDispatch();
	const { persistSettings } = useSocialSharingUpdate();
	const [ isLoading, setIsLoading ] = useState( false );
	const { enableSocialSharing } = useSelector(
		( state: RootState ) => state.socialSharing
	);

	const handleEnableSocialSharingChange = ( value: boolean ) => {
		dispatch( setEnableSocialSharing( value ) );
		void persistSettings( {
			enableSocialSharing: value,
		} );
	};

	const handleReset = async () => {
		setIsLoading( true );
		try {
			const data = await socialSharingApi.reset();
			if ( data ) {
				dispatch( setSocialSharing( data ) );
			}
		} finally {
			setIsLoading( false );
		}
	};

	return (
		<div className="space-y-8">
			{ /* Header */ }
			<Title
				title={ __( 'Social Sharing', 'pointwise-summary' ) }
				description={ __(
					'Configure social media sharing options alongside AI summaries',
					'pointwise-summary'
				) }
			/>

			{ /* Enable/Disable */ }
			<div className="bg-white rounded-lg border border-gray-200 p-6">
				<Toggle
					checked={ enableSocialSharing }
					onChange={ handleEnableSocialSharingChange }
					label={ __( 'Enable Social Sharing', 'pointwise-summary' ) }
					description={ __(
						'Add social sharing buttons alongside AI summary buttons',
						'pointwise-summary'
					) }
				/>
			</div>

			{ enableSocialSharing && (
				<>
					<SocialNetworks />
					<ButtonConfiguration />
					<ButtonPreview />
				</>
			) }

			<ResetButton
				handleReset={ () => void handleReset() }
				isLoading={ isLoading }
				resetLabel={ __( 'Reset Social Sharing', 'pointwise-summary' ) }
			/>
		</div>
	);
};
