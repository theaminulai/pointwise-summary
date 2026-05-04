import { __, sprintf } from '@wordpress/i18n';
import type * as React from 'react';
import type { DisplayMode } from '../../store/types';
import { Select, Toggle } from '../common';

/**
 * Properties for the ModeTabContent component.
 */
interface ModeTabContentProps {
	displayMode: DisplayMode;
	enableScrollTrigger: boolean;
	scrollTrigger: number;
	onChange: ( field: string, value: unknown ) => void;
}

/**
 * Component for managing display mode settings (floating, inline, etc.).
 * 
 * @param props - Component properties.
 * @returns The rendered mode settings tab content.
 */
export const ModeTabContent: React.FC< ModeTabContentProps > = ( {
	displayMode,
	enableScrollTrigger,
	scrollTrigger,
	onChange,
} ) => {
	return (
		<div className="space-y-6">
			<Select
				label={ __( 'Display Mode', 'pointwise-summary' ) }
				value={ displayMode }
				onChange={ ( value ) => onChange( 'displayMode', value ) }
				options={ [
					{
						value: 'floating',
						label: __( 'Floating Button', 'pointwise-summary' ),
						description:
							__( 'Fixed position button that follows scroll', 'pointwise-summary' ),
					},
					{
						value: 'inline',
						label: __( 'Inline Button', 'pointwise-summary' ),
						description: __( 'Button embedded within content', 'pointwise-summary' ),
						isRecommended: true,
					},
					{
						value: 'collapse',
						label: __( 'Collapse Button', 'pointwise-summary' ),
						description: __( 'Button that expands on click to show ai modal', 'pointwise-summary' ),
						isRecommended: true,
					},
					{
						value: 'both',
						label: __( 'Both', 'pointwise-summary' ),
						description: __( 'Floating + inline buttons', 'pointwise-summary' ),
					},
				] }
			/>

			{ ( displayMode === 'floating' || displayMode === 'both' ) && (
				<div className="space-y-4 pt-4 border-t border-gray-200">
					<Toggle
						label={ __( 'Enable Scroll Trigger', 'pointwise-summary' ) }
						description={ __( 'Button will appear after user scrolls down the page', 'pointwise-summary' ) }
						className="pt-4 border-t border-gray-200"
						checked={ enableScrollTrigger }
						onChange={ ( v ) => onChange( 'enableScrollTrigger', v ) }
					/>

					{ enableScrollTrigger && (
						<div className="space-y-3 pl-4 border-l-2 border-indigo-100">
							<div className="flex items-center justify-between">
								<label className="text-sm text-gray-700">
									{
										sprintf(
											/* translators: %s is replaced with scroll trigger percentage */
											__( 'Trigger at %s scroll', 'pointwise-summary' ),
											`%${ scrollTrigger }`
										)
									}
								</label>
								<span className="text-sm font-medium text-indigo-600">
									{ scrollTrigger }%
								</span>
							</div>
							<input
								type="range"
								min="0"
								max="100"
								step="5"
								value={ scrollTrigger }
								onChange={ ( event ) =>
									onChange(
										'scrollTrigger',
										Number( event.target.value )
									)
								}
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
							/>
							<p className="text-xs text-gray-500">
								{ __( 'Button will appear when user scrolls down this percentage of the page', 'pointwise-summary' ) }
							</p>
						</div>
					) }
				</div>
			) }
		</div>
	);
};
