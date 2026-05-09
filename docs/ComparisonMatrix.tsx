import { Check, X } from 'lucide-react';
import { Title } from '../src/admin/components/common';

const features = [
	{
		name: 'AI Platforms',
		values: [
			'ChatGPT only (6+ in Pro)',
			'6 platforms',
			'6 platforms',
			'ChatGPT only',
		],
	},
	{ name: 'Social Sharing', values: [ '❌', '✅ (7 networks)', '❌', '❌' ] },
	{
		name: 'Floating Button',
		values: [ '❌', '❌', '✅ (6 positions)', '✅ (4 positions)' ],
	},
	{ name: 'Inline Insertion', values: [ '✅', '✅', '✅', '❌' ] },
	{ name: 'API Keys Required', values: [ '❌', '❌', '❌', '❌' ] },
	{
		name: 'Custom Prompts',
		values: [
			'❌ (Pro only)',
			'✅',
			'✅ (per-model & per-post)',
			'✅ (includes headings)',
		],
	},
	{ name: 'Visual Styles', values: [ '1', '5', '3', '1' ] },
	{ name: 'Icons-Only Mode', values: [ '❌', '✅', '✅', '❌' ] },
	{
		name: 'SEO Options',
		values: [
			'❌',
			'✅ (link/button choice)',
			'✅ (nofollow option)',
			'❌',
		],
	},
	{ name: 'Per-Post Override', values: [ '❌', '❌', '✅', '❌' ] },
	{
		name: 'Shortcode Support',
		values: [ '❌', '✅ (extensive)', '❌', '❌' ],
	},
	{ name: 'Content Type Control', values: [ '❌', '✅', '✅', '✅' ] },
	{ name: 'Analytics', values: [ '❌ (Pro only)', '❌', '❌', '❌' ] },
	{ name: 'Scroll Trigger', values: [ '❌', '❌', '❌', '✅ (10% scroll)' ] },
	{ name: 'Exclusion System', values: [ '❌', '❌', '❌', '✅ (by ID)' ] },
	{
		name: 'Multilingual',
		values: [
			'Translation ready',
			'✅ (EN/ES)',
			'Translation ready',
			'✅ (20 locales)',
		],
	},
];

const plugins = [
	'AI Post Summarizer Lite',
	'AI Share & Summarize',
	'Sumtics',
	'SummaTap',
];

const renderValue = ( value: string ) => {
	if ( value === '✅' ) {
		return <Check className="w-5 h-5 text-green-600 mx-auto" />;
	}
	if ( value === '❌' ) {
		return <X className="w-5 h-5 text-gray-300 mx-auto" />;
	}
	return <span className="text-sm text-gray-700">{ value }</span>;
};

export function ComparisonMatrix() {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden">
			<Title
				title="Feature Comparison Matrix"
				description="Compare all features across the four plugins side-by-side"
			/>
			{ /* Desktop View */ }
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-4 text-left text-sm font-medium text-gray-900 w-1/5">
								Feature
							</th>
							{ plugins.map( ( plugin, index ) => (
								<th
									key={ index }
									className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-1/5"
								>
									{ plugin }
								</th>
							) ) }
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{ features.map( ( feature, index ) => (
							<tr
								key={ index }
								className={
									index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
								}
							>
								<td className="px-6 py-4 text-sm font-medium text-gray-900">
									{ feature.name }
								</td>
								{ feature.values.map( ( value, i ) => (
									<td
										key={ i }
										className="px-6 py-4 text-center"
									>
										{ renderValue( value ) }
									</td>
								) ) }
							</tr>
						) ) }
					</tbody>
				</table>
			</div>

			{ /* Mobile View */ }
			<div className="md:hidden p-4 space-y-6">
				{ plugins.map( ( plugin, pluginIndex ) => (
					<div
						key={ pluginIndex }
						className="bg-gray-50 rounded-lg p-4"
					>
						<h3 className="font-medium text-gray-900 mb-4">
							{ plugin }
						</h3>
						<div className="space-y-3">
							{ features.map( ( feature, featureIndex ) => (
								<div
									key={ featureIndex }
									className="flex justify-between items-center"
								>
									<span className="text-sm text-gray-700">
										{ feature.name }
									</span>
									<div>
										{ renderValue(
											feature.values[ pluginIndex ]
										) }
									</div>
								</div>
							) ) }
						</div>
					</div>
				) ) }
			</div>
		</div>
	);
}
