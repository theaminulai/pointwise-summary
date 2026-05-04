/**
 * displayHelpers.ts
 *
 * Utility functions for display settings and button styling.
 */

import clsx from 'clsx';

export type FloatingPosition =
	| 'top-left'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-right'
	| 'left-center'
	| 'right-center';
export type ButtonStyle = 'brand' | 'minimal' | 'dark' | 'gradient' | 'outline';
export type ButtonShape = 'rounded' | 'circular' | 'square';
export type ButtonAlignment = 'left' | 'center' | 'right';

/**
 * Get CSS classes for floating button position
 * @param {FloatingPosition} position - Position of the floating button
 * @returns {string} CSS classes for positioning
 */
export function getFloatingPositionClass( position: FloatingPosition ): string {
	return clsx({
		'top-4 left-4': position === 'top-left',
		'top-4 right-4': position === 'top-right',
		'bottom-4 left-4': position === 'bottom-left',
		'bottom-4 right-4': position === 'bottom-right',
		'top-1/2 -translate-y-1/2 left-4': position === 'left-center',
		'top-1/2 -translate-y-1/2 right-4': position === 'right-center',
	});
}

/**
 * Get CSS classes for the expanded floating model menu position.
 * @param {FloatingPosition | undefined} position - Floating trigger position.
 * @returns {string} CSS classes for dropdown anchoring.
 */
export function getFloatingMenuPositionClasses(
	position?: FloatingPosition
): string {
	if ( ! position || position === 'bottom-right' ) {
		return 'absolute bottom-full right-0 mb-2';
	}

	return clsx({
		'absolute bottom-full left-0 mb-2': position === 'bottom-left',
		'absolute top-full right-0 mt-2':
			position === 'top-right' || position === 'right-center',
		'absolute top-full left-0 mt-2':
			position === 'top-left' || position === 'left-center',
	});
}

/**
 * Get CSS classes for button style
 * @param {ButtonStyle} style - Style of the button
 * @returns {string} CSS classes for button styling
 */
export function getStyleClasses( style: ButtonStyle ): string {
	return clsx({
		'bg-indigo-600 text-white hover:bg-indigo-700': style === 'brand',
		'bg-gray-200 text-gray-700 hover:bg-gray-300': style === 'minimal',
		'bg-gray-900 text-white hover:bg-gray-800': style === 'dark',
		'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700':
			style === 'gradient',
		'border-2 border-indigo-600 bg-white text-indigo-600 hover:bg-indigo-50':
			style === 'outline',
	});
}

/**
 * Get CSS classes for button shape
 * @param {ButtonShape} shape - Shape of the button
 * @returns {string} CSS classes for button shape
 */
export function getShapeClasses( shape: ButtonShape ): string {
	return clsx({
		'rounded-lg': shape === 'rounded',
		'rounded-full': shape === 'circular',
		'rounded-none': shape === 'square',
	});
}

/**
 * Get CSS classes for button alignment
 * @param {ButtonAlignment} alignment - Alignment of the button
 * @returns {string} CSS classes for button alignment
 */
export function getAlignmentClasses( alignment: ButtonAlignment ): string {
	return clsx({
		'justify-start': alignment === 'left',
		'justify-center': alignment === 'center',
		'justify-end': alignment === 'right',
	});
}
