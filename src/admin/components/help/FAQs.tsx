import type * as React from 'react';
import { HelpCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/types';

export const FAQs: React.FC = () => {
	const faqs = useSelector( ( state: RootState ) => state.help.faqs );

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200">
			<div className="p-6 border-b border-gray-200">
				<h3 className="text-gray-900">Frequently Asked Questions</h3>
			</div>

			<div className="divide-y divide-gray-200">
				{ faqs.map( ( faq, index ) => (
					<div key={ index } className="p-6">
						<div className="flex items-start gap-4">
							<div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
								<HelpCircle className="w-5 h-5 text-indigo-600" />
							</div>
							<div className="flex-1">
								<h4 className="text-sm font-medium text-gray-900 m-0! mb-2!">
									{ faq.question }
								</h4>
								<p className="text-sm text-gray-600 m-0!">
									{ faq.answer }
								</p>
							</div>
						</div>
					</div>
				) ) }
			</div>
		</div>
	);
};
