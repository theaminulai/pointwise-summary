import { __ } from '@wordpress/i18n';
import { Check } from 'lucide-react';
import type * as React from 'react';
import type { DisplayMode, InlinePosition } from '../../store/types';
import type {
	ButtonAlignment,
	FloatingPosition,
} from '../../utils/displayHelpers';
import { Select } from '../common';

/**
 * Properties for the PositionTabContent component.
 */
interface PositionTabContentProps {
	displayMode: DisplayMode;
	floatingPosition: FloatingPosition;
	buttonAlignment: ButtonAlignment;
	inlinePosition: InlinePosition;
	onChange: ( field: string, value: unknown ) => void;
}

/**
 * Component for managing the spatial placement of summary buttons.
 *
 * @param props                  - Component properties.
 * @param props.displayMode
 * @param props.floatingPosition
 * @param props.buttonAlignment
 * @param props.inlinePosition
 * @param props.onChange
 * @return The rendered position settings tab content.
 */
export const PositionTabContent: React.FC< PositionTabContentProps > = ( {
	displayMode,
	floatingPosition,
	buttonAlignment,
	inlinePosition,
	onChange,
} ) => {
	const isFloatingMode = displayMode === 'floating' || displayMode === 'both';
	const isInlineMode =
		displayMode === 'inline' ||
		displayMode === 'collapse' ||
		displayMode === 'both';

	return (
		<div className="space-y-6">
			{ isFloatingMode && (
				<div className="space-y-4">
					<p className="font-medium text-gray-900">
						{ __(
							'Floating Button Position',
							'pointwise-summary'
						) }
					</p>
					<div
						className="grid gap-3"
						style={ {
							gridTemplateColumns:
								'repeat(auto-fit, minmax(140px, 1fr))',
						} }
					>
						{ [
							{
								value: 'bottom-right',
								label: __(
									'Bottom Right',
									'pointwise-summary'
								),
							},
							{
								value: 'bottom-left',
								label: __( 'Bottom Left', 'pointwise-summary' ),
							},
							{
								value: 'top-right',
								label: __( 'Top Right', 'pointwise-summary' ),
							},
							{
								value: 'top-left',
								label: __( 'Top Left', 'pointwise-summary' ),
							},
						].map( ( position ) => (
							<button
								key={ position.value }
								onClick={ () =>
									onChange(
										'floatingPosition',
										position.value
									)
								}
								className={ `cursor-pointer relative px-4 py-3 rounded-lg text-sm font-medium transition-all ${
									floatingPosition === position.value
										? 'border border-indigo-600 bg-indigo-50 text-indigo-700'
										: 'border border-gray-200 text-gray-700 hover:border-gray-300 bg-white'
								}` }
							>
								{ position.label }
								{ floatingPosition === position.value && (
									<div className="absolute top-2 right-2 w-[18px] h-[18px] rounded-full bg-indigo-600 flex items-center justify-center">
										<Check className="w-3 h-3 text-white" />
									</div>
								) }
							</button>
						) ) }
					</div>
				</div>
			) }

			{ isInlineMode && (
				<>
					<div className="space-y-4">
						<div className="space-y-3 pt-4">
							<p className="font-medium text-gray-900">
								{ __(
									'Button Alignment',
									'pointwise-summary'
								) }
							</p>
							<div
								className="grid gap-3"
								style={ {
									gridTemplateColumns:
										'repeat(auto-fit, minmax(140px, 1fr))',
								} }
							>
								{ [
									{
										value: 'left',
										label: __(
											'Left',
											'pointwise-summary'
										),
									},
									{
										value: 'center',
										label: __(
											'Center',
											'pointwise-summary'
										),
									},
									{
										value: 'right',
										label: __(
											'Right',
											'pointwise-summary'
										),
									},
								].map( ( align ) => (
									<button
										key={ align.value }
										onClick={ () =>
											onChange(
												'buttonAlignment',
												align.value
											)
										}
										className={ `cursor-pointer relative px-4 py-3 rounded-lg text-sm font-medium transition-all ${
											buttonAlignment === align.value
												? 'border border-indigo-600 bg-indigo-50 text-indigo-700'
												: 'border border-gray-200 text-gray-700 hover:border-gray-300 bg-white'
										}` }
									>
										{ align.label }
										{ buttonAlignment === align.value && (
											<div className="absolute top-2 right-2 w-[18px] h-[18px] rounded-full bg-indigo-600 flex items-center justify-center">
												<Check className="w-3 h-3 text-white" />
											</div>
										) }
									</button>
								) ) }
							</div>
						</div>
					</div>
					<Select
						label={ __(
							'Inline Button Position',
							'pointwise-summary'
						) }
						value={ inlinePosition }
						onChange={ ( value ) =>
							onChange( 'inlinePosition', value )
						}
						options={ [
							{
								value: 'disabled',
								label: __( 'Disabled', 'pointwise-summary' ),
								description: __(
									'Use shortcode only - button will not be automatically added to posts',
									'pointwise-summary'
								),
							},
							{
								value: 'before-title',
								label: __(
									'Before Title',
									'pointwise-summary'
								),
								description: __(
									'Button appears before the article title',
									'pointwise-summary'
								),
							},
							{
								value: 'after-title',
								label: __( 'After Title', 'pointwise-summary' ),
								description: __(
									'Button appears after the article title',
									'pointwise-summary'
								),
							},
							{
								value: 'before-content',
								label: __(
									'Before Content',
									'pointwise-summary'
								),
								description: __(
									'Button appears before the article content',
									'pointwise-summary'
								),
							},
							{
								value: 'after-content',
								label: __(
									'After Content',
									'pointwise-summary'
								),
								description: __(
									'Button appears after the article content',
									'pointwise-summary'
								),
							},
						] }
					/>
				</>
			) }
		</div>
	);
};
