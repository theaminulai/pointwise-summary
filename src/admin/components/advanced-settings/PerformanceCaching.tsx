import { __ } from '@wordpress/i18n';
import type * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAdvancedSettingsUpdate } from '../../hooks/useAdvancedSettingsUpdate';
import { setAdvancedPerformance } from '../../store/advancedSettings.actions';
import type { RootState } from '../../store/types';
import { Toggle } from '../common';
import { CacheExpiry } from './CacheExpiry';

/**
 * Configures cache behavior and data cleanup options for advanced settings.
 */
export const PerformanceCaching: React.FC = () => {
	const dispatch = useDispatch();
	const { persistSettings } = useAdvancedSettingsUpdate();
	const performance = useSelector(
		( state: RootState ) => state.advancedSettings.performance
	);
	const { enableCache, cacheExpiry, dataCleanup } = performance;

	/**
	 * Updates a performance field and persists the merged performance settings.
	 */
	const handleChange = <K extends keyof typeof performance>(
		key: K,
		value: typeof performance[K]
	) => {
		const nextPerformance = {
			...performance,
			[ key ]: value,
		};

		dispatch(
			setAdvancedPerformance( {
				[key]: value,
			} )
		);
		void persistSettings( {
			performance: nextPerformance,
		} );
	};
	
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<h3 className="text-gray-900 mb-4">{ __( 'Performance & Caching', 'pointwise-summary' ) }</h3>

			<div className="space-y-4">
				<Toggle
					checked={ enableCache }
					onChange={ ( value ) => handleChange( 'enableCache', value ) }
					label={ __( 'Enable Summary Caching', 'pointwise-summary' ) }
					description={ __( 'Cache generated summaries to improve performance', 'pointwise-summary' ) }
				/>

				<CacheExpiry
					enabled={ enableCache }
					value={ cacheExpiry }
					onChange={ ( value ) => handleChange( 'cacheExpiry', value ) }
				/>

				<div>
					<Toggle
						checked={ dataCleanup }
						onChange={ ( value ) => handleChange( 'dataCleanup', value ) }
						label={ __( 'Delete all plugin data when plugin is deleted (uninstalled)', 'pointwise-summary' ) }
						description={ __( 'Keep plugin data on deactivation, but remove on uninstall', 'pointwise-summary' ) }
					/>

					{ dataCleanup && (
						<div className="ml-7 mt-3 p-4 bg-red-50 border border-red-200 rounded-lg animate-in fade-in">
							<div className="flex items-start gap-3">
								<div className="shrink-0">
									<svg
										className="w-5 h-5 text-red-600"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<div>
									<p className="text-sm font-medium text-red-900">
										{ __( 'Warning', 'pointwise-summary' ) }
									</p>
									<p className="text-xs text-red-800 mt-1">
										{ __( 'If enabled, all plugin settings, AI configurations, analytics data, and cached summaries will be permanently deleted when you delete (not just deactivate) this plugin from WordPress.', 'pointwise-summary' ) }
									</p>
								</div>
							</div>
						</div>
					) }
				</div>
			</div>
		</div>
	);
};