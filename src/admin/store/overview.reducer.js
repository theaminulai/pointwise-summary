/**
 * overview.reducer.js
 *
 * Redux reducer for overview screen mock data.
 */

const initialState = {
	stats: [
		{
			label: 'Total Summaries Generated',
			value: '1,234',
			iconKey: 'trending-up',
			color: 'bg-blue-500',
		},
		{
			label: 'Summary Views',
			value: '5,678',
			iconKey: 'eye',
			color: 'bg-green-500',
		},
		{
			label: 'Click-Through Rate',
			value: '23.4%',
			iconKey: 'mouse-pointer-click',
			color: 'bg-purple-500',
		},
		{
			label: 'Social Shares',
			value: '456',
			iconKey: 'share-2',
			color: 'bg-pink-500',
		},
	],
	recentActivity: [
		{
			post: 'Getting Started with WordPress Development',
			action: 'Summary generated',
			time: '2 minutes ago',
			status: 'success',
		},
		{
			post: 'Top 10 SEO Tips for 2026',
			action: 'Shared on Twitter',
			time: '15 minutes ago',
			status: 'success',
		},
		{
			post: 'Understanding React Hooks',
			action: 'Summary viewed',
			time: '1 hour ago',
			status: 'success',
		},
		{
			post: 'CSS Grid vs Flexbox',
			action: 'Summary generation failed',
			time: '2 hours ago',
			status: 'error',
		},
		{
			post: 'JavaScript Best Practices',
			action: 'Summary generated',
			time: '3 hours ago',
			status: 'success',
		},
	],
	topPosts: [
		{
			title: 'Getting Started with WordPress Development',
			summaries: 145,
			shares: 23,
		},
		{ title: 'Top 10 SEO Tips for 2026', summaries: 132, shares: 45 },
		{ title: 'Understanding React Hooks', summaries: 98, shares: 12 },
		{ title: 'CSS Grid vs Flexbox', summaries: 87, shares: 19 },
	],
	quickSettings: [
		{
			title: 'AI Platforms Enabled',
			value: 4,
			description: 'ChatGPT, Gemini, Claude, Perplexity',
		},
		{
			title: 'Display Mode',
			value: 'Floating + Inline',
			description: 'Bottom-right position, scroll trigger enabled',
		},
		{
			title: 'Social Networks',
			value: 5,
			description: 'Twitter, LinkedIn, Facebook, Telegram, WhatsApp',
			className: 'sm:col-span-2 lg:col-span-1',
		},
	],
};

const overviewReducer = ( state = initialState ) => state;

export default overviewReducer;
