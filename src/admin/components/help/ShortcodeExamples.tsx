import type * as React from 'react';
import { Lightbulb } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/types';

export const ShortcodeExamples: React.FC = (  ) => {
	const shortcodeExamples = useSelector(
		( state: RootState ) => state.help.shortcodeExamples
	);

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
			<div className="flex items-center gap-3 mb-4">
				<Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
				<h3 className="text-gray-900">Shortcode Examples</h3>
			</div>

			<div className="space-y-4">
				{ shortcodeExamples.map( ( example ) => (
					<div
						key={ example.code }
						className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200"
					>
						<code className="text-xs sm:text-sm text-gray-900 font-mono block mb-2 break-all">
							{ example.code }
						</code>
						<p className="text-xs text-gray-600">
							{ example.description }
						</p>
					</div>
				) ) }
			</div>
		</div>
	);
};