import { __ } from '@wordpress/i18n';
import { Move, Palette, SlidersHorizontal } from 'lucide-react';
import type * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDisplaySettings } from '../../hooks/useDisplaySettings';
import { displaySettingsApi } from '../../services/api';
import { setDisplaySettings } from '../../store/displaySettings.actions';
import type { RootState } from '../../store/types';
import { ActionsButton, Title } from '../common';
import { LivePreviewPanel } from './LivePreviewPanel';
import { ModeTabContent } from './ModeTabContent';
import { PositionTabContent } from './PositionTabContent';
import { StyleTabContent } from './StyleTabContent';
import Tabs, { TabItem } from './Tabs';
/** The currently selected tab in the display settings panel. */
type ActiveTab = RootState[ 'displaySettings' ][ 'activeTab' ];

/** Tab definitions for the display settings navigation. */
const TABS: TabItem[] = [
	{
		label: __( 'Mode', 'pointwise-summary' ),
		value: 'mode',
		icon: SlidersHorizontal,
	},
	{
		label: __( 'Position', 'pointwise-summary' ),
		value: 'position',
		icon: Move,
	},
	{
		label: __( 'Style', 'pointwise-summary' ),
		value: 'style',
		icon: Palette,
	},
];

/**
 * Page-level component for managing display settings.
 *
 * Delegates all state logic to `useDisplaySettings` and tab rendering
 * to `ActiveTabContent`, keeping this component focused purely on layout.
 */
export const DisplaySettings: React.FC = () => {
	const {
		settings,
		changeActiveTab,
		isSaving,
		saveSettings,
		changeGroupSetting,
	} = useDisplaySettings();
	const { activeTab, mode, position, style } = settings;
	const [ isLoading, setIsLoading ] = useState( false );
	const dispatch = useDispatch();
	/**
	 * Handles resetting all AI settings.
	 * Triggers the API reset and updates the local Redux state with the new defaults.
	 */
	const handleReset = async () => {
		setIsLoading( true );
		try {
			const data = await displaySettingsApi.reset();
			if ( data ) {
				dispatch( setDisplaySettings( data ) );
			}
		} finally {
			setIsLoading( false );
		}
	};

	return (
		<div className="space-y-6 lg:space-y-8">
			<Title
				title={ __( 'Display Settings', 'pointwise-summary' ) }
				description={ __(
					'Customize how and where summary buttons appear on your site',
					'pointwise-summary'
				) }
			/>

			<div className="max-w-7xl">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2 space-y-6">
						<div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
							{ /* Tab navigation */ }
							<div className="grid grid-cols-3 gap-2 p-2 bg-gray-100 rounded-lg">
								<Tabs
									tabs={ TABS }
									activeTab={ settings.activeTab }
									onChange={ ( tab ) =>
										changeActiveTab( tab as ActiveTab )
									}
								/>
							</div>

							{ activeTab === 'mode' && (
								<ModeTabContent
									{ ...mode }
									onChange={ ( field, value ) =>
										changeGroupSetting(
											'mode',
											field,
											value
										)
									}
								/>
							) }

							{ activeTab === 'position' && (
								<PositionTabContent
									{ ...position }
									displayMode={ mode.displayMode }
									onChange={ ( field, value ) =>
										changeGroupSetting(
											'position',
											field,
											value
										)
									}
								/>
							) }

							{ activeTab === 'style' && (
								<StyleTabContent
									{ ...style }
									displayMode={ mode.displayMode }
									onChange={ ( field, value ) =>
										changeGroupSetting(
											'style',
											field,
											value
										)
									}
								/>
							) }
						</div>

						<ActionsButton
							isSaving={ isSaving }
							onSave={ () => void saveSettings() }
							saveLabel={ __(
								'Save Display Settings',
								'pointwise-summary'
							) }
							onReset={ handleReset }
							isDeleting={ isLoading }
							resetLabel={ __(
								'Reset Display Settings',
								'pointwise-summary'
							) }
						/>
					</div>

					{ /* Live preview sidebar */ }
					<LivePreviewPanel />
				</div>
			</div>
		</div>
	);
};
