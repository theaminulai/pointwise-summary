// components/DisplaySettingsActions.jsx

import { __ } from '@wordpress/i18n';
import { Save, Trash } from 'lucide-react';
import type * as React from 'react';

/**
 * Props for the ActionsButton component.
 */
interface ActionsProps {
	onReset: () => void;
	onSave: () => void;
	isSaving?: boolean;
	isDeleting?: boolean;
	resetLabel?: string;
	saveLabel?: string;
}

/**
 * Renders reset and save actions used in settings screens.
 *
 * @param props Component props.
 * @returns Action button group.
 */
export const ActionsButton: React.FC< ActionsProps > = ( {
	onReset,
	onSave,
	isDeleting = false,
	isSaving = false,
	resetLabel = __( 'Reset to Default', 'pointwise-summary' ),
	saveLabel = __( 'Save Settings', 'pointwise-summary' ),
} ) => {
	return (
		<div className="flex items-center justify-between gap-4">
			{ /* Reset Button */ }
			<button
				onClick={ onReset }
				className="cursor-pointer px-4 py-2 border text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 "
			>
				<Trash className="w-4 h-4" />
				{ isDeleting ? __( 'Resetting...', 'pointwise-summary' ) : resetLabel }
			</button>

			{ /* Save Button */ }
			<button
				onClick={ onSave }
				disabled={ isSaving }
				className={ `cursor-pointer px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-2 transition-colors ${
					isSaving
						? 'bg-indigo-400 cursor-not-allowed'
						: 'bg-indigo-600 hover:bg-indigo-700'
				}` }
			>
				<Save className="w-4 h-4" />
				{ isSaving ? __( 'Saving...', 'pointwise-summary' ) : saveLabel }
			</button>
		</div>
	);
};
