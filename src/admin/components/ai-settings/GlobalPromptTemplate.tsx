import { __ } from '@wordpress/i18n';
import { Check } from 'lucide-react';
import type * as React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAISettingsUpdate } from '../../hooks/useAISettingsUpdate';
import {
	applyGlobalPromptToAll,
	setAiSettingField,
} from '../../store/aiSettings.actions';
import { Toggle } from '../common';

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
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const { aiSettings, persistSettings } = useAISettingsUpdate();
	const {
		globalPrompt,
		useGlobalPrompt,
		platforms,
	} = aiSettings;

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

		const start = textareaRef.current.selectionStart;
		const end = textareaRef.current.selectionEnd;
		const text = globalPrompt;
		const before = text.substring( 0, start );
		const after = text.substring( end, text.length );
		const newValue = before + variable + after;

		handleGlobalPromptChange( newValue );

		// Reset focus and selection
		setTimeout( () => {
			if ( textareaRef.current ) {
				textareaRef.current.focus();
				const newCursorPos = start + variable.length;
				textareaRef.current.setSelectionRange( newCursorPos, newCursorPos );
			}
		}, 0 );
	};

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6">
			<div className="flex items-start justify-between mb-4">
				<div className="flex-1">
					<h3 className="text-gray-900 m-0! mb-1">
						{ __( 'Global Prompt Template', 'pointwise-summary' ) }
					</h3>
					<p className="text-sm text-gray-600 m-0!">
						{ __(
							'Use the same prompt for all AI platforms, or customize individually per model',
							'pointwise-summary'
						) }
					</p>
				</div>
				<Toggle
					checked={ useGlobalPrompt }
					onChange={ handleUseGlobalPromptChange }
				/>
			</div>

			{ useGlobalPrompt && (
				<div className="mt-4 space-y-4 animate-in fade-in">
					<div>
						<label className="block text-sm font-medium text-gray-900 mb-2">
							{ __( 'Prompt for All Models', 'pointwise-summary' ) }
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
							className="w-full px-4 py-3 border-2 border-gray-300! rounded-lg! text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
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
										{ __( 'Save Global Prompt', 'pointwise-summary' ) }
									</button>
									<button
										onClick={ handleApplyGlobalPromptToAll }
										className="cursor-pointer px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-colors flex items-center gap-2"
									>
										<Check className="w-4 h-4" />
										{ __( 'Apply to All Models', 'pointwise-summary' ) }
									</button>
								</div>
							</div>
						
						<div className="text-xs">
							<div className="flex flex-wrap gap-2 mt-2">
								{ [
									'{title}',
									'{url}',
									'{content}',
									'{excerpt}',
									'{site_name}',
									'{language}',
									'{length}',
									'{headings}',
								].map( ( item ) => (
									<button
										key={ item }
										onClick={ () => insertVariable( item ) }
										className="cursor-pointer inline-block px-2! py-1! bg-blue-500/10 text-blue-600 rounded text-xs font-mono border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
									>
										{ item }
									</button>
								) ) }
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
