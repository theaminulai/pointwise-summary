import { __ } from '@wordpress/i18n';
import { Plus, Save, X } from 'lucide-react';
import type * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAdvancedSettingsUpdate } from '../../hooks/useAdvancedSettingsUpdate';
import type { RootState } from '../../store/types';

/**
 * Manages multilingual button label overrides with explicit save behavior.
 */
export const MultilingualSupport: React.FC = () => {
	const translations = useSelector(
		( state: RootState ) => state.advancedSettings.translations
	);
	const { isSaving, persistSettings } = useAdvancedSettingsUpdate();
	const [ draftTranslations, setDraftTranslations ] = useState( translations );

	useEffect( () => {
		setDraftTranslations( translations );
	}, [ translations ] );

	/**
	 * Updates button text for a locale in local draft state.
	 */
	const handleChange = ( field: string, value: string ) => {
		setDraftTranslations( ( prev ) =>
			prev.map( ( item ) =>
				item.locale === field
					? {
						...item,
						buttonText: value,
					}
					: item
			)
		);
	};

	/**
	 * Appends a new custom language row with a unique custom locale id.
	 */
	const handleAddLanguage = () => {
		const nextIndex =
			draftTranslations.reduce( ( maxIndex, item ) => {
				const match = item.locale.match( /^custom_(\d+)$/ );
				if ( ! match ) {
					return maxIndex;
				}
				return Math.max( maxIndex, Number( match[ 1 ] ) );
			}, 0 ) + 1;
		setDraftTranslations( ( prev ) => [
			...prev,
			{
				locale: `custom_${ nextIndex }`,
				label: `${ __( 'Custom', 'pointwise-summary' ) } ${ nextIndex }`,
				buttonText: __( 'AI Summary', 'pointwise-summary' ),
			},
		] );
	};

	/**
	 * Removes a language row from local draft state.
	 */
	const handleRemoveLanguage = ( locale: string ) => {
		setDraftTranslations( ( prev ) =>
			prev.filter( ( item ) => item.locale !== locale )
		);
	};

	const hasChanges = JSON.stringify( draftTranslations ) !== JSON.stringify( translations );

	/**
	 * Persists all drafted translation rows.
	 */
	const handleSave = async () => {
		await persistSettings( {
			translations: draftTranslations,
		} );
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<h3 className="text-gray-900 mb-4">{ __( 'Multilingual Support', 'pointwise-summary' ) }</h3>
			<p className="text-sm text-gray-600 mb-4">
				{ __( 'Customize button text for different languages', 'pointwise-summary' ) }
			</p>

			<div className="space-y-3">
				{ draftTranslations.map( ( translation ) => (
					<div
						key={ translation.locale }
						className="flex items-center gap-4"
					>
						<div className="w-32">
							<span className="text-sm font-medium text-gray-900">
								{ translation.label }
							</span>
							<p className="text-xs text-gray-500">
								{ translation.locale }
							</p>
						</div>
						
						<input
							type="text"
							value={ translation.buttonText }
							onChange={ ( e ) => handleChange(translation.locale, e.target.value) }
							className="flex-1 px-3! py-2! border! border-gray-300! rounded-lg text-sm focus-within:ring focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all"
						/>
						<button
							type="button"
							onClick={ () => handleRemoveLanguage( translation.locale ) }
							className="cursor-pointer h-9 w-9 inline-flex items-center justify-center border border-gray-300 rounded-lg text-gray-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors"
							aria-label={ __( 'Remove language', 'pointwise-summary' ) }
							title={ __( 'Remove language', 'pointwise-summary' ) }
						>
							<X className="w-4 h-4" />
						</button>
					</div>
				) ) }
			</div>
			<div className="flex items-center justify-between gap-4">
				<button
					className="cursor-pointer mt-4 flex items-center gap-2 px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-sm"
					onClick={ handleAddLanguage }
				>
					<Plus className="w-4 h-4" />
					{ __( 'Add Language', 'pointwise-summary' ) }
				</button>

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
					{ isSaving ? __( 'Saving...', 'pointwise-summary' ) : __( 'Save Languages', 'pointwise-summary' ) }
				</button>
			</div>
			
		</div>
	);
};