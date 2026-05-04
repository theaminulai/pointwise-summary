import { __ } from '@wordpress/i18n';
import type * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { aiSettingsApi } from '../../services/api';
import { setAiSettings } from '../../store/aiSettings.actions';
import { ResetButton, Title } from '../common';
import { AIPlatforms } from './AIPlatforms';
import { GlobalPromptTemplate } from './GlobalPromptTemplate';
import { GlobalSettings } from './GlobalSettings';

/**
 * AISettings Component.
 * 
 * Main entry point for the AI Settings page.
 * Handles the initial data fetch and global reset functionality.
 *
 * @returns The rendered component.
 */
export const AISettings: React.FC = () => {
	const dispatch = useDispatch();
	const [ isLoading, setIsLoading ] = useState( false );

	/**
	 * Handles resetting all AI settings.
	 * Triggers the API reset and updates the local Redux state with the new defaults.
	 */
	const handleReset = async () => {
		setIsLoading( true );
		try {
			const data = await aiSettingsApi.reset();
			if (data) {
				dispatch( setAiSettings( data ) );
			}
		} finally {
			setIsLoading( false );
		}
	};

	return (
		<div className="space-y-8">
			{ /* Header */ }
			<Title
				title={ __( "AI Settings", 'pointwise-summary' ) }
				description={ __( "Configure AI platforms and customize prompts for summary generation", 'pointwise-summary' ) }
			/>

			{ /* Global Settings */ }
			<GlobalSettings />

			{ /* Global Prompt Template */ }
			<GlobalPromptTemplate />

			{ /* AI Platforms */ }
			<AIPlatforms />

			<ResetButton
				handleReset={ () => void handleReset() }
				isLoading={ isLoading }
				resetLabel={ __( 'Reset AI Settings', 'pointwise-summary' ) }
			/>
		</div>
	);
};
