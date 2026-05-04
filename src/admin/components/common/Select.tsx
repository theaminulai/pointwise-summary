import type * as React from 'react';

/**
 * Props for the Select component.
 */
interface SelectProps {
	value: string;
	onChange: ( value: string ) => void;
	options: Array< {
		value: string;
		label: string;
		description?: string;
		disabled?: boolean;
		isRecommended?: boolean;
	} >;
	label?: string;
	disabled?: boolean;
	className?: string;
	name?: string;
}

/**
 * Renders a radio-based select list with labels and descriptions.
 *
 * @param props Component props.
 * @returns Select fieldset.
 */
export const Select: React.FC< SelectProps > = ( {
	value,
	onChange,
	options = [],
	label,
	disabled = false,
	className = '',
	name = 'radio-group',
} ) => {
	return (
		<fieldset
			className={ `p-6 flex flex-col gap-3 ${ className }` }
			disabled={ disabled }
		>
			<legend className="block text-sm font-medium text-gray-900 py-2.5">
				{ label }
			</legend>

			{ options.map( ( option, index ) => {
				const isSelected = value === option.value;
				const isDisabled = disabled || option.disabled;
				const id = `${ name }-${ option.value }-${ index }`;

				return (
					<div key={ option.value }>
						<input
							id={ id }
							type="radio"
							name={ name }
							value={ option.value }
							checked={ isSelected }
							disabled={ isDisabled }
							onChange={ () => onChange( option.value ) }
							className="sr-only"
						/>

						<label
							htmlFor={ id }
							className={ `flex items-start gap-3 p-4 rounded-lg border transition
								${
									isSelected
										? 'border-indigo-600 bg-indigo-600/5'
										: 'border-gray-200 bg-white'
								}
								${ isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer' }
							` }
						>
							{ /* Custom radio */ }
							<div
								aria-hidden="true"
								className={ `w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0
									${ isSelected ? 'border-indigo-600' : 'border-black/60' }` }
							>
								{ isSelected && (
									<div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
								) }
							</div>

							{ /* Text */ }
							<div className="flex-1">
								<div className="text-sm font-medium text-black/90 mb-0.5">
									{ option.label }
								</div>
								{ option.description && (
									<div className="text-xs text-black/60">
										{ option.description }
									</div>
								) }
								{ option.isRecommended && (
									<span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-700 rounded">
										Recommended
									</span>
								) }
							</div>
						</label>
					</div>
				);
			} ) }
		</fieldset>
	);
};
