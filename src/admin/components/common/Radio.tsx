import type * as React from 'react';

/**
 * Props for the Radio component.
 */
interface RadioProps {
	checked: boolean;
	onChange: () => void;
	label?: string;
	description?: string;
	disabled?: boolean;
}

/**
 * Renders a styled radio control with optional text content.
 *
 * @param props Component props.
 * @returns Radio control.
 */
export const Radio: React.FC< RadioProps > = ( {
	checked,
	onChange,
	label,
	description,
	disabled = false,
} ) => {
	return (
		<label
			className={ `flex items-start gap-3 ${
				disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
			}` }
		>
			<div className="relative flex items-center">
				<input
					type="radio"
					checked={ checked }
					onChange={ () => ! disabled && onChange() }
					disabled={ disabled }
					className="sr-only"
				/>
				<div
					className={ `w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
						checked
							? 'bg-white border-indigo-600'
							: 'bg-white border-gray-300 hover:border-indigo-400'
					}` }
				>
					{ checked && (
						<div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-in fade-in zoom-in duration-200" />
					) }
				</div>
			</div>
			{ ( label || description ) && (
				<div className="flex-1">
					{ label && (
						<p className="text-sm font-medium text-gray-900">
							{ label }
						</p>
					) }
					{ description && (
						<p className="text-xs text-gray-500 mt-0.5">
							{ description }
						</p>
					) }
				</div>
			) }
		</label>
	);
};
