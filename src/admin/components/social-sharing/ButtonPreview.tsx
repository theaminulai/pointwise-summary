import { __ } from '@wordpress/i18n';
import type { LucideIcon } from 'lucide-react';
import { Bookmark, Facebook, Linkedin, Mail, Send, Sparkles, Twitter } from 'lucide-react';
import type * as React from 'react';
import type { ComponentType, ReactNode } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { AiPlatform, RootState, SocialNetworkState } from '../../store/types';
import { ChatGPT, Claude, Gemini, GoogleAI, Grok, Perplexity } from '../icons';
import type { ButtonOrder } from './SocialSharing';

const AI_ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
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
}: {
	icon: LucideIcon;
	label: string;
	className: string;
} ) {
	return (
		<div className={ className }>
			<Icon className="w-4 h-4" />
			{ label }
		</div>
	);
}

export const ButtonPreview: React.FC = () => {
	const [isAiExpanded, setIsAiExpanded] = useState( false );
	const networks = useSelector( ( state: RootState ) => state.socialSharing.networks);
	const aiPlatforms = useSelector(	( state: RootState ) => state.aiSettings.platforms);
	const displayMode = useSelector(( state: RootState ) => state.displaySettings.mode.displayMode);
	const buttonOrder = useSelector(( state: RootState ) => state.socialSharing.buttonOrder as ButtonOrder);

	const networkIconMap: Record< string, LucideIcon > = {
		twitter: Twitter,
		linkedin: Linkedin,
		facebook: Facebook,
		telegram: Send,
		whatsapp: Send,
		email: Mail,
		raindrop: Bookmark,
	};
	const enabledNetworks = networks.filter( ( network ) => network.enabled );
	const enabledAiPlatforms = aiPlatforms.filter( ( platform ) => platform.enabled );

	const aiModelColorMap: Record< string, string > = {
		chatgpt: 'bg-emerald-500',
		gemini: 'bg-blue-500',
		claude: 'bg-violet-500',
		perplexity: 'bg-amber-500',
		grok: 'bg-zinc-800',
		'google-ai': 'bg-cyan-600',
	};

	const renderAiModelButtons = ( items: AiPlatform[] ): ReactNode[] =>
		items.map( ( platform ) => {
			const Icon = AI_ICON_MAP[ platform.logoKey ];

			return (
				<div
					key={ platform.id }
					className={ `flex items-center gap-2 px-3 py-2 ${
						aiModelColorMap[ platform.id ] ?? 'bg-indigo-500'
					} text-white rounded-lg text-sm` }
				>
					{ Icon && <Icon className="w-4 h-4" /> }
					{ platform.name }
				</div>
			);
		} );

	const askAiButton = (
		<button
			type="button"
			onClick={ () => setIsAiExpanded( ( prev ) => ! prev ) }
			className="flex items-center gap-2 px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm cursor-pointer"
		>
			<Sparkles className="w-4 h-4" />
			{ __( 'Ask AI', 'pointwise-summary' ) }
		</button>
	);

	const renderNetworkButtons = ( items: SocialNetworkState[] ): ReactNode[] =>
		items.map( ( network ) => {
			const Icon = networkIconMap[ network.iconKey ] || Sparkles;
			return (
				<ButtonChip
					key={ network.id }
					icon={ Icon }
					label={ network.name }
					className={ `flex items-center gap-2 px-3 py-2 ${ network.color } text-white rounded-lg text-sm` }
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
				...( isAiExpanded ? renderAiModelButtons( enabledAiPlatforms ) : [] ),
			]
			: [];

	const interleaveButtons = (
		socialItems: ReactNode[],
		aiItems: ReactNode[]
	): ReactNode[] => {
		const mixedItems: ReactNode[] = [];
		const maxLength = Math.max( socialItems.length, aiItems.length );

		for ( let index = 0; index < maxLength; index += 1 ) {
			if ( socialItems[ index ] ) {
				mixedItems.push( socialItems[ index ] );
			}
			if ( aiItems[ index ] ) {
				mixedItems.push( aiItems[ index ] );
			}
		}

		return mixedItems;
	};

	let previewContent: ReactNode[] = [];
	const socialButtons = renderNetworkButtons( enabledNetworks );

	if ( aiElements.length === 0 ) {
		previewContent = [ ...socialButtons ];
	} else if ( buttonOrder === 'social-first' ) {
		previewContent = [
			...socialButtons,
			...aiElements,
		];
	} else if ( buttonOrder === 'ai-first' ) {
		previewContent = [
			...aiElements,
			...socialButtons,
		];
	} else {
		previewContent = interleaveButtons( socialButtons, aiElements );
	}

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<h3 className="text-gray-900 mb-4">{ __( 'Button Preview', 'pointwise-summary' ) }</h3>

			<div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
				<div className="flex flex-wrap gap-2">{ previewContent }</div>
			</div>
		</div>
	);
};
