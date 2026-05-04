import { useDebounce } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import type * as React from 'react';
import { useEffect, useState } from 'react';

type KeyboardShortcutProps = {
	enabled: boolean;
	value: string;
	onChange: ( value: string ) => void;
};

/**
 * Renders keyboard shortcut input with debounce and blur commit behavior.
 */
export const KeyboardShortcut: React.FC< KeyboardShortcutProps > = ( {
	enabled,
	value,
	onChange,
} ) => {
	const [ draftValue, setDraftValue ] = useState( value );

	useEffect( () => {
		setDraftValue( value );
	}, [ value ] );

	const debouncedHandleInputChange = useDebounce( ( nextValue: string ) => {
		onChange( nextValue );
	}, 300 );

	/**
	 * Commits current draft value when input loses focus.
	 */
	const commitKeyboardShortcut = () => {
		onChange( draftValue );
	};

	if ( ! enabled ) {
		return null;
	}

	return (
		<div className="mt-3 ml-7">
			<label className="block text-sm text-gray-700 mb-2">
				{ __( 'Keyboard Shortcut', 'pointwise-summary' ) }
			</label>
			<input
				type="text"
				value={ draftValue }
				onChange={ ( e ) => {
					const nextValue = e.target.value;
					setDraftValue( nextValue );
					debouncedHandleInputChange( nextValue );
				} }
				onBlur={ commitKeyboardShortcut }
				className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 transition-all"
			/>
		</div>
	);
};