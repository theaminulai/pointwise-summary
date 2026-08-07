import { __ } from '@wordpress/i18n';
import type * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAdvancedSettingsUpdate } from '../../hooks/useAdvancedSettingsUpdate';
import { setAdvancedAccessibility } from '../../store/advancedSettings.actions';
import type { RootState } from '../../store/types';
import { Toggle } from '../common';
import { KeyboardShortcut } from './KeyboardShortcut';

/**
 * Manages accessibility-focused settings such as keyboard navigation and RTL support.
 */
export const Accessibility: React.FC = () => {
	const dispatch = useDispatch();
	const { persistSettings } = useAdvancedSettingsUpdate();

	const accessibility = useSelector(
		( state: RootState ) => state.advancedSettings.accessibility
	);

	const { enableAccessibility, enableKeyboard, keyboardShortcut, enableRTL } =
		accessibility;

	/**
	 * Updates a single accessibility field in Redux and persists the merged object.
	 * @param key
	 * @param value
	 */
	const handleChange = < K extends keyof typeof accessibility >(
		key: K,
		value: ( typeof accessibility )[ K ]
	) => {
		const nextAccessibility = {
			...accessibility,
			[ key ]: value,
		};

		dispatch(
			setAdvancedAccessibility( {
				[ key ]: value,
			} )
		);
		void persistSettings( {
			accessibility: nextAccessibility,
		} );
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<h3 className="text-gray-900 mb-4">
				{ __( 'Accessibility', 'pointwise-summary' ) }
			</h3>

			<div className="space-y-4">
				{ /* Accessibility Toggle */ }
				<Toggle
					checked={ enableAccessibility }
					onChange={ ( value ) =>
						handleChange( 'enableAccessibility', value )
					}
					label={ __(
						'Enhanced Accessibility',
						'pointwise-summary'
					) }
					description={ __(
						'ARIA labels, focus management, and screen reader support',
						'pointwise-summary'
					) }
				/>

				{ /* Keyboard Toggle */ }
				<Toggle
					checked={ enableKeyboard }
					onChange={ ( value ) =>
						handleChange( 'enableKeyboard', value )
					}
					label={ __( 'Keyboard Navigation', 'pointwise-summary' ) }
					description={ __(
						'Enable keyboard shortcuts for summary buttons',
						'pointwise-summary'
					) }
				/>

				<KeyboardShortcut
					enabled={ enableKeyboard }
					value={ keyboardShortcut }
					onChange={ ( value ) =>
						handleChange( 'keyboardShortcut', value )
					}
				/>

				{ /* RTL Toggle */ }
				<Toggle
					checked={ enableRTL }
					onChange={ ( value ) => handleChange( 'enableRTL', value ) }
					label={ __( 'RTL Support', 'pointwise-summary' ) }
					description={ __(
						'Right-to-left language support (Arabic, Hebrew, etc.)',
						'pointwise-summary'
					) }
				/>
			</div>
		</div>
	);
};
