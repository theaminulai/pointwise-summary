import { __ } from '@wordpress/i18n';
import { SlidersVertical } from 'lucide-react';
import type * as React from 'react';
import { useDispatch } from 'react-redux';

import { useAISettingsUpdate } from '../../hooks/useAISettingsUpdate';
import { setAiSettingField } from '../../store/aiSettings.actions';
import { Select, Toggle } from '../common';

/**
 * GlobalSettings Component.
 * 
 * Manages core AI behavior settings such as summary length,
 * heading inclusion, and metadata context.
 *
 * @returns The rendered component.
 */
export const GlobalSettings: React.FC = () => {
	const dispatch = useDispatch();
	const { aiSettings, persistSettings } = useAISettingsUpdate();
	const {
		summaryLength,
		includeHeadings,
		includeMetadata,
	} = aiSettings;

	/**
	 * Updates the global summary length and persists the change.
	 *
	 * @param value - The selected summary length (e.g., 'short', 'medium', 'detailed').
	 */
	const handleSummaryLengthChange = ( value: string ): void => {
		dispatch( setAiSettingField( 'summaryLength', value ) );
		void persistSettings( {
			summaryLength: value,
		} );
	};

	/**
	 * Updates whether to include heading structure in prompts and persists the change.
	 *
	 * @param value - True to include headings, false otherwise.
	 */
	const handleIncludeHeadingsChange = ( value: boolean ): void => {
		dispatch( setAiSettingField( 'includeHeadings', value ) );
		void persistSettings( {
			includeHeadings: value,
		} );
	};

	/**
	 * Updates whether to include metadata context in prompts and persists the change.
	 *
	 * @param value - True to include metadata, false otherwise.
	 */
	const handleIncludeMetadataChange = ( value: boolean ): void => {
		dispatch( setAiSettingField( 'includeMetadata', value ) );
		void persistSettings( {
			includeMetadata: value,
		} );
	};

	return (
		<div className="bg-white rounded-lg border border-gray-200">
			<div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 border-b border-gray-200">
				<span className="h-8 w-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
					<SlidersVertical className="w-5 h-5" />
				</span>
				<h3 className="text-gray-900 text-base! font-medium! m-0!">
					{ __( 'Summary Configuration', 'pointwise-summary' ) }
				</h3>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-6">
				{ /* LEFT SIDE */ }
				<div className="space-y-4">
					<Select
						label={ __( 'Default Summary Length', 'pointwise-summary' ) }
						value={ summaryLength }
						onChange={ handleSummaryLengthChange }
						options={ [
							{
								value: 'short',
								label: __( 'Short (2–3 points)', 'pointwise-summary' ),
								description: __(
									'A brief summary with the most essential points (150–250 words).',
									'pointwise-summary'
								),
							},
							{
								value: 'medium',
								label: __( 'Medium (3–5 points)', 'pointwise-summary' ),
								description: __(
									'A balanced summary with key points (250–350 words).',
									'pointwise-summary'
								),
							},
							{
								value: 'detailed',
								label: __( 'Detailed (5–7 points)', 'pointwise-summary' ),
								description: __(
									'An in-depth summary covering all important aspects (350–500 words).',
									'pointwise-summary'
								),
							},
						] }
						className="max-w-full"
					/>
				</div>

				{ /* RIGHT SIDE */ }
				<div className="md:border-l md:border-gray-200 md:pl-6 gap-3 flex flex-col">
					<label className="block text-sm font-medium text-gray-900 pt-2.5">
						{ __( 'AI Prompts for better context', 'pointwise-summary' ) }
					</label>
					<Toggle
						checked={ includeHeadings }
						onChange={ handleIncludeHeadingsChange }
						label={ __( 'Include Heading Structure', 'pointwise-summary' ) }
						description={ __( 'Include H1, H2, H3 headings in AI prompts for better context', 'pointwise-summary' ) }
						className="border border-gray-200 p-4 rounded-lg"
					/>

					<Toggle
						checked={ includeMetadata }
						onChange={ handleIncludeMetadataChange }
						label={ __( 'Include Post Metadata', 'pointwise-summary' ) }
						description={ __( 'Include title, URL, and meta description in prompts', 'pointwise-summary' ) }
						className="border border-gray-200 p-4 rounded-lg"
					/>
				</div>
			</div>
		</div>
	);
};
