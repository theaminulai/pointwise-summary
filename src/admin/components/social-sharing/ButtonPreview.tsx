import { __ } from '@wordpress/i18n';
import type { LucideIcon } from 'lucide-react';
import {
	Bookmark,
	Facebook,
	Linkedin,
	Mail,
	Send,
	Sparkles,
	Twitter,
} from 'lucide-react';
import type * as React from 'react';
import type { ComponentType, ReactNode } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type {
	AiPlatform,
	RootState,
	SocialNetworkState,
} from '../../store/types';
import {
	getShapeClasses,
	getStyleClasses,
	type ButtonShape,
	type ButtonStyle,
} from '../../utils/displayHelpers';
import getLocalizedAskAiText from '../../utils/getLocalizedAskAiText';
import interleaveButtons from '../../utils/interleaveButtons';
import {
	ChatGPT,
	Claude,
	Gemini,
	GoogleAI,
	Grok,
	Perplexity,
	Whatsapp,
} from '../icons';
import type { ButtonOrder } from './SocialSharing';

const AI_ICON_MAP: Record< string, ComponentType< { className?: string } > > = {
	chatgpt: ChatGPT,
	gemini: Gemini,
	claude: Claude,
	perplexity: Perplexity,
	grok: Grok,
	'google-ai': GoogleAI,
};

function ButtonChip( {
	icon: Icon,
	label,
	className,
	style,
	showIcon = true,
}: {
	icon: LucideIcon;
	label: string;
	className: string;
	style?: React.CSSProperties;
	showIcon?: boolean;
} ) {
	return (
		<div className={ className } style={ style }>
			{ showIcon && <Icon className="w-4 h-4" /> }
			{ label }
		</div>
	);
}

export const ButtonPreview: React.FC = () => {
	const [ isAiExpanded, setIsAiExpanded ] = useState( false );
	const networks = useSelector(
		( state: RootState ) => state.socialSharing.networks
	);
	const aiPlatforms = useSelector(
		( state: RootState ) => state.aiSettings.platforms
	);
	const display = useSelector(
		( state: RootState ) => state.displaySettings
	);
	const buttonOrder = useSelector(
		( state: RootState ) => state.socialSharing.buttonOrder as ButtonOrder
	);
	const translations = useSelector(
		( state: RootState ) => state.advancedSettings.translations
	);
	const displayMode = display.mode.displayMode;
	const { buttonStyle, buttonShape, iconDisplay } = display.style;
	const askAiText = getLocalizedAskAiText(
		translations,
		__( 'Ask AI', 'pointwise-summary' )
	);

	const networkIconMap: Record< string, LucideIcon > = {
		twitter: Twitter,
		linkedin: Linkedin,
		facebook: Facebook,
		telegram: Send,
		whatsapp: Whatsapp,
		email: Mail,
		raindrop: Bookmark,
	};
	const enabledNetworks = networks.filter( ( network ) => network.enabled );
	const enabledAiPlatforms = aiPlatforms.filter(
		( platform ) => platform.enabled
	);

	const getPreviewButtonClasses = (
		shape?: ButtonShape,
		style?: ButtonStyle
	) =>
		`flex items-center gap-2 px-3 py-2 text-sm ${ getStyleClasses(
			style ?? ( buttonStyle as ButtonStyle )
		) } ${ getShapeClasses( shape ?? ( buttonShape as ButtonShape ) ) }`;

	const getDefaultStyle = ( color: string ) =>
		buttonStyle === 'default'
			? {
					backgroundColor: color,
					borderColor: color,
					color: '#ffffff',
			  }
			: undefined;

	const renderAiModelButtons = ( items: AiPlatform[] ): ReactNode[] =>
		items.map( ( platform ) => {
			const Icon = AI_ICON_MAP[ platform.logoKey ];
			const classes = getPreviewButtonClasses();
			const style = getDefaultStyle( platform.color );
			const showIcon = iconDisplay !== 'text-only';
			const showLabel = iconDisplay !== 'icons-only';

			return (
				<div key={ platform.id } className={ classes } style={ style }>
					{ showIcon && Icon && <Icon className="w-4 h-4" /> }
					{ showLabel && platform.name }
				</div>
			);
		} );

	const askAiButtonClasses = `${ getPreviewButtonClasses() } cursor-pointer`;
	const askAiStyle =
		buttonStyle === 'default'
			? {
					backgroundColor: '#4f46e5',
					borderColor: '#4f46e5',
					color: '#ffffff',
			  }
			: undefined;
	const showAskAiIcon = iconDisplay !== 'text-only';
	const showAskAiLabel = iconDisplay !== 'icons-only';
	const askAiButton = (
		<button
			type="button"
			onClick={ () => setIsAiExpanded( ( prev ) => ! prev ) }
			className={ askAiButtonClasses }
			style={ askAiStyle }
		>
			{ showAskAiIcon && <Sparkles className="w-4 h-4" /> }
			{ showAskAiLabel && askAiText }
		</button>
	);

	const renderNetworkButtons = ( items: SocialNetworkState[] ): ReactNode[] =>
		items.map( ( network ) => {
			const Icon = networkIconMap[ network.iconKey ] || Sparkles;
			const classes = getPreviewButtonClasses();
			const style = getDefaultStyle( network.color );
			const showIcon = iconDisplay !== 'text-only';
			const showLabel = iconDisplay !== 'icons-only';
			return (
				<ButtonChip
					key={ network.id }
					icon={ Icon }
					label={ showLabel ? network.name : '' }
					style={ style }
					className={ classes }
					showIcon={ showIcon }
				/>
			);
		} );

	const shouldShowModelButtons =
		displayMode === 'inline' || displayMode === 'both';
	const shouldShowCollapseButton = displayMode === 'collapse';

	const aiElements: ReactNode[] = shouldShowModelButtons
		? renderAiModelButtons( enabledAiPlatforms )
		: shouldShowCollapseButton
		? [
				askAiButton,
				...( isAiExpanded
					? renderAiModelButtons( enabledAiPlatforms )
					: [] ),
		  ]
		: [];

	let previewContent: ReactNode[] = [];
	const socialButtons = renderNetworkButtons( enabledNetworks );

	if ( aiElements.length === 0 ) {
		previewContent = [ ...socialButtons ];
	} else if ( buttonOrder === 'social-first' ) {
		previewContent = [ ...socialButtons, ...aiElements ];
	} else if ( buttonOrder === 'ai-first' ) {
		previewContent = [ ...aiElements, ...socialButtons ];
	} else {
		previewContent = interleaveButtons( socialButtons, aiElements );
	}

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<h3 className="text-gray-900 mb-4">
				{ __( 'Button Preview', 'pointwise-summary' ) }
			</h3>

			<div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
				<div className="flex flex-wrap gap-2">{ previewContent }</div>
			</div>
		</div>
	);
};
