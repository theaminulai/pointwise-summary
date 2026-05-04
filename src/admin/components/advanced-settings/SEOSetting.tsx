import { __ } from '@wordpress/i18n';
import type * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAdvancedSettingsUpdate } from '../../hooks/useAdvancedSettingsUpdate';
import { setAdvancedSeo } from '../../store/advancedSettings.actions';
import type { RootState } from '../../store/types';
import { Checkbox, Select, Toggle } from '../common';

/**
 * Configures SEO-related behavior for summary button rendering and metadata.
 */
export const SEOSetting: React.FC = () => {
	const dispatch = useDispatch();
	const { persistSettings } = useAdvancedSettingsUpdate();
	const seo = useSelector(
		( state: RootState ) => state.advancedSettings.seo
	);
	const { excludeNoindex, seoElement, noFollow, platform } = seo;

	/**
	 * Applies a single SEO setting update and persists the merged SEO object.
	 */
	const handleChange = <K extends keyof typeof seo>(
		key: K,
		value: typeof seo[K]
	) => {
		const nextSeo = {
			...seo,
			[ key ]: value,
		};

		dispatch(
			setAdvancedSeo( {
				[key]: value,
			} )
		);
		void persistSettings( {
			seo: nextSeo,
		} );
	};
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<h3 className="text-gray-900 mb-4">{ __( 'SEO Settings', 'pointwise-summary' ) }</h3>

			<div className="space-y-4">
				<Checkbox
					checked={ excludeNoindex }
					onChange={ ( value ) => handleChange( 'excludeNoindex', value ) }
					label={ __( 'Exclude noindex content', 'pointwise-summary' ) }
					description={ __( 'Automatically exclude content marked as noindex in your SEO plugin', 'pointwise-summary' ) }
				/>

				<div className="ml-7 mt-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
					<div className="flex items-start gap-3">
						<div className="shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
						<div>
							<p className="text-sm font-medium text-amber-900">
								{ __( 'No compatible SEO plugin detected', 'pointwise-summary' ) }
							</p>
							<p className="text-xs text-amber-700 mt-1">
								{ __( 'Install one of the compatible plugins to enable this feature', 'pointwise-summary' ) }
							</p>
						</div>
					</div>
				</div>

				<div className="ml-7 mt-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
					<p className="text-xs font-medium text-gray-700 mb-2">
						{ __( 'Compatible with:', 'pointwise-summary' ) }
					</p>
					<div className="flex flex-wrap gap-2">
						{ platform.map( ( name ) => (
							<span
								key={ name }
								className="px-2.5 py-1 bg-white border border-gray-300 text-gray-700 text-xs rounded-md"
							>
								{name}
							</span>
						) ) }
					</div>
				</div>
			</div>

			<div className="space-y-6 mt-2">
				<Select
					value={ seoElement }
					onChange={ ( value ) => handleChange( 'seoElement', value ) }
					label={ __( 'HTML Element Type', 'pointwise-summary' ) }
					options={ [
						{
							value: 'link',
							label: __( '<a> Links', 'pointwise-summary' ),
							description:
								__( 'Better for SEO, can be crawled by search engines', 'pointwise-summary' ),
						},
						{
							value: 'button',
							label: __( '<button> Elements', 'pointwise-summary' ),
							description:
								__( 'Better for accessibility, not followed by search engines', 'pointwise-summary' ),
						},
					] }
				/>

				{ seoElement === 'link' && (
					<Toggle
						checked={ noFollow }
						onChange={ ( value ) => handleChange( 'noFollow', value ) }
						label={ __( 'Add rel="nofollow"', 'pointwise-summary' ) }
						description={ __( 'Prevent search engines from following these links', 'pointwise-summary' ) }
						className="mt-3"
					/>
				) }
			</div>
		</div>
	);
};