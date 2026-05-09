import type * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Book, Code, ExternalLink, HelpCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/types';

export const DocumentationLinks: React.FC = () => {
	const documentationLinks = useSelector(
		( state: RootState ) => state.help.documentationLinks
	);
	const iconMap: Record< string, LucideIcon > = {
		book: Book,
		code: Code,
		'help-circle': HelpCircle,
	};

	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
			{ documentationLinks.map( ( link ) => {
				const Icon = iconMap[ link.iconKey as keyof typeof iconMap ];
				return (
					<a
						key={ link.title }
						href={ link.url }
						target="_blank"
						rel="noopener noreferrer"
						className={ `bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow ${ link.cardClass }` }
					>
						<div
							className={ `w-10 h-10 sm:w-12 sm:h-12 ${ link.bgClass } rounded-lg flex items-center justify-center mb-4` }
						>
							<Icon
								className={ `w-5 h-5 sm:w-6 sm:h-6 ${ link.iconClass }` }
							/>
						</div>
						<h4 className="text-gray-900 mb-2 text-sm sm:text-base">
							{ link.title }
						</h4>
						<p className="text-xs sm:text-sm text-gray-600 mb-3">
							{ link.description }
						</p>
						<div className="flex items-center gap-1 text-xs sm:text-sm text-indigo-600 font-medium">
							{ link.cta }
							<ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
						</div>
					</a>
				);
			} ) }
		</div>
	);
};
