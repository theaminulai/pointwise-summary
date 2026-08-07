import { __ } from '@wordpress/i18n';
import type * as React from 'react';
import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAdvancedSettingsUpdate } from '../../hooks/useAdvancedSettingsUpdate';
import { setAdvancedExclusion } from '../../store/advancedSettings.actions';
import type { RootState } from '../../store/types';

/**
 * Handles exclusion IDs that should not display summary buttons.
 */
export const ExclusionSystem: React.FC = () => {
	const inputId = useId();
	const dispatch = useDispatch();
	const { persistSettings } = useAdvancedSettingsUpdate();
	const excludedIds = useSelector(
		( state: RootState ) => state.advancedSettings.exclusion.excludedIds
	);

	/**
	 * Updates exclusion IDs and persists exclusion settings.
	 * @param nextExcludedIds
	 */
	const handleExcludedIdsChange = ( nextExcludedIds: string ) => {
		dispatch(
			setAdvancedExclusion( {
				excludedIds: nextExcludedIds,
			} )
		);
		void persistSettings( {
			exclusion: {
				excludedIds: nextExcludedIds,
			},
		} );
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<h3 className="text-gray-900 mb-4">
				{ __( 'Exclusion System', 'pointwise-summary' ) }
			</h3>

			<div className="space-y-4">
				<div>
					<label
						htmlFor={ inputId }
						className="block text-sm font-medium text-gray-900 mb-2"
					>
						{ __(
							'Exclude Specific Posts/Pages by ID',
							'pointwise-summary'
						) }
					</label>
					<input
						id={ inputId }
						type="text"
						value={ excludedIds }
						onChange={ ( e ) =>
							handleExcludedIdsChange( e.target.value )
						}
						placeholder={ __(
							'e.g., 12, 45, 789',
							'pointwise-summary'
						) }
						className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
					<p className="text-xs text-gray-500 mt-1">
						{ __(
							"Enter post/page IDs separated by commas. Summary buttons won't appear on these posts.",
							'pointwise-summary'
						) }
					</p>
				</div>
			</div>
		</div>
	);
};
