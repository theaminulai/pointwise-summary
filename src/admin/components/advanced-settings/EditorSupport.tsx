import { __ } from '@wordpress/i18n';
import type * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';

/**
 * Displays the detected editor integrations and whether each editor is supported.
 *
 * Reads support metadata from the advanced settings slice and renders a status
 * badge for each known editor.
 */
export const EditorSupport: React.FC = () => {
	const editorSupport = useSelector(
		( state: RootState ) => state.advancedSettings.editorSupport
	);
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<h3 className="text-gray-900 mb-4">
				{ __( 'Editor Support', 'pointwise-summary' ) }
			</h3>

			<div className="space-y-4">
				{ editorSupport.map( ( editor ) => (
					<div
						key={ editor.editor }
						className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
					>
						<div>
							<h4 className="text-sm font-medium text-gray-900 m-0.5!">
								{ editor.label }
							</h4>
							<p className="text-xs text-gray-500 m-0!">
								{ editor.description }
							</p>
						</div>
						<span
							className={ `px-3 py-1 text-xs rounded-full ${
								editor.supported
									? 'bg-green-100 text-green-800'
									: 'bg-red-100 text-red-800'
							}` }
						>
							{ editor.supported
								? __( 'Supported', 'pointwise-summary' )
								: __( 'Not Supported', 'pointwise-summary' ) }
						</span>
					</div>
				) ) }
			</div>
		</div>
	);
};
