import type * as React from 'react';
import {
	Activity,
	Eye,
	MousePointerClick,
	Send,
	Share2,
	TableOfContents,
	TrendingUp,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/types';
import { StatsProps } from '../../types';
import { Heading, Title } from '../common';
import QuickStat from './QuickStat';
import RecentActivityItem from './RecentActivityItem';
import StatsGrid from './StatsGrid';
import TopPostItem from './TopPostItem';

export const Overview: React.FC = () => {
	const { stats, recentActivity, topPosts, quickSettings } = useSelector(
		( state: RootState ) => state.overview
	);

	const iconMap = {
		'trending-up': TrendingUp,
		eye: Eye,
		'mouse-pointer-click': MousePointerClick,
		'share-2': Share2,
	};

	const statsWithIcons: StatsProps[] = stats.map( ( stat ) => ( {
		...stat,
		icon: iconMap[ stat.iconKey ],
	} ) );

	return (
		<div className="space-y-6 lg:space-y-8">
			{ /* Header */ }
			<Title
				title="Overview"
				description="Overview of your AI summary and social sharing performance"
			/>

			{ /* Stats Grid */ }
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
				{ statsWithIcons.map( ( stat, index ) => {
					const Icon = stat.icon;
					return (
						<StatsGrid
							key={ index }
							label={ stat.label }
							value={ stat.value }
							icon={ Icon }
							color={ stat.color }
						/>
					);
				} ) }
			</div>

			<div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
				{ /* Recent Activity */ }
				<div className="bg-white rounded-lg border border-gray-200">
					<Heading icon={ Activity } title="Recent Activity" />
					<div className="p-4 sm:p-6">
						<div className="space-y-4">
							{ recentActivity.map( ( activity, index ) => (
								<RecentActivityItem
									key={ index }
									activity={ activity }
								/>
							) ) }
						</div>
					</div>
				</div>

				{ /* Top Posts */ }
				<div className="bg-white rounded-lg border border-gray-200">
					<Heading icon={ Send } title="Top Performing Posts" />
					<div className="p-4 sm:p-6">
						<div className="space-y-4">
							{ topPosts.map( ( post, index ) => (
								<TopPostItem
									key={ index }
									post={ post }
									index={ index }
								/>
							) ) }
						</div>
					</div>
				</div>
			</div>

			{ /* Quick Settings Overview */ }
			<div className="bg-white rounded-lg border border-gray-200">
				<Heading
					icon={ TableOfContents }
					title="Quick Settings Overview"
				/>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
					{ quickSettings.map( ( setting ) => (
						<QuickStat
							key={ setting.title }
							title={ setting.title }
							value={ setting.value }
							description={ setting.description }
							className={ setting.className }
						/>
					) ) }
				</div>
			</div>
		</div>
	);
};
