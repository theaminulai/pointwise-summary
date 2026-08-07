import { LucideIcon } from 'lucide-react';

/**
 * Props for the Heading component.
 */
type HeadingProps = {
	icon: LucideIcon;
	title: string;
	description?: string;
	isBorderless?: boolean;
	isPaddingless?: boolean;
	className?: string;
};

/**
 * Renders a section heading with icon, title, and optional description.
 *
 * @param props               Component props.
 * @param props.icon
 * @param props.title
 * @param props.description
 * @param props.className
 * @param props.isBorderless
 * @param props.isPaddingless
 * @return Heading block.
 */
const Heading: React.FC< HeadingProps > = ( {
	icon: Icon,
	title,
	description,
	className = '',
	isBorderless = false,
	isPaddingless = false,
} ) => {
	return (
		<div
			className={ `flex items-center gap-3 sm:gap-4 ${
				isPaddingless ? '' : 'p-4 sm:p-6'
			} ${
				isBorderless ? '' : 'border-b border-gray-200'
			} ${ className }` }
		>
			<span className="h-8 w-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 shrink-0">
				<Icon className="w-5 h-5" />
			</span>

			<div className="flex-1 min-w-0">
				<h3 className="text-gray-900 text-base! font-medium! m-0!">
					{ title }
				</h3>

				{ description && (
					<p className="text-sm text-gray-600 m-0!">
						{ description }
					</p>
				) }
			</div>
		</div>
	);
};

export default Heading;
