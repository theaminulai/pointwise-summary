import React, { useId } from 'react';

/**
 * Props for the RadioCard component.
 */
interface RadioCardProps {
	checked: boolean;
	onChange: () => void;
	label: string;
	description?: string;
	icon?: React.ReactNode;
	disabled?: boolean;
}

/**
 * Renders a card-styled radio option for grouped selections.
 *
 * @param props             Component props.
 * @param props.checked
 * @param props.onChange
 * @param props.label
 * @param props.description
 * @param props.icon
 * @param props.disabled
 * @return Selectable radio card.
 */
export const RadioCard: React.FC< RadioCardProps > = ( {
	checked,
	onChange,
	label,
	description,
	icon,
	disabled = false,
} ) => {
	const inputId = useId();
	return (
		<label
			htmlFor={ inputId }
			className={ `
				relative flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all duration-200
				${
					checked
						? 'border-indigo-500 bg-indigo-50 shadow-sm'
						: 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm'
				}
				${ disabled && 'opacity-50 cursor-not-allowed' }
				` }
		>
			<input
				id={ inputId }
				type="radio"
				checked={ checked }
				onChange={ () => ! disabled && onChange() }
				disabled={ disabled }
				className="sr-only"
			/>

			<div className="flex items-start gap-3">
				{ icon && (
					<div
						className={ `shrink-0 ${
							checked ? 'text-indigo-600' : 'text-gray-400'
						}` }
					>
						{ icon }
					</div>
				) }
				<div className="flex-1 min-w-0">
					<span
						className={ `text-sm font-semibold block ${
							checked ? 'text-indigo-900' : 'text-gray-900'
						}` }
					>
						{ label }
					</span>
					{ description && (
						<span className="text-xs text-gray-600 block mt-1">
							{ description }
						</span>
					) }
				</div>
				<div
					className={ `
							w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200
							${ checked ? 'border-indigo-600 bg-white' : 'border-gray-300 bg-white' }
        			` }
				>
					{ checked && (
						<div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-in fade-in zoom-in duration-200" />
					) }
				</div>
			</div>
		</label>
	);
};
