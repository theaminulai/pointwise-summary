import { TopPost } from '../../types';

type TopPostItemProps = {
	post: TopPost;
	index: number;
};
const TopPostItem: React.FC< TopPostItemProps > = ( {
	post,
	index,
} ): JSX.Element => {
	return (
		<div className="flex items-start justify-between gap-4">
			<div className="flex-1 min-w-0">
				<p className="text-sm font-medium text-gray-900 truncate m-0!">
					{ post.title }
				</p>

				<div className="flex items-center gap-3 sm:gap-4 mt-1 flex-wrap">
					<span className="text-xs text-gray-500">
						{ post.summaries } summaries
					</span>
					<span className="text-xs text-gray-500">
						{ post.shares } shares
					</span>
				</div>
			</div>

			<div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-50 text-indigo-600 text-xs sm:text-sm font-medium shrink-0">
				{ index + 1 }
			</div>
		</div>
	);
};
export default TopPostItem;
