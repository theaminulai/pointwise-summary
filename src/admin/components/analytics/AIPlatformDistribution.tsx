import type * as React from 'react';
import { useSelector } from 'react-redux';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { RootState } from '../../store/types';

export const AIPlatformDistribution: React.FC = () => {
	const aiPlatformData = useSelector(
		( state: RootState ) => state.analytics.aiPlatformData
	);

	if ( ! aiPlatformData.length ) {
		return (
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
				<h3 className="text-gray-900 mb-4">AI Platform Usage</h3>
				<p className="text-sm text-gray-500">No data available.</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
			<h3 className="text-gray-900 mb-4">AI Platform Usage</h3>
			<div className="w-full overflow-x-auto">
				<div className="min-w-[280px]">
					<ResponsiveContainer width="100%" height={ 300 }>
						<PieChart>
							<Pie
								data={ aiPlatformData }
								cx="50%"
								cy="50%"
								labelLine={ false }
								label={ ( { name, percent = 0 } ) =>
									`${ name } ${ ( percent * 100 ).toFixed(
										0
									) }%`
								}
								outerRadius={ 100 }
								fill="#8884d8"
								dataKey="value"
								style={ { fontSize: '12px' } }
							>
								{ aiPlatformData.map( ( entry, index ) => (
									<Cell
										key={ `cell-${ index }` }
										fill={ entry.color }
									/>
								) ) }
							</Pie>
							<Tooltip contentStyle={ { fontSize: '12px' } } />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
			<div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
				{ aiPlatformData.map( ( platform ) => (
					<div
						key={ platform.name }
						className="flex items-center gap-2"
					>
						<div
							className="w-3 h-3 rounded-full shrink-0"
							style={ { backgroundColor: platform.color } }
						/>
						<span className="text-xs sm:text-sm text-gray-700">
							{ platform.name }: { platform.value }
						</span>
					</div>
				) ) }
			</div>
		</div>
	);
};
