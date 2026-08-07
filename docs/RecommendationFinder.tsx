import React, { useState } from 'react';
import { Sparkles, CheckCircle } from 'lucide-react';

type Priority = 'simplicity' | 'features' | 'customization' | 'minimal';

const recommendations = {
	simplicity: {
		plugin: 'AI Post Summarizer Lite',
		reason: 'Simplest setup with no configuration needed',
		benefits: [
			'One-click installation and activation',
			'No API keys or complex settings required',
			'100% client-side operation',
			'GDPR compliant out of the box',
			'Perfect for non-technical users',
		],
		considerations: [
			'Limited to ChatGPT in free version',
			'Basic styling options',
			'Pro version needed for advanced features',
		],
	},
	features: {
		plugin: 'AI Share & Summarize',
		reason: 'Best all-in-one solution with social sharing integration',
		benefits: [
			'6 AI platforms supported',
			'7 social networks included',
			'5 visual styles to choose from',
			'400+ active installations (proven track record)',
			'Extensive shortcode support',
			'SEO optimization options',
		],
		considerations: [
			'More options means more configuration',
			'May be overkill if you only need AI summaries',
			'Requires understanding of available features',
		],
	},
	customization: {
		plugin: 'Sumtics – AI Summarizer',
		reason: 'Most flexible with per-post customization options',
		benefits: [
			'Per-post override capabilities',
			'Flexible summary length options (short/medium/detailed)',
			'6 floating button positions',
			'Custom prompts per model and per post',
			'Combined inline + floating button options',
			'6 AI platforms supported',
		],
		considerations: [
			'Requires more setup time',
			'Best suited for users who need granular control',
			'May need to configure individual posts',
		],
	},
	minimal: {
		plugin: 'SummaTap',
		reason: 'Least intrusive with smart scroll-triggered display',
		benefits: [
			'Button only appears after 10% scroll',
			'Includes heading structure in prompts',
			'Post/page exclusion system',
			'Live preview in settings',
			'20 language locales supported',
			'Excellent accessibility features',
		],
		considerations: [
			'Only supports ChatGPT',
			'Limited to floating button (no inline)',
			'Fewer styling options',
		],
	},
};

const quickRecommendations = [
	{
		title: 'Best for Beginners',
		plugin: 'AI Post Summarizer Lite',
		icon: '🌱',
		description: 'Simplest setup, no configuration needed',
	},
	{
		title: 'Best All-in-One',
		plugin: 'AI Share & Summarize',
		icon: '⭐',
		description: 'Social sharing + AI, 400+ active users',
	},
	{
		title: 'Best for Power Users',
		plugin: 'Sumtics',
		icon: '⚡',
		description: 'Per-post overrides, maximum flexibility',
	},
	{
		title: 'Best for UX',
		plugin: 'SummaTap',
		icon: '✨',
		description: 'Scroll-triggered, minimal interference',
	},
];

export function RecommendationFinder() {
	const [ selectedPriority, setSelectedPriority ] =
		useState< Priority | null >( null );

	const priorities = [
		{
			value: 'simplicity' as Priority,
			label: 'Simplicity & Ease of Use',
			icon: '🎯',
		},
		{
			value: 'features' as Priority,
			label: 'Maximum Features & Options',
			icon: '🚀',
		},
		{
			value: 'customization' as Priority,
			label: 'Customization & Control',
			icon: '⚙️',
		},
		{
			value: 'minimal' as Priority,
			label: 'Minimal User Interference',
			icon: '🎨',
		},
	];

	return (
		<div className="space-y-8">
			{ /* Quick Recommendations */ }
			<div className="bg-white rounded-lg shadow-md p-6">
				<h2 className="text-gray-900 mb-6">Quick Recommendations</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{ quickRecommendations.map( ( rec, index ) => (
						<div
							key={ index }
							className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100"
						>
							<div className="text-3xl mb-2">{ rec.icon }</div>
							<h3 className="text-sm font-medium text-gray-900 mb-1">
								{ rec.title }
							</h3>
							<p className="text-sm text-indigo-600 font-medium mb-2">
								{ rec.plugin }
							</p>
							<p className="text-xs text-gray-600">
								{ rec.description }
							</p>
						</div>
					) ) }
				</div>
			</div>

			{ /* Interactive Finder */ }
			<div className="bg-white rounded-lg shadow-md p-6">
				<div className="flex items-center gap-3 mb-6">
					<Sparkles className="w-6 h-6 text-indigo-600" />
					<h2 className="text-gray-900">Find Your Perfect Plugin</h2>
				</div>

				<p className="text-gray-600 mb-6">
					What&apos;s most important to you when choosing a WordPress
					AI summarizer plugin?
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
					{ priorities.map( ( priority ) => (
						<button
							key={ priority.value }
							onClick={ () =>
								setSelectedPriority( priority.value )
							}
							className={ `p-4 rounded-lg border-2 text-left transition-all ${
								selectedPriority === priority.value
									? 'border-indigo-500 bg-indigo-50'
									: 'border-gray-200 bg-white hover:border-indigo-200'
							}` }
						>
							<div className="flex items-center gap-3">
								<span className="text-2xl">
									{ priority.icon }
								</span>
								<span className="font-medium text-gray-900">
									{ priority.label }
								</span>
							</div>
						</button>
					) ) }
				</div>

				{ /* Recommendation Result */ }
				{ selectedPriority && (
					<div className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
						<div className="flex items-start gap-4">
							<CheckCircle className="w-8 h-8 text-indigo-600 shrink-0 mt-1" />
							<div className="flex-1">
								<h3 className="text-gray-900 mb-2">
									We recommend:{ ' ' }
									{
										recommendations[ selectedPriority ]
											.plugin
									}
								</h3>
								<p className="text-gray-700 mb-4">
									{
										recommendations[ selectedPriority ]
											.reason
									}
								</p>

								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<h4 className="text-sm font-medium text-gray-900 mb-3">
											Key Benefits:
										</h4>
										<ul className="space-y-2">
											{ recommendations[
												selectedPriority
											].benefits.map(
												( benefit, index ) => (
													<li
														key={ index }
														className="flex items-start gap-2 text-sm text-gray-700"
													>
														<div className="w-1.5 h-1.5 bg-indigo-600 rounded-full shrink-0 mt-1.5" />
														<span>{ benefit }</span>
													</li>
												)
											) }
										</ul>
									</div>

									<div>
										<h4 className="text-sm font-medium text-gray-900 mb-3">
											Considerations:
										</h4>
										<ul className="space-y-2">
											{ recommendations[
												selectedPriority
											].considerations.map(
												( consideration, index ) => (
													<li
														key={ index }
														className="flex items-start gap-2 text-sm text-gray-700"
													>
														<div className="w-1.5 h-1.5 bg-amber-600 rounded-full shrink-0 mt-1.5" />
														<span>
															{ consideration }
														</span>
													</li>
												)
											) }
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				) }
			</div>
		</div>
	);
}
