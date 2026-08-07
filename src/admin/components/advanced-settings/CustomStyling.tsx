import Editor from '@monaco-editor/react';
import { __ } from '@wordpress/i18n';
import { Save } from 'lucide-react';
import type * as React from 'react';
import { useEffect, useId, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAdvancedSettingsUpdate } from '../../hooks/useAdvancedSettingsUpdate';
import type { RootState } from '../../store/types';

/**
 * Provides editable custom styling fields and explicit save action.
 */
export const CustomStyling: React.FC = () => {
	const styling = useSelector(
		( state: RootState ) => state.advancedSettings.styling
	);
	const { isSaving, persistSettings } = useAdvancedSettingsUpdate();
	const classInputId = useId();
	const [ draftStyling, setDraftStyling ] = useState( styling );

	useEffect( () => {
		setDraftStyling( styling );
	}, [ styling ] );

	const { customCssClass, customCss } = draftStyling;
	const hasChanges =
		draftStyling.customCssClass !== styling.customCssClass ||
		draftStyling.customCss !== styling.customCss;

	/**
	 * Merges partial styling updates into local draft state.
	 * @param changes
	 */
	const handleStylingChange = ( changes: Partial< typeof draftStyling > ) => {
		setDraftStyling( ( prev ) => ( {
			...prev,
			...changes,
		} ) );
	};

	/**
	 * Persists current styling draft to advanced settings.
	 */
	const handleSave = async () => {
		await persistSettings( {
			styling: draftStyling,
		} );
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<h3 className="text-gray-900 mb-4">
				{ __( 'Custom Styling', 'pointwise-summary' ) }
			</h3>

			<div className="space-y-4">
				<div>
					<label
						htmlFor={ classInputId }
						className="block text-sm font-medium text-gray-900 mb-2"
					>
						{ __( 'Custom CSS Class', 'pointwise-summary' ) }
					</label>
					<input
						id={ classInputId }
						type="text"
						value={ customCssClass }
						onChange={ ( e ) =>
							handleStylingChange( {
								customCssClass: e.target.value,
							} )
						}
						placeholder={ __(
							'e.g., my-custom-class',
							'pointwise-summary'
						) }
						className="w-full px-3! py-2.5! border! border-gray-300! rounded-lg text-sm focus-within:ring focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all"
					/>
					<p className="text-xs text-gray-500 mt-1">
						{ __(
							'Add a custom CSS class to summary buttons for advanced styling',
							'pointwise-summary'
						) }
					</p>
				</div>

				<div>
					{ /* Monaco's <Editor> manages its own internal textarea, so
					   this is a field caption rather than a <label for>. */ }
					<p
						id="pointwise-summary-custom-css-code-label"
						className="block text-sm font-medium text-gray-900 mb-2"
					>
						{ __( 'Custom CSS Code', 'pointwise-summary' ) }
					</p>
					<div
						role="group"
						aria-labelledby="pointwise-summary-custom-css-code-label"
						className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all"
					>
						<Editor
							height="400px"
							defaultLanguage="css"
							value={ customCss }
							onChange={ ( value ) =>
								handleStylingChange( {
									customCss: value || '',
								} )
							}
							theme="vs-light"
							options={ {
								minimap: { enabled: false },
								fontSize: 13,
								lineNumbers: 'on',
								roundedSelection: true,
								scrollBeyondLastLine: false,
								automaticLayout: true,
								tabSize: 2,
								wordWrap: 'on',
								padding: { top: 12, bottom: 12 },
								suggest: {
									showProperties: true,
									showValues: true,
								},
								bracketPairColorization: {
									enabled: true,
								},
							} }
						/>
					</div>
					<p className="text-xs text-gray-500 mt-2">
						{ __(
							'Write custom CSS to style summary buttons and elements. This CSS will be applied globally across your site. The editor supports syntax highlighting and auto-completion.',
							'pointwise-summary'
						) }
					</p>
					<div className="flex items-center justify-end gap-4">
						<button
							onClick={ () => void handleSave() }
							disabled={ isSaving || ! hasChanges }
							className={ `cursor-pointer px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-2 transition-colors ${
								isSaving || ! hasChanges
									? 'bg-indigo-400 cursor-not-allowed'
									: 'bg-indigo-600 hover:bg-indigo-700'
							}` }
						>
							<Save className="w-4 h-4" />
							{ isSaving
								? __( 'Saving…', 'pointwise-summary' )
								: __( 'Save Style', 'pointwise-summary' ) }
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
