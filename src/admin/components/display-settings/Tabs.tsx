import React from 'react';

/**
 * Represents a single tab item in the navigation.
 */
export type TabItem = {
	label: string;
	value: string;
	icon?: React.ComponentType< { className?: string } >;
};

/**
 * Properties for the Tabs component.
 */
type TabsProps = {
	tabs: TabItem[];
	activeTab: string;
	onChange: ( value: string ) => void;
};

/**
 * A reusable tab navigation component.
 *
 * Renders a list of buttons that act as tabs, highlighting the current selection
 * and triggering an onChange event for navigation within settings groups.
 *
 * @param props           - Component properties.
 * @param props.tabs
 * @param props.activeTab
 * @param props.onChange
 * @return The rendered tab navigation block.
 */
const Tabs: React.FC< TabsProps > = ( { tabs, activeTab, onChange } ) => {
	return (
		<>
			{ tabs.map( ( tab ) => {
				const Icon = tab.icon;

				return (
					<button
						key={ tab.value }
						onClick={ () => onChange( tab.value ) }
						className={ `cursor-pointer px-4 py-2 text-sm font-medium rounded-md transition-colors
						${
							activeTab === tab.value
								? 'bg-white text-gray-900 shadow-sm'
								: 'text-gray-600 hover:text-gray-900'
						}` }
					>
						<span className="inline-flex items-center gap-2">
							{ Icon && <Icon className="w-4 h-4" /> }
							{ tab.label }
						</span>
					</button>
				);
			} ) }
		</>
	);
};

export default Tabs;
