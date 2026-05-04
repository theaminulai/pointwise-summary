import { __ } from '@wordpress/i18n';
import type * as React from 'react';
import type { IconDisplay } from '../../store/types';
import type { ButtonShape, ButtonStyle } from '../../utils/displayHelpers';
import { Select, Toggle } from '../common';

/**
 * Properties for the StyleTabContent component.
 */
interface StyleTabContentProps {
	buttonStyle: ButtonStyle;
	buttonShape: ButtonShape;
	iconDisplay: IconDisplay;
	enableAnimations: boolean;
	onChange: ( field: string, value: unknown ) => void;
}

/**
 * Component for customizing the visual appearance (style, shape, animation) of buttons.
 * 
 * @param props - Component properties.
 * @returns The rendered style settings tab content.
 */
export const StyleTabContent: React.FC< StyleTabContentProps > = ( {
	buttonStyle,
	buttonShape,
	iconDisplay,
	enableAnimations,
	onChange,
} ) => {
	return (
		<div className="space-y-6">
			<div className="space-y-4">
				<label className="font-medium text-gray-900">
					{ __( 'Button Style', 'pointwise-summary' ) }
				</label>
				<div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
					{ [
						{
							value: 'brand',
							label: __( 'Brand', 'pointwise-summary' ),
							color: 'bg-indigo-600',
						},
						{
							value: 'minimal',
							label: __( 'Minimal', 'pointwise-summary' ),
							color: 'bg-gray-200',
						},
						{ value: 'dark', label: __( 'Dark', 'pointwise-summary' ), color: 'bg-gray-900' },
						{
							value: 'gradient',
							label: __( 'Gradient', 'pointwise-summary' ),
							color: 'bg-gradient-to-r from-indigo-600 to-purple-600',
						},
						{
							value: 'outline',
							label: __( 'Outline', 'pointwise-summary' ),
							color: 'border-2 border-indigo-600 bg-white',
						},
					].map( ( style ) => (
						<button
							key={ style.value }
							onClick={ () => onChange( 'buttonStyle', style.value ) }
							className={ `cursor-pointer flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
								buttonStyle === style.value
									? 'border-indigo-600 bg-indigo-50'
									: 'border-gray-200 hover:border-gray-300'
							}` }
						>
							<div
								className={ `w-10 h-10 rounded ${ style.color }` }
							></div>
							<span className="text-xs font-medium text-gray-900">
								{ style.label }
							</span>
						</button>
					) ) }
				</div>
			</div>

			<div className="space-y-4">
				<label className="font-medium text-gray-900">
					{ __( 'Button Shape', 'pointwise-summary' ) }
				</label>
				<div className="flex gap-3">
					{ [
						{
							value: 'rounded',
							label: __( 'Rounded', 'pointwise-summary' ),
							class: 'rounded-lg',
						},
						{
							value: 'circular',
							label: __( 'Circular', 'pointwise-summary' ),
							class: 'rounded-full',
						},
						{
							value: 'square',
							label: __( 'Square', 'pointwise-summary' ),
							class: 'rounded-none',
						},
					].map( ( shape ) => (
						<button
							key={ shape.value }
							onClick={ () => onChange( 'buttonShape', shape.value ) }
							className={ `cursor-pointer flex-1 flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
								buttonShape === shape.value
									? 'border-indigo-600 bg-indigo-50'
									: 'border-gray-200 hover:border-gray-300'
							}` }
						>
							<div
								className={ `w-10 h-10 bg-indigo-600 ${ shape.class }` }
							></div>
							<span className="text-xs font-medium text-gray-900">
								{ shape.label }
							</span>
						</button>
					) ) }
				</div>
			</div>

			<Select
				label={ __( 'Icon Display', 'pointwise-summary' ) }
				value={ iconDisplay }
				onChange={ ( value ) => onChange( 'iconDisplay', value ) }
				options={ [
					{
						value: 'icons-text',
						label: __( 'Icons + Text', 'pointwise-summary' ),
						description: __( 'Show both icon and text', 'pointwise-summary' ),
					},
					{
						value: 'icons-only',
						label: __( 'Icons Only', 'pointwise-summary' ),
						description: __( 'Compact button with icon only', 'pointwise-summary' ),
					},
					{
						value: 'text-only',
						label: __( 'Text Only', 'pointwise-summary' ),
						description: __( 'Text button without icon', 'pointwise-summary' ),
					},
				] }
			/>

			<Toggle
				label={ __( 'Enable Animations', 'pointwise-summary' ) }
				description={ __( 'Add hover and entrance animations to buttons', 'pointwise-summary' ) }
				className="pt-4 border-t border-gray-200"
				checked={ enableAnimations }
				onChange={ ( v ) => onChange( 'enableAnimations', v ) }
			/>
		</div>
	);
};
