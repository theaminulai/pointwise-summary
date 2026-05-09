import { __ } from '@wordpress/i18n';
import type * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { advancedSettingsApi } from '../../services/api';
import { setAdvancedSettings } from '../../store/advancedSettings.actions';
import { ResetButton, Title } from '../common';
import { Accessibility } from './Accessibility';
import { CustomStyling } from './CustomStyling';
import { EditorSupport } from './EditorSupport';
import { MultilingualSupport } from './MultilingualSupport';
import { PerformanceCaching } from './PerformanceCaching';
import { PostTypeControl } from './PostTypeControl';
import { SEOSetting } from './SEOSetting';

/**
 * Renders the complete advanced settings screen and coordinates reset behavior.
 */
export const AdvancedSettings: React.FC = () => {
	const dispatch = useDispatch();
	const [ isResetting, setIsResetting ] = useState( false );

	/**
	 * Resets advanced settings to server defaults and updates Redux state.
	 */
	const handleReset = async () => {
		setIsResetting( true );
		try {
			const data = await advancedSettingsApi.reset();
			if ( data ) {
				dispatch( setAdvancedSettings( data ) );
			}
		} finally {
			setIsResetting( false );
		}
	};

	return (
		<div className="space-y-8">
			{ /* Header */ }
			<Title
				title={ __( 'Advanced Settings', 'pointwise-summary' ) }
				description={ __(
					'Configure advanced options, Custom Styling, and popular editor support',
					'pointwise-summary'
				) }
			/>

			<PostTypeControl />
			{ /* <ExclusionSystem /> */ }
			<SEOSetting />
			<PerformanceCaching />
			<Accessibility />
			<CustomStyling />
			<MultilingualSupport />
			<EditorSupport />

			<ResetButton
				handleReset={ () => void handleReset() }
				isLoading={ isResetting }
				resetLabel={ __(
					'Reset All Advanced Settings',
					'pointwise-summary'
				) }
			/>
		</div>
	);
};
