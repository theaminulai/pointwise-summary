import { Check } from 'lucide-react';
import type * as React from 'react';
import { useId } from 'react';

/**
 * Props for the Checkbox component.
 */
interface CheckboxProps {
	checked: boolean;
	onChange: ( checked: boolean ) => void;
	label?: string;
	description?: string;
	disabled?: boolean;
}

/**
 * Renders a styled checkbox with optional label and description.
 *
 * @param props             Component props.
 * @param props.checked
 * @param props.onChange
 * @param props.label
 * @param props.description
 * @param props.disabled
 * @return Checkbox control.
 */
export const Checkbox: React.FC< CheckboxProps > = ( {
	checked,
	onChange,
	label,
	description,
	disabled = false,
} ) => {
	const inputId = useId();
	return (
		<label
			htmlFor={ inputId }
			className={ `flex items-start gap-3 ${
				disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
			}` }
		>
			<div className="relative flex items-center">
				<input
					id={ inputId }
					type="checkbox"
					checked={ checked }
					onChange={ ( e ) =>
						! disabled && onChange( e.target.checked )
					}
					disabled={ disabled }
					className="sr-only"
				/>
				<div
					className={ `w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
						checked
							? 'bg-indigo-600 border-indigo-600 scale-100'
							: 'bg-white border-gray-300 hover:border-indigo-400'
					}` }
				>
					{ checked && (
						<Check className="w-3.5 h-3.5 text-white animate-in fade-in zoom-in duration-200" />
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
