import { __ } from '@wordpress/i18n';
import type * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAdvancedSettingsUpdate } from '../../hooks/useAdvancedSettingsUpdate';
import { setAdvancedPostTypes } from '../../store/advancedSettings.actions';
import type { RootState } from '../../store/types';

/**
 * Controls which post types display summary buttons.
 */
export const PostTypeControl: React.FC = () => {
	const dispatch = useDispatch();
	const { persistSettings } = useAdvancedSettingsUpdate();
	const postTypes = useSelector(
		( state: RootState ) => state.advancedSettings.postTypes
	);

	/**
	 * Toggles enabled state for a post type and persists the updated list.
	 */
	const handleTogglePostType = ( id: string ) => {
		const nextPostTypes = postTypes.map( ( type ) =>
			type.id === id ? { ...type, enabled: ! type.enabled } : type
		);
		dispatch( setAdvancedPostTypes( { postTypes: nextPostTypes } ) );
		void persistSettings( {
			postTypes: nextPostTypes,
		} );
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<h3 className="text-gray-900 mb-4">{ __( 'Post Type Control', 'pointwise-summary' ) }</h3>
			<p className="text-sm text-gray-600 mb-4">
				{ __( 'Select which post types should display summary buttons', 'pointwise-summary' ) }
			</p>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{ postTypes.map( ( type ) => (
					<label
						key={ type.id }
						className={ `flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
							type.enabled
								? 'border-indigo-500 bg-indigo-50'
								: 'border-gray-200'
						}` }
					>
						<span className="text-sm font-medium text-gray-900">
							{ type.label }
						</span>
						<input
							type="checkbox"
							checked={ type.enabled }
							onChange={ () =>
								handleTogglePostType( type.id )
							}
							className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
						/>
					</label>
				) ) }
			</div>
		</div>
	);
};