import { __, sprintf } from '@wordpress/i18n';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import type * as React from 'react';
import type { ComponentType } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAISettingsUpdate } from '../../hooks/useAISettingsUpdate';
import {
	setAiSettingField,
	setExpandedPlatform,
	togglePlatform,
	updatePlatformPrompt,
} from '../../store/aiSettings.actions';
import { insertVariableAtCursor } from '../../utils/insertVariableAtCursor';
import { Heading, Toggle } from '../common';
import { ChatGPT, Claude, Gemini, GoogleAI, Grok, Perplexity } from '../icons';
import PromptVariables from '../common/PromptVariables ';

/**
 * AIPlatforms Component.
 *
 * Manages individual AI models/providers.
 * Allows enabling/disabling specific platforms and overrides their prompts.
 *
 * @returns The rendered component.
 */
export const AIPlatforms: React.FC = () => {
	const dispatch = useDispatch();
	const { aiSettings, persistSettings } = useAISettingsUpdate();
	const { platforms, expandedPlatform, enableAiSummary } = aiSettings;
	const textareaRefs = useRef< Record< string, HTMLTextAreaElement | null > >(
		{}
	);

	/**
	 * Toggles the expanded/collapsed state of a platform settings card.
	 *
	 * @param id - The ID of the platform to toggle.
	 */
	const toggleExpanded = ( id: string ): void => {
		dispatch( setExpandedPlatform( id ) );
	};

	/**
	 * Enables or disables an AI platform and persists the configuration.
	 *
	 * @param id - The ID of the platform to toggle.
	 */
	const handleTogglePlatform = ( id: string ): void => {
		const nextPlatforms = platforms.map( ( platform ) =>
			platform.id === id
				? { ...platform, enabled: ! platform.enabled }
				: platform
		);
		dispatch( togglePlatform( id ) );
		void persistSettings( {
			platforms: nextPlatforms,
		} );
	};

	/**
	 * Updates the custom prompt draft for a specific AI platform.
	 *
	 * @param id - The ID of the platform.
	 * @param prompt - The new prompt text.
	 */
	const handleUpdatePlatformPrompt = ( id: string, prompt: string ): void => {
		dispatch( updatePlatformPrompt( id, prompt ) );
	};

	const handleInsertVariable = ( id: string, variable: string ) => {
		const platform = platforms.find( ( item ) => item.id === id );
		const currentPrompt = platform?.prompt ?? '';
		insertVariableAtCursor( {
			textarea: textareaRefs.current[ id ] ?? null,
			value: currentPrompt,
			variable,
			onChange: ( nextValue ) =>
				handleUpdatePlatformPrompt( id, nextValue ),
		} );
	};

	/**
	 * Toggles the use of the global prompt and persists the state.
	 *
	 * @param value - True to use global prompt, false for individual customization.
	 */
	const handleEnableAiSummary = ( value: boolean ): void => {
		dispatch( setAiSettingField( 'enableAiSummary', value ) );
		void persistSettings( {
			enableAiSummary: value,
		} );
	};
	const logoMap: Record< string, ComponentType< { className?: string } > > = {
		chatgpt: ChatGPT,
		gemini: Gemini,
		claude: Claude,
		perplexity: Perplexity,
		grok: Grok,
		'google-ai': GoogleAI,
	};

	return (
		<div className="bg-white rounded-lg border border-gray-200">
			{ /* <Heading
				icon={ Sparkles }
				title={ __( 'AI Platforms', 'pointwise-summary' ) }
				description={ __( 'Enable or disable AI platforms and customize prompts for each.', 'pointwise-summary' ) }
			/> */ }
			<div className="flex items-center justify-between p-4 sm:p-6">
				<Heading
					icon={ Sparkles }
					isBorderless
					isPaddingless
					title={ __( 'AI Platforms', 'pointwise-summary' ) }
					description={ __(
						'Enable or disable AI platforms and customize prompts for each.',
						'pointwise-summary'
					) }
				/>
				<Toggle
					checked={ enableAiSummary }
					onChange={ handleEnableAiSummary }
				/>
			</div>
			{ enableAiSummary && (
				<div className="divide-y divide-gray-200 border-t border-gray-200">
					{ platforms.map( ( platform ) => {
						const Logo = logoMap[ platform.logoKey ];

						return (
							<div key={ platform.id } className="p-6">
								<div className="flex items-start justify-between gap-4">
									<div className="flex items-start gap-4 flex-1">
										<div className="text-3xl">
											{ Logo && (
												<Logo className="w-10 h-10" />
											) }
										</div>
										<div className="flex-1">
											<h4 className="text-gray-900 m-0!">
												{ platform.name }
											</h4>
											<p className="text-sm text-gray-600 m-0! mt-1!">
												{ platform.description }
											</p>
										</div>
									</div>

									<div className="flex items-center gap-3">
										<button
											onClick={ () =>
												toggleExpanded( platform.id )
											}
											className="cursor-pointer p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
										>
											{ expandedPlatform ===
											platform.id ? (
												<ChevronUp className="w-4 h-4" />
											) : (
												<ChevronDown className="w-4 h-4" />
											) }
										</button>
										<Toggle
											checked={ platform.enabled }
											onChange={ () =>
												handleTogglePlatform(
													platform.id
												)
											}
										/>
									</div>
								</div>

								{ /* Expanded Settings */ }
								{ expandedPlatform === platform.id && (
									<div className="mt-4 pl-16 space-y-4">
										<div>
											<textarea
												ref={ ( element ) => {
													textareaRefs.current[
														platform.id
													] = element;
												} }
												value={ platform.prompt }
												onChange={ ( e ) =>
													handleUpdatePlatformPrompt(
														platform.id,
														e.target.value
													)
												}
												rows={ 8 }
												className="w-full px-3 py-2 border border-gray-300! rounded-lg! text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
												placeholder={ __(
													'Enter custom prompt for this AI platform...',
													'pointwise-summary'
												) }
											/>
											<div className="flex items-center justify-between mt-2">
												<div>
													<p className="text-xs text-gray-500 m-0! mb-1.5!">
														{ sprintf(
															aiSettings.useGlobalPrompt
																? __(
																		'Customizing this prompt will override the global prompt for %1$s. This prompt will be applied to all enabled AI platforms. Click to insert variables.',
																		'pointwise-summary'
																  )
																: __(
																		'This prompt will be used when generating summaries with %1$s. This prompt will be applied to all enabled AI platforms. Click to insert variables.',
																		'pointwise-summary'
																  ),
															platform.name
														) }
													</p>
													<PromptVariables
														onInsert={ (
															variable
														) =>
															handleInsertVariable(
																platform.id,
																variable
															)
														}
													/>
												</div>
												<button
													onClick={ () => {
														void persistSettings();
													} }
													className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-2 transition-colors bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
												>
													{ __(
														`Save Prompt for ${ platform.name }`,
														'pointwise-summary'
													) }
												</button>
											</div>
										</div>
									</div>
								) }
							</div>
						);
					} ) }
				</div>
			) }
		</div>
	);
};
