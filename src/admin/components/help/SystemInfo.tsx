import type * as React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/types';

export const SystemInfo: React.FC = () => {
	const systemInfo = useSelector(
		( state: RootState ) => state.help.systemInfo
	);

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
			<h3 className="text-gray-900 mb-4">System Information</h3>

			<div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
				<div>
					<h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-3">
						Plugin Details
					</h4>
					<dl className="space-y-2 text-xs sm:text-sm">
						{ systemInfo.plugin.map( ( item ) => (
							<div
								key={ item.label }
								className="flex justify-between gap-4"
							>
								<dt className="text-gray-600">
									{ item.label }:
								</dt>
								<dd
									className={ `${
										item.valueClass || 'text-gray-900'
									} font-medium` }
								>
									{ item.value }
								</dd>
							</div>
						) ) }
					</dl>
				</div>

				<div>
					<h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-3">
						WordPress Environment
					</h4>
					<dl className="space-y-2 text-xs sm:text-sm">
						{ systemInfo.environment.map( ( item ) => (
							<div
								key={ item.label }
								className="flex justify-between gap-4"
							>
								<dt className="text-gray-600">
									{ item.label }:
								</dt>
								<dd className="text-gray-900 font-medium">
									{ item.value }
								</dd>
							</div>
						) ) }
					</dl>
				</div>
			</div>
		</div>
	);
};
