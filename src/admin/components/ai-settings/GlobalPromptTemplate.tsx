import { __ } from '@wordpress/i18n';
import { Check, Cog } from 'lucide-react';
import type * as React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAISettingsUpdate } from '../../hooks/useAISettingsUpdate';
import {
	applyGlobalPromptToAll,
	setAiSettingField,
} from '../../store/aiSettings.actions';
import { insertVariableAtCursor } from '../../utils/insertVariableAtCursor';
import { Heading, Toggle } from '../common';
import PromptVariables from '../common/PromptVariables';

/**
 * GlobalPromptTemplate Component.
 *
 * Manages the sitewide system prompt used by all AI platforms.
 * Features cursor-aware variable insertion and draft/save management.
 *
 * @returns The rendered component.
 */
export const GlobalPromptTemplate: React.FC = () => {
	const dispatch = useDispatch();
	const textareaRef = useRef< HTMLTextAreaElement >( null );
	const { aiSettings, persistSettings } = useAISettingsUpdate();
	const { globalPrompt, useGlobalPrompt, platforms } = aiSettings;

	/**
	 * Updates the global summary prompt draft in Redux.
	 *
	 * @param value - The new prompt text.
	 */
	const handleGlobalPromptChange = ( value: string ): void => {
		dispatch( setAiSettingField( 'globalPrompt', value ) );
	};

	/**
	 * Toggles the use of the global prompt and persists the state.
	 *
	 * @param value - True to use global prompt, false for individual customization.
	 */
	const handleUseGlobalPromptChange = ( value: boolean ): void => {
		dispatch( setAiSettingField( 'useGlobalPrompt', value ) );
		void persistSettings( {
			useGlobalPrompt: value,
		} );
	};

	/**
	 * Force-applies the current global prompt to all individual platforms.
	 * Updates Redux state and persists to database.
	 */
	const handleApplyGlobalPromptToAll = (): void => {
		const nextPlatforms = platforms.map( ( platform ) => ( {
			...platform,
			prompt: globalPrompt,
		} ) );
		dispatch( applyGlobalPromptToAll() );
		void persistSettings( {
			platforms: nextPlatforms,
		} );
	};

	/**
	 * Persists the current global prompt draft to the server.
	 */
	const handleSaveGlobalPrompt = (): void => {
		void persistSettings( {
			globalPrompt,
		} );
	};

	/**
	 * Inserts a variable placeholder at the current cursor position in the textarea.
	 *
	 * @param variable - The variable placeholder to insert (e.g., '{title}').
	 */
	const insertVariable = ( variable: string ): void => {
		if ( ! textareaRef.current ) return;

		insertVariableAtCursor( {
			textarea: textareaRef.current,
			value: globalPrompt,
			variable,
			onChange: handleGlobalPromptChange,
		} );
	};

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6">
			<div className="flex items-center justify-between mb-4">
				<Heading
					icon={ Cog }
					isBorderless
					isPaddingless
					title={ __(
						'Use Global Prompt Template',
						'pointwise-summary'
					) }
					description={ __(
						'Enable the use of a single prompt for all AI platforms or customize individually per model',
						'pointwise-summary'
					) }
				/>
				<Toggle
					checked={ useGlobalPrompt }
					onChange={ handleUseGlobalPromptChange }
				/>
			</div>

			{ useGlobalPrompt && (
				<div className="mt-4 space-y-4 animate-in fade-in">
					<div>
						<label className="block text-sm font-medium text-gray-900 mb-2">
							{ __(
								'Prompt for All Models',
								'pointwise-summary'
							) }
						</label>
						<textarea
							ref={ textareaRef }
							value={ globalPrompt }
							onChange={ ( e ) =>
								handleGlobalPromptChange( e.target.value )
							}
							rows={ 8 }
							placeholder={ __(
								'Enter the prompt that will be used for all AI platforms...',
								'pointwise-summary'
							) }
							className="w-full px-4 py-3 border! border-gray-300! rounded-lg! text-sm focus:outline-none! focus:ring-2! focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
						/>
						<div className="flex items-center justify-between mt-2 gap-3">
							<p className="text-xs text-gray-500 m-0!">
								{ __(
									'This prompt will be applied to all enabled AI platforms. Click to insert variables ( Optional ):',
									'pointwise-summary'
								) }
							</p>
							<div className="flex items-center gap-2">
								<button
									onClick={ handleSaveGlobalPrompt }
									className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
								>
									{ __(
										'Save Global Prompt',
										'pointwise-summary'
									) }
								</button>
								<button
									onClick={ handleApplyGlobalPromptToAll }
									className="cursor-pointer px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-colors flex items-center gap-2"
								>
									<Check className="w-4 h-4" />
									{ __(
										'Apply to All Models',
										'pointwise-summary'
									) }
								</button>
							</div>
						</div>

						<div className="text-xs">
							<div className="flex flex-wrap gap-2 mt-2">
								<PromptVariables onInsert={ insertVariable } />
							</div>
						</div>
					</div>
				</div>
			) }

			{ ! useGlobalPrompt && (
				<div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg animate-in fade-in">
					<p className="text-sm text-gray-700">
						{ __(
							'Individual customization is enabled. Each AI platform below can have its own custom prompt.',
							'pointwise-summary'
						) }
					</p>
				</div>
			) }
		</div>
	);
};
