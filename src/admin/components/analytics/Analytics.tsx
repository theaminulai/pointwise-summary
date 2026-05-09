import type * as React from 'react';
import { AIPlatformDistribution } from './AIPlatformDistribution';
import { Header } from './Header';
import { Insights } from './Insights';
import { SocialShares } from './SocialShares';
import { SummaryChart } from './SummaryChart';
import { TopPerformingPosts } from './TopPerformingPosts';

export const Analytics: React.FC = () => {
	return (
		<div className="space-y-6 lg:space-y-8">
			<Header />
			<SummaryChart />
			<div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
				<AIPlatformDistribution />
				<SocialShares />
			</div>
			<TopPerformingPosts />
			<Insights />
		</div>
	);
};
