import type * as React from 'react';
import { useSelector } from 'react-redux';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import type { RootState } from '../../store/types';

export const SocialShares: React.FC = () => {
	const socialShareData = useSelector(
		( state: RootState ) => state.analytics.socialShareData
	);

	if ( ! socialShareData.length ) {
		return (
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
				<h3 className="text-gray-900 mb-4">
					Social Sharing Distribution
				</h3>
				<p className="text-sm text-gray-500">No data available.</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
			<h3 className="text-gray-900 mb-4">Social Sharing Distribution</h3>
			<div className="w-full overflow-x-auto">
				<div className="min-w-[320px]">
					<ResponsiveContainer width="100%" height={ 300 }>
						<BarChart data={ socialShareData }>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="#f0f0f0"
							/>
							<XAxis
								dataKey="name"
								stroke="#6b7280"
								style={ { fontSize: '12px' } }
							/>
							<YAxis
								stroke="#6b7280"
								style={ { fontSize: '12px' } }
							/>
							<Tooltip
								contentStyle={ {
									backgroundColor: '#fff',
									border: '1px solid #e5e7eb',
									borderRadius: '8px',
									fontSize: '12px',
								} }
							/>
							<Bar dataKey="value" fill="#6366f1">
								{ socialShareData.map( ( entry, index ) => (
									<Cell
										key={ `cell-${ index }` }
										fill={ entry.color }
									/>
								) ) }
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};
