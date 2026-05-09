import type * as React from 'react';
import { Zap } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/types';

export const QuickStartGuide: React.FC = () => {
	const quickStart = useSelector(
		( state: RootState ) => state.help.quickStart
	);

	return (
		<div className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-lg shadow-sm border border-indigo-200 p-4 sm:p-6">
			<div className="flex items-center gap-3 mb-4">
				<div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
					<Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
				</div>
				<h3 className="text-gray-900">Quick Start Guide</h3>
			</div>

			<div className="space-y-3">
				{ quickStart.map( ( step, index ) => (
					<div key={ index } className="flex items-start gap-3">
						<div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium shrink-0">
							{ index + 1 }
						</div>
						<p className="text-xs sm:text-sm text-gray-700 m-0! pt-0.5">
							{ step }
						</p>
					</div>
				) ) }
			</div>
		</div>
	);
};
