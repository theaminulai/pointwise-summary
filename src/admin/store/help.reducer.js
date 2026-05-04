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
		{
			question: 'Can I customize prompts for different posts?',
			answer: 'Absolutely! You can set global default prompts for each AI platform, and also override them on a per-post basis using the Per-Post Settings tab.',
		},
		{
			question: 'How does the scroll trigger work?',
			answer: 'The scroll trigger displays the floating button only after users scroll a certain percentage down the page (configurable from 5% to 50%), reducing initial visual clutter.',
		},
		{
			question: 'Can I use shortcodes?',
			answer: 'Yes! Use [pointwise_summary] to manually place summary buttons anywhere in your content. You can also pass parameters like ai="chatgpt" or style="minimal".',
		},
	],
	quickStart: [
		'Install and activate Pointwise Summary plugin',
		'Go to AI Settings and enable your preferred AI platforms',
		'Configure display settings (floating, inline, or both)',
		'Optionally enable social sharing integration',
		'Customize visual styling to match your theme',
		"Test on a post and you're ready to go!",
	],
	shortcodeExamples: [
		{
			code: '[pointwise_summary]',
			description:
				'Basic usage - displays all enabled AI platforms with default settings',
		},
		{
			code: '[pointwise_summary ai="chatgpt,gemini"]',
			description: 'Show only specific AI platforms',
		},
		{
			code: '[pointwise_summary style="minimal" align="center"]',
			description: 'Customize styling and alignment',
		},
		{
			code: '[pointwise_summary social="true" order="ai-first"]',
			description: 'Include social sharing with custom button order',
		},
	],
	documentationLinks: [
		{
			title: 'Documentation',
			description: 'Complete guide to all features and settings',
			cta: 'Read Docs',
			iconKey: 'book',
			bgClass: 'bg-blue-100',
			iconClass: 'text-blue-600',
			cardClass: '',
		},
		{
			title: 'Developer Guide',
			description: 'Hooks, filters, and customization options',
			cta: 'View Guide',
			iconKey: 'code',
			bgClass: 'bg-green-100',
			iconClass: 'text-green-600',
			cardClass: '',
		},
		{
			title: 'Support Forum',
			description: 'Get help from the community',
			cta: 'Visit Forum',
			iconKey: 'help-circle',
			bgClass: 'bg-purple-100',
			iconClass: 'text-purple-600',
			cardClass: 'sm:col-span-2 lg:col-span-1',
		},
	],
	systemInfo: {
		plugin: [
			{ label: 'Version', value: '1.0.0', valueClass: 'text-gray-900' },
			{ label: 'Status', value: 'Active', valueClass: 'text-green-600' },
			{
				label: 'Database Version',
				value: '1.0',
				valueClass: 'text-gray-900',
			},
		],
		environment: [
			{ label: 'WordPress Version', value: '6.4.2' },
			{ label: 'PHP Version', value: '8.2.0' },
			{ label: 'Theme', value: 'Twenty Twenty-Four' },
		],
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

const helpReducer = ( state = initialState ) => state;

export default helpReducer;
