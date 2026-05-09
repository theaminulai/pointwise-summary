import { __ } from '@wordpress/i18n';
import type * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocialSharingUpdate } from '../../hooks/useSocialSharingUpdate';
import { setButtonOrder } from '../../store/socialSharing.actions';
import type { RootState } from '../../store/types';
import { Select } from '../common';
import type { ButtonOrder } from './SocialSharing';

export const ButtonConfiguration: React.FC = () => {
	const dispatch = useDispatch();
	const { persistSettings } = useSocialSharingUpdate();
	const buttonOrder = useSelector(
		( state: RootState ) => state.socialSharing.buttonOrder
	);

	const handleButtonOrderChange = ( value: ButtonOrder ) => {
		dispatch( setButtonOrder( value ) );
		void persistSettings( {
			buttonOrder: value,
		} );
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<h3 className="text-gray-900 mb-4">
				{ __( 'Button Configuration', 'pointwise-summary' ) }
			</h3>

			<div className="space-y-6">
				<Select
					value={ buttonOrder }
					onChange={ ( value ) =>
						handleButtonOrderChange( value as ButtonOrder )
					}
					label={ __( 'Button Order', 'pointwise-summary' ) }
					options={ [
						{
							value: 'social-first',
							label: __( 'Social First', 'pointwise-summary' ),
							description: __(
								'Display social buttons before AI buttons',
								'pointwise-summary'
							),
						},
						{
							value: 'ai-first',
							label: __( 'AI First', 'pointwise-summary' ),
							description: __(
								'Display AI buttons before social buttons',
								'pointwise-summary'
							),
						},
						{
							value: 'mixed',
							label: __( 'Mixed', 'pointwise-summary' ),
							description: __(
								'Alternate between social and AI buttons',
								'pointwise-summary'
							),
						},
					] }
				/>
			</div>
		</div>
	);
};
