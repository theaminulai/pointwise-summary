import type * as React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/types';

export const Insights: React.FC = (  ) => {
	const insights = useSelector(
		( state: RootState ) => state.analytics.insights
	);

	if ( ! insights.length ) {
		return (
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
				<h3 className="text-gray-900 mb-2">Insights</h3>
				<p className="text-sm text-gray-500">No data available.</p>
			</div>
		);
	}

	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
			{ insights.map( ( insight ) => (
				<div
					key={ insight.label }
					className={ `${
						insight.bgClass
					} rounded-lg p-4 sm:p-6 border ${ insight.borderClass } ${
						insight.className || ''
					}` }
				>
					<h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-2">
						{ insight.label }
					</h4>
					<p
						className={ `text-xl sm:text-2xl font-bold ${ insight.valueClass }` }
					>
						{ insight.value }
					</p>
					<p className="text-xs text-gray-600 mt-1">
						{ insight.detail }
					</p>
				</div>
			) ) }
		</div>
	);
};