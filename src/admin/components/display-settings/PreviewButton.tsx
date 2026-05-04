import { __ } from '@wordpress/i18n';
import { Sparkles } from 'lucide-react';
import type * as React from 'react';
import type { ComponentType } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { DisplayMode, IconDisplay, RootState } from '../../store/types';
import {
	getAlignmentClasses,
	getFloatingMenuPositionClasses,
	getShapeClasses,
	getStyleClasses,
	type ButtonAlignment,
	type ButtonShape,
	type ButtonStyle,
	type FloatingPosition,
} from '../../utils/displayHelpers';
import { ChatGPT, Claude, Gemini, GoogleAI, Grok, Perplexity } from '../icons';


const LOGO_MAP: Record<string, ComponentType<{ className?: string }>> = {
	chatgpt: ChatGPT,
	gemini: Gemini,
	claude: Claude,
	perplexity: Perplexity,
	grok: Grok,
	'google-ai': GoogleAI,
};


interface PreviewButtonProps {
	style: ButtonStyle;
	shape: ButtonShape;
	iconDisplay: IconDisplay;
	displayMode: DisplayMode;
	alignment: ButtonAlignment;
	animated: boolean;
	floating?: boolean;
	floatingPosition?: FloatingPosition;
}

interface PlatformButtonProps {
	logoKey: string;
	name: string;
	iconDisplay: IconDisplay;
	className: string;
}

interface PlatformListProps {
	platforms: Array<{ id: string; logoKey: string; name: string }>;
	className?: string;
}

interface InlineButtonGroupProps {
	platforms: Array<{ id: string; logoKey: string; name: string; enabled: boolean }>;
	iconDisplay: IconDisplay;
	baseButtonClasses: string;
	alignment: ButtonAlignment;
}

interface FloatingButtonProps {
	platforms: Array<{ id: string; logoKey: string; name: string; enabled: boolean }>;
	iconDisplay: IconDisplay;
	baseButtonClasses: string;
	alignment: ButtonAlignment;
	floating: boolean;
	floatingPosition?: FloatingPosition;
}

/**
 * Renders a single platform button with optional icon and/or label.
 */
const PlatformButton: React.FC<PlatformButtonProps> = ({
	logoKey,
	name,
	iconDisplay,
	className,
}) => {
	const Logo = LOGO_MAP[logoKey];
	const padding = iconDisplay === 'icons-only' ? 'p-2' : 'px-3 py-2';

	return (
		<button className={`cursor-pointer ${className} ${padding}`}>
			{iconDisplay !== 'text-only' && Logo && <Logo className="w-3.5 h-3.5" />}
			{iconDisplay !== 'icons-only' && <span>{name}</span>}
		</button>
	);
};

/**
 * Renders the expandable list of enabled platforms (used in dropdown menus).
 */
const PlatformList: React.FC<PlatformListProps> = ({ platforms, className }) => (
	<div className={`bg-white border border-gray-200 rounded-lg p-2 shadow-md space-y-1 min-w-[150px] ${className ?? ''}`}>
		{platforms.map(({ id, logoKey, name }) => {
			const Logo = LOGO_MAP[logoKey];
			return (
				<div
					key={id}
					className="text-xs px-2 py-1 rounded border border-gray-100 bg-gray-50 flex items-center gap-2"
				>
					{Logo && <Logo className="w-3.5 h-3.5" />}
					<span>{name}</span>
				</div>
			);
		})}
	</div>
);

/**
 * Inline mode: renders one button per enabled platform (or a fallback "Ask AI" button).
 */
const InlineButtonGroup: React.FC<InlineButtonGroupProps> = ({ platforms, iconDisplay, baseButtonClasses, alignment }) => {
	const enabledPlatforms = platforms.filter((p) => p.enabled);

	return (
		<div className={`flex ${getAlignmentClasses(alignment)}`}>
			<div className="flex flex-wrap items-center gap-2">
				{enabledPlatforms.length > 0 ? (
					enabledPlatforms.map((platform) => (
						<PlatformButton
							key={platform.id}
							logoKey={platform.logoKey}
							name={platform.name}
							iconDisplay={iconDisplay}
							className={baseButtonClasses}
						/>
					))
				) : (
					<button
						className={`${baseButtonClasses} ${iconDisplay === 'icons-only' ? 'p-2' : 'px-3 py-2'} cursor-pointer`}
					>
						{iconDisplay !== 'text-only' && <Sparkles className="w-3.5 h-3.5" />}
						{iconDisplay !== 'icons-only' && (
							<span>{__('Ask AI', 'pointwise-summary')}</span>
						)}
					</button>
				)}
			</div>
		</div>
	);
};

/**
 * Floating / collapsed mode: renders a single "Ask AI" toggle button
 * with an expandable platform list.
 */
const FloatingButton: React.FC<FloatingButtonProps> = ({ platforms, iconDisplay, baseButtonClasses, alignment, floating, floatingPosition }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const enabledPlatforms = platforms.filter((p) => p.enabled);
	const showList = isExpanded && enabledPlatforms.length > 0;

	return (
		<div className={`flex ${getAlignmentClasses(alignment)} relative`}>
			<div className="relative inline-flex flex-col items-start gap-2">
				{floating && showList && (
					<PlatformList
						platforms={enabledPlatforms}
						className={getFloatingMenuPositionClasses(floatingPosition)}
					/>
				)}

				<button
					type="button"
					onClick={() => setIsExpanded((prev) => !prev)}
					className={`${baseButtonClasses} ${iconDisplay === 'icons-only' ? 'p-2' : 'px-3 py-2'} cursor-pointer`}
				>
					{iconDisplay !== 'text-only' && <Sparkles className="w-3.5 h-3.5" />}
					{iconDisplay !== 'icons-only' && (
						<span>{__('Ask AI', 'pointwise-summary')}</span>
					)}
				</button>

				{!floating && showList && <PlatformList platforms={enabledPlatforms} />}
			</div>
		</div>
	);
};


/**
 * PreviewButton Component.
 *
 * Renders a live preview of the AI action button, routing to either
 * InlineButtonGroup or FloatingButton based on the current display mode.
 */
export const PreviewButton: React.FC<PreviewButtonProps> = ({
	style,
	shape,
	iconDisplay,
	displayMode,
	alignment,
	animated,
	floating,
	floatingPosition,
}) => {
	const platforms = useSelector((state: RootState) => state.aiSettings.platforms);

	const baseButtonClasses = [
		getStyleClasses(style),
		getShapeClasses(shape),
		animated ? 'transition-all duration-200' : '',
		'text-xs font-medium flex items-center gap-2',
	]
		.filter(Boolean)
		.join(' ');

	const showPerModelButtons = displayMode === 'inline' || (displayMode === 'both' && !floating);

	if (showPerModelButtons) {
		return (
			<InlineButtonGroup
				platforms={platforms}
				iconDisplay={iconDisplay}
				baseButtonClasses={baseButtonClasses}
				alignment={alignment}
			/>
		);
	}

	return (
		<FloatingButton
			platforms={platforms}
			iconDisplay={iconDisplay}
			baseButtonClasses={baseButtonClasses}
			alignment={alignment}
			floating={floating ?? false}
			floatingPosition={floatingPosition}
		/>
	);
};