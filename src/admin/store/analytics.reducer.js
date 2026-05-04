/**
 * analytics.reducer.js
 *
 * Redux reducer for analytics mock data.
 */

import {
	SET_ANALYTICS_CUSTOM_RANGE,
	SET_ANALYTICS_RANGE,
} from './analytics.actions';

const clampToRange = (value, min, max) =>
	Math.max(min, Math.min(value, max));

const toDateValue = (value) => new Date(`${value}T00:00:00Z`);

const getRangeDays = (startDate, endDate) => {
	const start = toDateValue(startDate);
	const end = toDateValue(endDate);
	const diff = Math.floor((end - start) / 86400000) + 1;
	return clampToRange(diff, 1, 365);
};

const scaleValue = (value, scale) =>
	Math.max(1, Math.round(value * scale));

const monthLabels = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

const formatShortDate = (dateValue) => {
	const month = monthLabels[dateValue.getUTCMonth()];
	const day = String(dateValue.getUTCDate()).padStart(2, '0');
	return `${month} ${day}`;
};

const buildDailySummaryData = (startDate, days) => {
	const start = toDateValue(startDate);
	const output = [];
	for (let i = 0; i < days; i += 1) {
		const current = new Date(start.getTime() + i * 86400000);
		const summaries =
			40 + ((i * 7) % 35) + Math.round(12 * Math.sin(i / 5));
		output.push({
			date: formatShortDate(current),
			dateKey: current.toISOString().slice(0, 10),
			summaries,
			views: summaries * 3 + 60,
			shares: Math.max(1, Math.round(summaries * 0.4)),
		});
	}
	return output;
};

const analyticsRangeData = {
	summaryData: [
		{
			date: 'Jan 15',
			dateKey: '2026-01-15',
			summaries: 45,
			views: 120,
			shares: 23,
		},
		{
			date: 'Jan 16',
			dateKey: '2026-01-16',
			summaries: 52,
			views: 145,
			shares: 28,
		},
		{
			date: 'Jan 17',
			dateKey: '2026-01-17',
			summaries: 38,
			views: 95,
			shares: 18,
		},
		{
			date: 'Jan 18',
			dateKey: '2026-01-18',
			summaries: 61,
			views: 178,
			shares: 35,
		},
		{
			date: 'Jan 19',
			dateKey: '2026-01-19',
			summaries: 48,
			views: 132,
			shares: 25,
		},
		{
			date: 'Jan 20',
			dateKey: '2026-01-20',
			summaries: 55,
			views: 156,
			shares: 31,
		},
		{
			date: 'Jan 21',
			dateKey: '2026-01-21',
			summaries: 67,
			views: 189,
			shares: 42,
		},
		{
			date: 'mar 20',
			dateKey: '2026-03-20',
			summaries: 35,
			views: 105,
			shares: 18,
		},
		{
			date: 'mar 21',
			dateKey: '2026-03-21',
			summaries: 42,
			views: 126,
			shares: 22,
		},
		{
			date: 'mar 22',
			dateKey: '2026-03-22',
			summaries: 29,
			views: 87,
			shares: 15,
		},
		{
			date: 'mar 23',
			dateKey: '2026-03-23',
			summaries: 55,
			views: 156,
			shares: 31,
		},
		{
			date: 'mar 24',
			dateKey: '2026-03-24',
			summaries: 48,
			views: 132,
			shares: 25,
		},
		{
			date: 'mar 25',
			dateKey: '2026-03-25',
			summaries: 42,
			views: 126,
			shares: 22,
		},
		{
			date: 'mar 26',
			dateKey: '2026-03-26',
			summaries: 38,
			views: 114,
			shares: 19,
		},
		{
			date: 'mar 27',
			dateKey: '2026-03-27',
			summaries: 51,
			views: 153,
			shares: 26,
		},
		{
			date: 'mar 28',
			dateKey: '2026-03-28',
			summaries: 35,
			views: 105,
			shares: 18,
		},
		{
			date: 'Mar 01',
			dateKey: '2026-03-01',
			summaries: 210,
			views: 620,
			shares: 88,
		},
		{
			date: 'Mar 04',
			dateKey: '2026-03-04',
			summaries: 198,
			views: 580,
			shares: 79,
		},
		{
			date: 'Mar 07',
			dateKey: '2026-03-07',
			summaries: 225,
			views: 660,
			shares: 92,
		},
		{
			date: 'Mar 10',
			dateKey: '2026-03-10',
			summaries: 240,
			views: 710,
			shares: 98,
		},
		{
			date: 'Mar 13',
			dateKey: '2026-03-13',
			summaries: 260,
			views: 760,
			shares: 104,
		},
		{
			date: 'Mar 16',
			dateKey: '2026-03-16',
			summaries: 248,
			views: 730,
			shares: 96,
		},
		{
			date: 'Mar 19',
			dateKey: '2026-03-19',
			summaries: 275,
			views: 805,
			shares: 111,
		},
		{
			date: 'Mar 22',
			dateKey: '2026-03-22',
			summaries: 290,
			views: 860,
			shares: 120,
		},
		{
			date: 'Mar 25',
			dateKey: '2026-03-25',
			summaries: 305,
			views: 905,
			shares: 128,
		},
		{
			date: 'Mar 28',
			dateKey: '2026-03-28',
			summaries: 318,
			views: 940,
			shares: 132,
		},
		{
			date: 'Apr',
			dateKey: '2025-04-01',
			summaries: 920,
			views: 2650,
			shares: 420,
		},
		{
			date: 'May',
			dateKey: '2025-05-01',
			summaries: 980,
			views: 2810,
			shares: 460,
		},
		{
			date: 'Jun',
			dateKey: '2025-06-01',
			summaries: 1050,
			views: 3020,
			shares: 510,
		},
		{
			date: 'Jul',
			dateKey: '2025-07-01',
			summaries: 1120,
			views: 3185,
			shares: 545,
		},
		{
			date: 'Aug',
			dateKey: '2025-08-01',
			summaries: 1085,
			views: 3090,
			shares: 520,
		},
		{
			date: 'Sep',
			dateKey: '2025-09-01',
			summaries: 1175,
			views: 3325,
			shares: 575,
		},
		{
			date: 'Oct',
			dateKey: '2025-10-01',
			summaries: 1230,
			views: 3460,
			shares: 610,
		},
		{
			date: 'Nov',
			dateKey: '2025-11-01',
			summaries: 1315,
			views: 3680,
			shares: 660,
		},
		{
			date: 'Dec',
			dateKey: '2025-12-01',
			summaries: 1390,
			views: 3850,
			shares: 705,
		},
		{
			date: 'Jan',
			dateKey: '2026-01-01',
			summaries: 1275,
			views: 3615,
			shares: 642,
		},
		{
			date: 'Feb',
			dateKey: '2026-02-01',
			summaries: 1205,
			views: 3440,
			shares: 602,
		},
		{
			date: 'Mar',
			dateKey: '2026-03-01',
			summaries: 1340,
			views: 3785,
			shares: 688,
		},
	],
	aiPlatformData: [
		{
			name: 'ChatGPT',
			value: 145,
			color: '#10b981',
			dateKey: '2026-01-21',
		},
		{
			name: 'Gemini',
			value: 98,
			color: '#3b82f6',
			dateKey: '2026-01-21',
		},
		{
			name: 'Claude',
			value: 76,
			color: '#8b5cf6',
			dateKey: '2026-01-21',
		},
		{
			name: 'Perplexity',
			value: 54,
			color: '#f59e0b',
			dateKey: '2026-01-21',
		},
		{
			name: 'ChatGPT',
			value: 620,
			color: '#10b981',
			dateKey: '2026-03-28',
		},
		{
			name: 'Gemini',
			value: 410,
			color: '#3b82f6',
			dateKey: '2026-03-28',
		},
		{
			name: 'Claude',
			value: 295,
			color: '#8b5cf6',
			dateKey: '2026-03-28',
		},
		{
			name: 'Perplexity',
			value: 180,
			color: '#f59e0b',
			dateKey: '2026-03-28',
		},
		{
			name: 'ChatGPT',
			value: 6150,
			color: '#10b981',
			dateKey: '2026-03-01',
		},
		{
			name: 'Gemini',
			value: 4180,
			color: '#3b82f6',
			dateKey: '2026-03-01',
		},
		{
			name: 'Claude',
			value: 3290,
			color: '#8b5cf6',
			dateKey: '2026-03-01',
		},
		{
			name: 'Perplexity',
			value: 2100,
			color: '#f59e0b',
			dateKey: '2026-03-01',
		},
	],
	socialShareData: [
		{
			name: 'Twitter',
			value: 156,
			color: '#000000',
			dateKey: '2026-01-21',
		},
		{
			name: 'LinkedIn',
			value: 134,
			color: '#0077b5',
			dateKey: '2026-01-21',
		},
		{
			name: 'Facebook',
			value: 98,
			color: '#1877f2',
			dateKey: '2026-01-21',
		},
		{
			name: 'Telegram',
			value: 45,
			color: '#0088cc',
			dateKey: '2026-01-21',
		},
		{
			name: 'WhatsApp',
			value: 23,
			color: '#25d366',
			dateKey: '2026-01-21',
		},
		{
			name: 'Twitter',
			value: 640,
			color: '#000000',
			dateKey: '2026-03-28',
		},
		{
			name: 'LinkedIn',
			value: 520,
			color: '#0077b5',
			dateKey: '2026-03-28',
		},
		{
			name: 'Facebook',
			value: 410,
			color: '#1877f2',
			dateKey: '2026-03-28',
		},
		{
			name: 'Telegram',
			value: 210,
			color: '#0088cc',
			dateKey: '2026-03-28',
		},
		{
			name: 'WhatsApp',
			value: 160,
			color: '#25d366',
			dateKey: '2026-03-28',
		},
		{
			name: 'Twitter',
			value: 4720,
			color: '#000000',
			dateKey: '2026-03-01',
		},
		{
			name: 'LinkedIn',
			value: 3890,
			color: '#0077b5',
			dateKey: '2026-03-01',
		},
		{
			name: 'Facebook',
			value: 3210,
			color: '#1877f2',
			dateKey: '2026-03-01',
		},
		{
			name: 'Telegram',
			value: 1790,
			color: '#0088cc',
			dateKey: '2026-03-01',
		},
		{
			name: 'WhatsApp',
			value: 1485,
			color: '#25d366',
			dateKey: '2026-03-01',
		},
	],
	topPosts: [
		{
			title: 'Getting Started with WordPress Development',
			summaries: 145,
			ctr: 34.2,
			avgTime: '2:15',
			dateKey: '2026-01-21',
		},
		{
			title: 'Top 10 SEO Tips for 2026',
			summaries: 132,
			ctr: 28.5,
			avgTime: '1:45',
			dateKey: '2026-01-21',
		},
		{
			title: 'Understanding React Hooks',
			summaries: 98,
			ctr: 31.8,
			avgTime: '2:30',
			dateKey: '2026-01-21',
		},
		{
			title: 'CSS Grid vs Flexbox',
			summaries: 87,
			ctr: 25.6,
			avgTime: '1:58',
			dateKey: '2026-01-21',
		},
		{
			title: 'JavaScript Best Practices',
			summaries: 76,
			ctr: 29.3,
			avgTime: '2:08',
			dateKey: '2026-01-21',
		},
		{
			title: 'Building a Fast WordPress Site',
			summaries: 620,
			ctr: 32.4,
			avgTime: '2:26',
			dateKey: '2026-03-28',
		},
		{
			title: 'Advanced SEO Audit Checklist',
			summaries: 585,
			ctr: 27.9,
			avgTime: '1:52',
			dateKey: '2026-03-28',
		},
		{
			title: 'React Performance Tricks',
			summaries: 498,
			ctr: 29.6,
			avgTime: '2:33',
			dateKey: '2026-03-28',
		},
		{
			title: 'Creating Content Briefs',
			summaries: 452,
			ctr: 24.1,
			avgTime: '2:05',
			dateKey: '2026-03-28',
		},
		{
			title: 'Modern CSS Strategies',
			summaries: 410,
			ctr: 26.8,
			avgTime: '1:57',
			dateKey: '2026-03-28',
		},
		{
			title: 'Ultimate WordPress Optimization Guide',
			summaries: 3120,
			ctr: 33.8,
			avgTime: '2:41',
			dateKey: '2026-03-01',
		},
		{
			title: 'Enterprise SEO Playbook',
			summaries: 2845,
			ctr: 29.4,
			avgTime: '2:12',
			dateKey: '2026-03-01',
		},
		{
			title: 'Scaling React Apps in 2026',
			summaries: 2675,
			ctr: 30.1,
			avgTime: '2:36',
			dateKey: '2026-03-01',
		},
		{
			title: 'Content Strategy for Growth',
			summaries: 2450,
			ctr: 26.7,
			avgTime: '2:08',
			dateKey: '2026-03-01',
		},
		{
			title: 'Modern CSS Architecture',
			summaries: 2215,
			ctr: 27.9,
			avgTime: '2:02',
			dateKey: '2026-03-01',
		},
	],
	insights: [
		{
			label: 'Best Performing Day',
			value: 'Jan 21',
			detail: '67 summaries generated',
			accent: 'indigo',
			bgClass: 'bg-linear-to-br from-blue-50 to-indigo-50',
			borderClass: 'border-blue-100',
			valueClass: 'text-indigo-600',
			dateKey: '2026-01-21',
		},
		{
			label: 'Most Popular AI',
			value: 'ChatGPT',
			detail: '39% of all summaries',
			accent: 'green',
			bgClass: 'bg-linear-to-br from-green-50 to-emerald-50',
			borderClass: 'border-green-100',
			valueClass: 'text-green-600',
			dateKey: '2026-01-21',
		},
		{
			label: 'Avg. Engagement',
			value: '29.9%',
			detail: 'Click-through rate',
			accent: 'purple',
			bgClass: 'bg-linear-to-br from-purple-50 to-pink-50',
			borderClass: 'border-purple-100',
			valueClass: 'text-purple-600',
			className: 'sm:col-span-2 lg:col-span-1',
			dateKey: '2026-01-21',
		},
		{
			label: 'Best Performing Day',
			value: 'Mar 25',
			detail: '305 summaries generated',
			accent: 'indigo',
			bgClass: 'bg-linear-to-br from-blue-50 to-indigo-50',
			borderClass: 'border-blue-100',
			valueClass: 'text-indigo-600',
			dateKey: '2026-03-28',
		},
		{
			label: 'Most Popular AI',
			value: 'ChatGPT',
			detail: '43% of all summaries',
			accent: 'green',
			bgClass: 'bg-linear-to-br from-green-50 to-emerald-50',
			borderClass: 'border-green-100',
			valueClass: 'text-green-600',
			dateKey: '2026-03-28',
		},
		{
			label: 'Avg. Engagement',
			value: '27.4%',
			detail: 'Click-through rate',
			accent: 'purple',
			bgClass: 'bg-linear-to-br from-purple-50 to-pink-50',
			borderClass: 'border-purple-100',
			valueClass: 'text-purple-600',
			className: 'sm:col-span-2 lg:col-span-1',
			dateKey: '2026-03-28',
		},
		{
			label: 'Best Performing Day',
			value: 'Nov',
			detail: '1,315 summaries generated',
			accent: 'indigo',
			bgClass: 'bg-linear-to-br from-blue-50 to-indigo-50',
			borderClass: 'border-blue-100',
			valueClass: 'text-indigo-600',
			dateKey: '2026-03-01',
		},
		{
			label: 'Most Popular AI',
			value: 'ChatGPT',
			detail: '41% of all summaries',
			accent: 'green',
			bgClass: 'bg-linear-to-br from-green-50 to-emerald-50',
			borderClass: 'border-green-100',
			valueClass: 'text-green-600',
			dateKey: '2026-03-01',
		},
		{
			label: 'Avg. Engagement',
			value: '28.6%',
			detail: 'Click-through rate',
			accent: 'purple',
			bgClass: 'bg-linear-to-br from-purple-50 to-pink-50',
			borderClass: 'border-purple-100',
			valueClass: 'text-purple-600',
			className: 'sm:col-span-2 lg:col-span-1',
			dateKey: '2026-03-01',
		},
	],
};

const analyticsRangeBounds = {
	weekly: { startDate: '2026-01-15', endDate: '2026-01-21' },
	monthly: { startDate: '2026-03-01', endDate: '2026-03-28' },
	yearly: { startDate: '2025-04-01', endDate: '2026-03-01' },
};

const filterByRange = (items, range) => {
	const bounds = analyticsRangeBounds[range];
	if (!bounds) {
		return [];
	}
	const start = toDateValue(bounds.startDate);
	const end = toDateValue(bounds.endDate);
	return items.filter((item) => {
		const itemDate = toDateValue(item.dateKey);
		return itemDate >= start && itemDate <= end;
	});
};

const getRangeData = (range) => ({
	summaryData: filterByRange(analyticsRangeData.summaryData, range),
	aiPlatformData: filterByRange(analyticsRangeData.aiPlatformData, range),
	socialShareData: filterByRange(analyticsRangeData.socialShareData, range),
	topPosts: filterByRange(analyticsRangeData.topPosts, range),
	insights: filterByRange(analyticsRangeData.insights, range),
});

const emptyRangeData = {
	summaryData: [],
	aiPlatformData: [],
	socialShareData: [],
	topPosts: [],
	insights: [],
};

const dailySummaryData = buildDailySummaryData('2025-04-01', 375);

const buildCustomRangeData = (customRange) => {
	const base = getRangeData('yearly') || emptyRangeData;
	const start = customRange.startDate || '2025-04-01';
	const end = customRange.endDate || '2026-04-10';
	const startValue = toDateValue(start);
	const endValue = toDateValue(end);
	const safeStart = startValue <= endValue ? start : end;
	const safeEnd = startValue <= endValue ? end : start;

	const filteredSummary = dailySummaryData.filter((item) => {
		const itemDate = toDateValue(item.dateKey);
		return (
			itemDate >= toDateValue(safeStart) &&
			itemDate <= toDateValue(safeEnd)
		);
	});

	const daysInRange = getRangeDays(safeStart, safeEnd);
	const scale = clampToRange(daysInRange / 365, 0.05, 1);

	const totalAi = base.aiPlatformData.reduce(
		(sum, item) => sum + item.value,
		0
	);
	const maxAi = base.aiPlatformData.reduce((max, item) =>
		item.value > max.value ? item : max
	);
	const maxAiPercent = Math.round((maxAi.value / totalAi) * 100);

	const bestDay = (filteredSummary.length
		? filteredSummary
		: dailySummaryData
	).reduce((max, item) =>
		item.summaries > max.summaries ? item : max
	);

	return {
		summaryData: filteredSummary.length
			? filteredSummary
			: dailySummaryData.slice(-7),
		aiPlatformData: base.aiPlatformData.map((item) => ({
			...item,
			value: scaleValue(item.value, scale),
		})),
		socialShareData: base.socialShareData.map((item) => ({
			...item,
			value: scaleValue(item.value, scale),
		})),
		topPosts: base.topPosts.map((item) => ({
			...item,
			summaries: scaleValue(item.summaries, scale),
		})),
		insights: [
			{
				label: 'Best Performing Day',
				value: bestDay.date,
				detail: `${bestDay.summaries} summaries generated`,
				accent: 'indigo',
				bgClass: 'bg-linear-to-br from-blue-50 to-indigo-50',
				borderClass: 'border-blue-100',
				valueClass: 'text-indigo-600',
			},
			{
				label: 'Most Popular AI',
				value: maxAi.name,
				detail: `${maxAiPercent}% of all summaries`,
				accent: 'green',
				bgClass: 'bg-linear-to-br from-green-50 to-emerald-50',
				borderClass: 'border-green-100',
				valueClass: 'text-green-600',
			},
			{
				label: 'Avg. Engagement',
				value: '28.9%',
				detail: 'Click-through rate',
				accent: 'purple',
				bgClass: 'bg-linear-to-br from-purple-50 to-pink-50',
				borderClass: 'border-purple-100',
				valueClass: 'text-purple-600',
				className: 'sm:col-span-2 lg:col-span-1',
			},
		],
	};
};

const initialState = {
	...(getRangeData('weekly') || emptyRangeData),
	range: 'weekly',
	customRange: {
		startDate: '',
		endDate: '',
	},
};

const analyticsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ANALYTICS_RANGE:
			{
				const nextRange =
					getRangeData(action.payload)
						? action.payload
						: action.payload === 'custom'
							? 'custom'
							: 'weekly';
				if (nextRange === 'custom') {
					const customData = buildCustomRangeData(
						state.customRange
					);
					return {
						...state,
						...customData,
						range: 'custom',
					};
				}
				const rangeData =
					getRangeData(nextRange) || emptyRangeData;
				return {
					...state,
					...rangeData,
					range: nextRange,
				};
			}
		case SET_ANALYTICS_CUSTOM_RANGE:
			{
				const nextCustomRange = {
					startDate: action.payload?.startDate || '',
					endDate: action.payload?.endDate || '',
				};
				const customData = buildCustomRangeData(nextCustomRange);
				return {
					...state,
					...customData,
					customRange: nextCustomRange,
					range: 'custom',
				};
			}
		default:
			return state;
	}
};

export default analyticsReducer;
