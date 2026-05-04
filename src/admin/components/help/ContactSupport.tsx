import type * as React from 'react';
import { MessageCircleQuestionMark } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/types';

export const ContactSupport: React.FC = (  ) => {
	const contactSupport = useSelector(
		( state: RootState ) => state.help.contactSupport
	);

	return (
		<div className="bg-white rounded-lg border border-gray-200">
			<div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 border-b border-gray-200">
				<span className="h-8 w-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
					<MessageCircleQuestionMark className="w-5 h-5" />
				</span>
				<h3 className="text-gray-900 text-base! font-medium! m-0!">
					{ contactSupport.title }
				</h3>
			</div>
			<div className="p-4 sm:p-6">
				<div className="space-y-4">
					<p className="text-gray-900 mb-4 mt-0! text-sm sm:text-base">
						{ contactSupport.body }
					</p>
					<div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
						{ contactSupport.links.map( ( link ) => (
							<a
								key={ link.label }
								href={ link.href }
								className={ `inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm ${
									link.variant === 'primary'
										? 'bg-indigo-500 text-white! hover:bg-indigo-400'
										: 'bg-gray-200 text-indigo-600 hover:bg-indigo-50'
								}` }
							>
								{ link.label }
							</a>
						) ) }
					</div>
				</div>
			</div>
		</div>
	);
};