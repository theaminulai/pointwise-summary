import { useDebounce } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import type * as React from 'react';
import { useCallback, useEffect, useId, useState } from 'react';
import {
	MAX_CACHE_EXPIRY_HOURS,
	MIN_CACHE_EXPIRY_HOURS,
	parseAndClamp,
} from '../../utils/cacheExpiry';

type CacheExpiryProps = {
	enabled: boolean;
	value: number;
	onChange: ( value: number ) => void;
};

/**
 * Renders cache expiry input with debounce and clamped numeric normalization.
 * @param root0
 * @param root0.enabled
 * @param root0.value
 * @param root0.onChange
 */
export const CacheExpiry: React.FC< CacheExpiryProps > = ( {
	enabled,
	value,
	onChange,
} ) => {
	const inputId = useId();
	const [ draft, setDraft ] = useState( String( value ) );

	useEffect( () => {
		setDraft( String( value ) );
	}, [ value ] );

	/**
	 * Normalizes and commits raw input value to the parent callback.
	 */
	const commit = useCallback(
		( raw: string ) => {
			const next = parseAndClamp( raw );
			if ( next === null ) {
				setDraft( String( value ) );
				return;
			}
			onChange( next );
			setDraft( String( next ) );
		},
		[ onChange, value ]
	);

	const debouncedCommit = useDebounce( commit, 300 );

	/**
	 * Updates draft input immediately and queues a debounced commit.
	 * @param e
	 */
	const handleChange = ( e: React.ChangeEvent< HTMLInputElement > ) => {
		const next = e.target.value;
		setDraft( next );
		debouncedCommit( next );
	};

	if ( ! enabled ) {
		return null;
	}

	return (
		<div className="mt-3 ml-7">
			<label
				htmlFor={ inputId }
				className="block text-sm text-gray-700 mb-2"
			>
				{ __( 'Cache Expiry (hours)', 'pointwise-summary' ) }
			</label>
			<input
				id={ inputId }
				type="number"
				value={ draft }
				onChange={ handleChange }
				onBlur={ () => commit( draft ) }
				min={ MIN_CACHE_EXPIRY_HOURS }
				max={ MAX_CACHE_EXPIRY_HOURS }
				className="w-32 px-3 py-2 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
			/>
		</div>
	);
};
