import type * as React from 'react';

/**
 * Props for the Toggle component.
 */
interface ToggleProps {
	checked: boolean;
	onChange: ( checked: boolean ) => void;
	label?: string;
	description?: string;
	disabled?: boolean;
	className?: string;
}

/**
 * Renders a switch-style toggle with optional label and description.
 *
 * @param props Component props.
 * @returns Toggle control.
 */
export const Toggle: React.FC< ToggleProps > = ( {
	checked,
	onChange,
	label,
	description,
	disabled = false,
	className = '',
} ) => {
	return (
		<label
			className={ `flex items-start justify-between gap-4 ${
				disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
			} ${ className }` }
		>
			{ ( label || description ) && (
				<div className="flex-1">
					{ label && (
						<p className="text-sm font-medium text-gray-900 m-0!">
							{ label }
						</p>
					) }
					{ description && (
						<p className="text-xs text-gray-500 m-0! mt-0.5!">
							{ description }
						</p>
					) }
				</div>
			) }
			<div className="relative flex items-center">
				<input
					type="checkbox"
					checked={ checked }
					onChange={ ( e ) =>
						! disabled && onChange( e.target.checked )
					}
					disabled={ disabled }
					className="sr-only"
				/>
				<div
					className={ `
					w-11 h-6 rounded-full transition-all duration-300
					${ checked ? 'bg-indigo-600' : 'bg-gray-300' }
					${ ! disabled && 'hover:shadow-md' }
					` }
							>
								<div
									className={ `
						w-5 h-5 bg-white rounded-full shadow-md
						transform transition-all duration-300
						${ checked ? 'translate-x-[22px]' : 'translate-x-0.5' }
						translate-y-0.5
					` }
					/>
				</div>
			</div>
		</label>
	);
};
