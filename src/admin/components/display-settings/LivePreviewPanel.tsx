import { __, sprintf } from '@wordpress/i18n';
import { Info } from 'lucide-react';
import type * as React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/types';
import { getFloatingPositionClass } from '../../utils/displayHelpers';
import { Title } from '../common';
import { HelpCard } from './HelpCard';
import { PreviewButton } from './PreviewButton';

/**
 * LivePreviewPanel Component.
 *
 * Provides a real-time visual representation of how the summary buttons
 * will appear on the front-end based on the current configuration.
 *
 * It subscribes to the Redux store to reactively update the layout,
 * styles, and positions (both inline and floating) of the preview buttons.
 *
 * @returns The rendered preview panel.
 */
export const LivePreviewPanel: React.FC = () => {
	const { mode, position, style, preview } = useSelector(
		( state: RootState ) => state.displaySettings
	);
	const { displayMode, enableScrollTrigger, scrollTrigger } = mode;
	const { floatingPosition, inlinePosition, buttonAlignment } = position;
	const { buttonStyle, buttonShape, iconDisplay, enableAnimations } = style;
	const previewContent = preview;
	const isFloatingMode = displayMode === 'floating' || displayMode === 'both';
	const isInlineMode =
		displayMode === 'inline' ||
		displayMode === 'collapse' ||
		displayMode === 'both';

	return (
		<div className="lg:col-span-1">
			<div className="sticky top-6 space-y-4">
				<div className="bg-white rounded-lg border border-gray-200">
					<div className="p-6 pb-4 border-b border-gray-200">
						<Title
							title={ __( 'Live Preview', 'pointwise-summary' ) }
							description={ __( 'See how your button will look', 'pointwise-summary' ) }
						/>
					</div>
					<div className="p-6">
						<div className="bg-gray-50 rounded-lg p-6 min-h-[400px] relative border-2 border-dashed border-gray-200">
							<div className="space-y-4">
								{ inlinePosition === 'before-title' && isInlineMode && (
										<PreviewButton
											style={ buttonStyle }
											shape={ buttonShape }
											iconDisplay={ iconDisplay }
											displayMode={ displayMode }
											alignment={ buttonAlignment }
											animated={ enableAnimations }
										/>
									) }
								<div>
									<h3 className="font-semibold text-gray-900 text-sm mb-2">
										{ previewContent.title }
									</h3>
									{ inlinePosition === 'after-title' && isInlineMode && (
											<div className="mb-3">
												<PreviewButton
													style={ buttonStyle }
													shape={ buttonShape }
													iconDisplay={ iconDisplay }
													displayMode={ displayMode }
													alignment={
														buttonAlignment
													}
													animated={
														enableAnimations
													}
												/>
											</div>
										) }
									{ inlinePosition === 'before-content' && isInlineMode && (
											<div className="mb-3">
												<PreviewButton
													style={ buttonStyle }
													shape={ buttonShape }
													iconDisplay={ iconDisplay }
													displayMode={ displayMode }
													alignment={
														buttonAlignment
													}
													animated={
														enableAnimations
													}
												/>
											</div>
										) }
									<p className="text-xs text-gray-600 leading-relaxed">
										{ previewContent.body }
									</p>
									{ inlinePosition === 'after-content' && isInlineMode && (
											<div className="mt-3">
												<PreviewButton
													style={ buttonStyle }
													shape={ buttonShape }
													iconDisplay={ iconDisplay }
													displayMode={ displayMode }
													alignment={
														buttonAlignment
													}
													animated={
														enableAnimations
													}
												/>
											</div>
										) }
								</div>
							</div>

							{ isFloatingMode && (
								<div
									className={ `absolute ${ getFloatingPositionClass(
										floatingPosition
									) }` }
									style={ {
										opacity: enableScrollTrigger ? 0.7 : 1,
									} }
								>
									<PreviewButton
										style={ buttonStyle }
										shape={ buttonShape }
										iconDisplay={ iconDisplay }
											displayMode={ displayMode }
										floatingPosition={ floatingPosition }
										alignment="center"
										animated={ enableAnimations }
										floating
									/>
								</div>
							) }
						</div>

						{ enableScrollTrigger && isFloatingMode && (
								<div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
									<div className="flex items-start gap-2">
										<Info className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
									<p className="text-xs text-indigo-900 m-0!">
										{ sprintf(
											/* translators: %s is replaced with scroll trigger percentage */
											__( 'Floating button will appear after %s scroll', 'pointwise-summary' ),
											`%${ scrollTrigger }`
										) }
										</p>
									</div>
								</div>
							) }
					</div>
				</div>
				<HelpCard />
			</div>
		</div>
	);
};
