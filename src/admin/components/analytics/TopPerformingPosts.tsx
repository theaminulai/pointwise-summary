import type * as React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/types';

export const TopPerformingPosts: React.FC = () => {
	const topPosts = useSelector(
		( state: RootState ) => state.analytics.topPosts
	);

	if ( ! topPosts.length ) {
		return (
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
				<h3 className="text-gray-900">Top Performing Posts</h3>
				<p className="text-sm text-gray-500 mt-2">No data available.</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200">
			<div className="p-4 sm:p-6 border-b border-gray-200">
				<h3 className="text-gray-900">Top Performing Posts</h3>
				<p className="text-xs sm:text-sm text-gray-600 mt-1">
					Posts with the highest summary engagement
				</p>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full min-w-[600px]">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Post Title
							</th>
							<th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Summaries
							</th>
							<th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								CTR
							</th>
							<th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Avg. Time
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{ topPosts.map( ( post, index ) => (
							<tr key={ index } className="hover:bg-gray-50">
								<td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">
									{ post.title }
								</td>
								<td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-700">
									{ post.summaries }
								</td>
								<td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-700">
									<span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
										{ post.ctr }%
									</span>
								</td>
								<td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-700">
									{ post.avgTime }
								</td>
							</tr>
						) ) }
					</tbody>
				</table>
			</div>
		</div>
	);
};
