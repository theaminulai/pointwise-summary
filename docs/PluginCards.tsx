import React, { useState } from 'react';
import { Users, Star, Info, ChevronDown, ChevronUp } from 'lucide-react';

const plugins = [
	{
		name: 'AI Post Summarizer Lite',
		version: '1.0.1',
		installs: '<10',
		developer: 'R. Sabbir',
		badge: 'Simplest Setup',
		badgeColor: 'bg-green-100 text-green-800',
		features: [
			'One-click AI summary button on posts',
			'100% client-side operation (no API keys required)',
			'Currently supports only ChatGPT (Lite version)',
			'Simple position controls (before/after content)',
			'Responsive button design',
			'GDPR compliant (no data collection)',
			'Basic customization options',
		],
		proFeatures: [
			'6+ AI platforms (ChatGPT, Gemini, Claude, etc.)',
			'Advanced design engine with 20+ styles',
			'Smart prompt library',
			'Built-in analytics dashboard',
			'Advanced layout controls',
		],
	},
	{
		name: 'AI Share & Summarize',
		version: '1.2.1',
		installs: '400+',
		developer: 'Fernando Tellado',
		badge: 'Most Popular',
		badgeColor: 'bg-purple-100 text-purple-800',
		features: [
			'Dual functionality: Social sharing + AI summarization',
			'Social networks: X/Twitter, LinkedIn, Facebook, Telegram, WhatsApp, Email, Raindrop',
			'AI platforms: Claude, ChatGPT, Google AI, Gemini, Grok, Perplexity',
			'5 visual styles: Default, brand colors, minimal, dark backgrounds, icons-only',
			'SEO optimization: Choice between <a> links (nofollow) or <button> elements',
			'Advanced icon system: Icons-only mode, circular/square shapes, icons with text',
			'Flexible insertion: Before content, after content, both, or shortcode only',
			'Content type targeting: Select specific post types',
			'Custom AI prompts: Configurable per platform',
			'Button ordering: Social first, AI first, or mixed',
			'Button alignment: Left or centered',
			'Shortcode support: Extensive parameters for customization',
			'Translation ready (English & Spanish)',
		],
		uniqueFeatures: [
			'Combines social sharing with AI functionality',
			'Google AI Mode direct integration',
			'X/Twitter mention configuration',
			'Data cleanup control',
			'Accessible with enhanced tooltips',
		],
	},
	{
		name: 'Sumtics – AI Summarizer',
		version: '1.0.1',
		installs: '10+',
		developer: 'Aethonic',
		badge: 'Most Customizable',
		badgeColor: 'bg-blue-100 text-blue-800',
		features: [
			'Automatic TL;DR generation for posts and pages',
			'Floating Action Button (FAB): 6 position options (bottom-right, bottom-left, top-right, top-left, left-center, right-center)',
			'Automatic inline insertion: Before/after title or content',
			'AI models: ChatGPT, Gemini, Claude, Grok, Google AI, Perplexity',
			'Per-post overrides: Custom prompts, length, and position for individual posts',
			'Content type targeting: Control which post types display buttons',
			'Custom prompts: Global defaults with per-model and per-post overrides',
			'Summary lengths: Short, medium, or detailed',
			'Multiple display styles: Brand, minimal, icon-only',
			'No Follow attribute option for button links',
		],
		uniqueFeatures: [
			'Floating Action Button with 6 positioning options',
			'Per-post customization capabilities',
			'Flexible summary length options',
			'Combined inline + floating button options',
		],
	},
	{
		name: 'SummaTap',
		version: '1.0.0',
		installs: '<10',
		developer: 'GuruWalk SEO Team',
		badge: 'Least Intrusive',
		badgeColor: 'bg-amber-100 text-amber-800',
		features: [
			'Floating button on posts, pages, and custom post types',
			'Smart trigger: Button appears after 10% scroll',
			'ChatGPT only (prefills via ?q= parameter)',
			'Prompt includes: URL, Title, Meta title, H1/H2/H3 headings',
			'4 positions: Top-left, top-right, bottom-right, bottom-left',
			'Adjustable offsets with live preview in settings',
			'Multilingual support: 20 major locales + custom labels',
			'Exclusion system: Exclude specific post/page IDs',
			'Custom CSS class option for theming',
			'Accessibility features: Keyboard operable, visible focus, RTL support',
			'Gutenberg + Classic Editor support',
		],
		uniqueFeatures: [
			'Scroll-triggered display (10% threshold)',
			'Includes heading structure (H1/H2/H3) in prompts',
			'Live preview in admin settings',
			'Post/page exclusion system',
			'Supports both Gutenberg and Classic Editor',
		],
	},
];

export function PluginCards() {
	const [ expandedIndex, setExpandedIndex ] = useState< number | null >(
		null
	);

	const toggleExpand = ( index: number ) => {
		setExpandedIndex( expandedIndex === index ? null : index );
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			{ plugins.map( ( plugin, index ) => (
				<div
					key={ index }
					className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
				>
					<div className="p-6">
						{ /* Header */ }
						<div className="flex items-start justify-between mb-4">
							<div className="flex-1">
								<h3 className="text-gray-900 mb-2">
									{ plugin.name }
								</h3>
								<span
									className={ `inline-block px-3 py-1 rounded-full text-xs ${ plugin.badgeColor }` }
								>
									{ plugin.badge }
								</span>
							</div>
						</div>

						{ /* Metadata */ }
						<div className="grid grid-cols-2 gap-4 mb-4 text-sm">
							<div className="flex items-center gap-2 text-gray-600">
								<Info className="w-4 h-4" />
								<span>v{ plugin.version }</span>
							</div>
							<div className="flex items-center gap-2 text-gray-600">
								<Users className="w-4 h-4" />
								<span>{ plugin.installs } installs</span>
							</div>
						</div>
						<p className="text-sm text-gray-500 mb-4">
							Developer: { plugin.developer }
						</p>

						{ /* Features Preview */ }
						<div className="space-y-2 mb-4">
							{ plugin.features
								.slice( 0, 3 )
								.map( ( feature, i ) => (
									<div
										key={ i }
										className="flex items-start gap-2 text-sm text-gray-700"
									>
										<Star className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
										<span>{ feature }</span>
									</div>
								) ) }
							{ plugin.features.length > 3 && ! expandedIndex && (
								<p className="text-sm text-gray-500 italic">
									+ { plugin.features.length - 3 } more
									features
								</p>
							) }
						</div>

						{ /* Expandable Content */ }
						{ expandedIndex === index && (
							<div className="space-y-4 mb-4">
								{ /* Remaining Features */ }
								<div className="space-y-2">
									{ plugin.features
										.slice( 3 )
										.map( ( feature, i ) => (
											<div
												key={ i }
												className="flex items-start gap-2 text-sm text-gray-700"
											>
												<Star className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
												<span>{ feature }</span>
											</div>
										) ) }
								</div>

								{ /* Unique Features */ }
								{ plugin.uniqueFeatures && (
									<div>
										<h4 className="text-sm font-medium text-gray-900 mb-2">
											Unique Features:
										</h4>
										<div className="space-y-2">
											{ plugin.uniqueFeatures.map(
												( feature, i ) => (
													<div
														key={ i }
														className="flex items-start gap-2 text-sm text-gray-700"
													>
														<div className="w-2 h-2 bg-indigo-500 rounded-full shrink-0 mt-1.5" />
														<span>{ feature }</span>
													</div>
												)
											) }
										</div>
									</div>
								) }

								{ /* Pro Features */ }
								{ plugin.proFeatures && (
									<div>
										<h4 className="text-sm font-medium text-gray-900 mb-2">
											Pro Version Features:
										</h4>
										<div className="space-y-2">
											{ plugin.proFeatures.map(
												( feature, i ) => (
													<div
														key={ i }
														className="flex items-start gap-2 text-sm text-gray-700"
													>
														<div className="w-2 h-2 bg-purple-500 rounded-full shrink-0 mt-1.5" />
														<span>{ feature }</span>
													</div>
												)
											) }
										</div>
									</div>
								) }
							</div>
						) }

						{ /* Expand/Collapse Button */ }
						<button
							onClick={ () => toggleExpand( index ) }
							className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm"
						>
							{ expandedIndex === index ? (
								<>
									<ChevronUp className="w-4 h-4" />
									Show Less
								</>
							) : (
								<>
									<ChevronDown className="w-4 h-4" />
									Show All Features
								</>
							) }
						</button>
					</div>
				</div>
			) ) }
		</div>
	);
}
