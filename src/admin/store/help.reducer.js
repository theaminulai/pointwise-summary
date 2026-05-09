/**
 * help.reducer.js
 *
 * Redux reducer for help screen mock data.
 */

const initialState = {
	faqs: [
		{
			question: 'Do I need API keys for AI platforms?',
			answer: 'No! Pointwise Summary works client-side. Users are directed to AI platforms with pre-filled prompts, so no API keys or server-side processing is required.',
		},
		{
			question: 'Is this plugin GDPR compliant?',
			answer: "Yes, Pointwise Summary is 100% GDPR compliant. No user data is collected, stored, or transmitted. All summary generation happens on the user's device.",
		},
		// {
		// 	question: 'Can I customize prompts for different posts?',
		// 	answer: 'Absolutely! You can set global default prompts for each AI platform, and also override them on a per-post basis using the Per-Post Settings tab.',
		// },
		{
			question: 'How does the scroll trigger work?',
			answer: 'The scroll trigger displays the floating button only after users scroll a certain percentage down the page (configurable from 5% to 50%), reducing initial visual clutter.',
		},
		// {
		// 	question: 'Can I use shortcodes?',
		// 	answer: 'Yes! Use [pointwise_summary] to manually place summary buttons anywhere in your content. You can also pass parameters like ai="chatgpt" or style="minimal".',
		// },
	],
	quickStart: [
		'Install and activate Pointwise Summary plugin',
		'Go to AI Settings and enable your preferred AI platforms',
		'Configure display settings (floating, inline, or both)',
		'Optionally enable social sharing integration',
		'Customize visual styling to match your theme',
		"Test on a post and you're ready to go!",
	],
	shortcodeExamples: [],
	documentationLinks: [
		{
			title: 'Documentation',
			description: 'Complete guide to all features and settings',
			cta: 'Read Docs',
			url: '#',
			iconKey: 'book',
			bgClass: 'bg-blue-100',
			iconClass: 'text-blue-600',
			cardClass: '',
		},
		{
			title: 'Developer Guide',
			description: 'Hooks, filters, and customization options',
			cta: 'View Guide',
			url: '#',
			iconKey: 'code',
			bgClass: 'bg-green-100',
			iconClass: 'text-green-600',
			cardClass: '',
		},
		{
			title: 'Support Forum',
			description: 'Get help from the community',
			cta: 'Visit Forum',
			url: 'https://github.com/theaminulai/pointwise-summary/issues',
			iconKey: 'help-circle',
			bgClass: 'bg-purple-100',
			iconClass: 'text-purple-600',
			cardClass: 'sm:col-span-2 lg:col-span-1',
		},
	],
	systemInfo: {
		plugin: [],
		environment: [],
	},
	contactSupport: {
		title: 'Need More Help?',
		body: 'Our dedicated support team is always available to assist you in making the most of Pointwise Summary. Whether you have questions about features, need guidance on using the tool effectively, or require help troubleshooting any issues, our experts are here to provide personalized support. We aim to ensure that you can fully leverage the capabilities of Pointwise Summary to save time, organize information efficiently, and achieve the best possible results. Your success and satisfaction are our top priorities, and we are committed to guiding you every step of the way.',
		links: [
			{ label: 'Contact Support', href: '#', variant: 'secondary' },
			{ label: 'Report a Bug', href: '#', variant: 'primary' },
		],
	},
};

import {
	SET_HELP_DATA,
	SET_SHORTCODE_EXAMPLES,
	SET_SYSTEM_INFO,
} from './help.actions';

const helpReducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case SET_HELP_DATA:
			return {
				...state,
				...action.payload,
			};
		case SET_SHORTCODE_EXAMPLES:
			return {
				...state,
				shortcodeExamples: Array.isArray( action.payload )
					? action.payload
					: state.shortcodeExamples,
			};
		case SET_SYSTEM_INFO:
			return {
				...state,
				systemInfo: action.payload || state.systemInfo,
			};
		default:
			return state;
	}
};

export default helpReducer;
