import { __ } from '@wordpress/i18n';
import { HelpCircle } from 'lucide-react';
import type * as React from 'react';

/**
 * HelpCard Component.
 *
 * Renders a stylized information card providing guidance on how to use
 * the display settings panel and real-time preview.
 *
 * @returns The rendered help card.
 */
export const HelpCard: React.FC = () => {
	return (
		<div className="bg-linear-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg">
			<div className="p-6">
				<div className="flex items-start gap-3">
					<div className="bg-indigo-100 p-2 rounded-lg shrink-0">
						<HelpCircle className="w-4 h-4 text-indigo-600" />
					</div>
					<div className="space-y-2">
						<h4 className="font-medium text-sm text-gray-900 m-0!">
							{ __( 'Need Help?', 'pointwise-summary' ) }
						</h4>
						<p className="text-xs text-gray-600 leading-relaxed m-0!">
							{ __(
								'Use the tabs to configure display mode, position, and style. Changes are shown in real-time in the preview.',
								'pointwise-summary'
							) }
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
