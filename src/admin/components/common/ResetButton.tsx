import { __ } from '@wordpress/i18n';
import { Trash } from 'lucide-react';
import type * as React from 'react';

interface ResetButtonProps {
	handleReset: () => void;
	isLoading?: boolean;
	resetLabel: string;
}

export const ResetButton: React.FC< ResetButtonProps > = ( {
	handleReset,
	isLoading = false,
	resetLabel,
} ) => {
	return (
		<div className="flex justify-end">
			<button
				onClick={ handleReset }
				disabled={ isLoading }
				className="cursor-pointer px-4 py-2 border text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
			>
				<Trash className="w-4 h-4" />
				{ isLoading
					? __( 'Resetting...', 'pointwise-summary' )
					: resetLabel }
			</button>
		</div>
	);
};
