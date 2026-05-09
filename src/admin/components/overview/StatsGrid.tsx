import React from 'react';
import { StatsProps } from '../../types';

const StatsGrid: React.FC< StatsProps > = ( {
	label,
	value,
	icon: Icon,
	color,
} ): JSX.Element => {
	return (
		//box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
		<div className="bg-white rounded-lg shadow-[rgba(0,0,0,0.1)_0px_2px_4px]! border border-gray-200 p-4 sm:p-6">
			<div className="flex items-center justify-between mb-4">
				<div
					className={ `w-10 h-10 sm:w-12 sm:h-12 ${ color } rounded-lg flex items-center justify-center` }
				>
					<Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
				</div>
			</div>
			<p className="text-xl! sm:text-2xl! font-bold! text-gray-900 m-0!">
				{ value }
			</p>
			<p className="text-xs! sm:text-sm! text-gray-600 m-0! mt-1!">
				{ label }
			</p>
		</div>
	);
};

export default StatsGrid;
