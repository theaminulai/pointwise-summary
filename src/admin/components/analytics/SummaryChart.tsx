import type * as React from 'react';
import { useSelector } from 'react-redux';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import type { RootState } from '../../store/types';

export const SummaryChart: React.FC = (  ) => {
	const summaryData = useSelector(
		( state: RootState ) => state.analytics.summaryData
	);

	if ( ! summaryData.length ) {
		return (
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
				<h3 className="text-gray-900 mb-4">
					Summary Activity Over Time
				</h3>
				<p className="text-sm text-gray-500">No data available.</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
			<h3 className="text-gray-900 mb-4">Summary Activity Over Time</h3>
			<div className="w-full overflow-x-auto">
				<div className="min-w-[500px]">
					<ResponsiveContainer width="100%" height={ 300 }>
						<LineChart data={ summaryData }>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="#f0f0f0"
							/>
							<XAxis
								dataKey="date"
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
							<Legend wrapperStyle={ { fontSize: '12px' } } />
							<Line
								type="monotone"
								dataKey="summaries"
								stroke="#6366f1"
								strokeWidth={ 2 }
								name="Summaries Generated"
							/>
							<Line
								type="monotone"
								dataKey="views"
								stroke="#10b981"
								strokeWidth={ 2 }
								name="Summary Views"
							/>
							<Line
								type="monotone"
								dataKey="shares"
								stroke="#f59e0b"
								strokeWidth={ 2 }
								name="Social Shares"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};