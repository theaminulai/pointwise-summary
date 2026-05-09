import type { RecentActivity, TopPost } from '../types';

export type AdvancedSettingsContentType = {
	id: string;
	label: string;
	enabled: boolean;
};

export type AdvancedSettingsTranslation = {
	locale: string;
	label: string;
	buttonText: string;
};

export type EditorSupport = {
	editor: string;
	label: string;
	description: string;
	supported: boolean;
};

export type SeoPlatformConfig = {
	name: string;
	file?: string;
	meta_key?: string;
	noindex?: string;
	is_array?: boolean;
	custom?: boolean;
};

export type AdvancedSettingsState = {
	postTypes: AdvancedSettingsContentType[];
	exclusion: {
		excludedIds: string;
	};
	styling: {
		customCss: string;
		customCssClass: string;
	};
	performance: {
		enableCache: boolean;
		cacheExpiry: number;
		dataCleanup: boolean;
	};
	accessibility: {
		enableKeyboard: boolean;
		keyboardShortcut: string;
		enableRTL: boolean;
		enableAccessibility: boolean;
	};
	seo: {
		excludeNoindex: boolean;
		seoElement: string;
		noFollow: boolean;
		platform:
			| SeoPlatformConfig[]
			| Record< string, SeoPlatformConfig >
			| string[];
	};
	translations: AdvancedSettingsTranslation[];
	editorSupport: EditorSupport[];
};

export type UiState = {
	mobileMenuOpen: boolean;
};

export type AiPlatform = {
	id: string;
	name: string;
	description: string;
	logoKey: string;
	enabled: boolean;
	prompt: string;
	color: string;
};

export type AiSettingsState = {
	summaryLength: string;
	includeHeadings: boolean;
	includeMetadata: boolean;
	globalPrompt: string;
	useGlobalPrompt: boolean;
	enableAiSummary: boolean;
	expandedPlatform: string | null;
	platforms: AiPlatform[];
};

export type DisplayMode = 'floating' | 'inline' | 'collapse' | 'both';

export type InlinePosition =
	| 'before-title'
	| 'after-title'
	| 'before-content'
	| 'after-content'
	| 'disabled';

export type IconDisplay = 'icons-text' | 'icons-only' | 'text-only';

export type DisplaySettingsState = {
	activeTab: 'mode' | 'position' | 'style';
	mode: {
		displayMode: DisplayMode;
		enableScrollTrigger: boolean;
		scrollTrigger: number;
	};
	position: {
		floatingPosition:
			| 'bottom-right'
			| 'bottom-left'
			| 'top-right'
			| 'top-left';
		buttonAlignment: 'left' | 'center' | 'right';
		inlinePosition: InlinePosition;
	};
	style: {
		buttonStyle:
			| 'default'
			| 'brand'
			| 'minimal'
			| 'dark'
			| 'gradient'
			| 'outline';
		buttonShape: 'rounded' | 'circular' | 'square';
		iconDisplay: IconDisplay;
		enableAnimations: boolean;
		floatingStyle: 'collapsed' | 'flat';
	};
	preview: {
		title: string;
		body: string;
	};
};

export type DisplaySettingsGroups = {
	mode: DisplaySettingsState[ 'mode' ];
	position: DisplaySettingsState[ 'position' ];
	style: DisplaySettingsState[ 'style' ];
	preview: DisplaySettingsState[ 'preview' ];
};

export type SocialNetworkState = {
	id: string;
	name: string;
	iconKey: string;
	enabled: boolean;
	color: string;
	mentionOption: boolean;
	mention?: string;
};

export type SocialSharingState = {
	enableSocialSharing: boolean;
	buttonOrder: 'social-first' | 'ai-first' | 'mixed';
	networks: SocialNetworkState[];
};

export type OverviewStat = {
	label: string;
	value: string;
	iconKey: string;
	color: string;
};

export type OverviewQuickSetting = {
	title: string;
	value: string | number;
	description: string;
	className?: string;
};

export type OverviewState = {
	stats: OverviewStat[];
	recentActivity: RecentActivity[];
	topPosts: TopPost[];
	quickSettings: OverviewQuickSetting[];
};

export type AnalyticsSummaryDatum = {
	date: string;
	dateKey: string;
	summaries: number;
	views: number;
	shares: number;
};

export type AnalyticsPlatformDatum = {
	name: string;
	value: number;
	color: string;
	dateKey: string;
};

export type AnalyticsTopPost = {
	title: string;
	summaries: number;
	ctr: number;
	avgTime: string;
	dateKey: string;
};

export type AnalyticsInsight = {
	label: string;
	value: string;
	detail: string;
	accent: string;
	bgClass: string;
	borderClass: string;
	valueClass: string;
	className?: string;
	dateKey: string;
};

export type AnalyticsRange = 'weekly' | 'monthly' | 'yearly' | 'custom';

export type AnalyticsCustomRange = {
	startDate: string;
	endDate: string;
};

export type AnalyticsState = {
	summaryData: AnalyticsSummaryDatum[];
	aiPlatformData: AnalyticsPlatformDatum[];
	socialShareData: AnalyticsPlatformDatum[];
	topPosts: AnalyticsTopPost[];
	insights: AnalyticsInsight[];
	range: AnalyticsRange;
	customRange: AnalyticsCustomRange;
};

export type HelpFaq = {
	question: string;
	answer: string;
};

export type HelpShortcodeExample = {
	code: string;
	description: string;
};

export type HelpDocumentationLink = {
	title: string;
	description: string;
	cta: string;
	url: string;
	iconKey: string;
	bgClass: string;
	iconClass: string;
	cardClass: string;
};

export type HelpSystemInfoItem = {
	label: string;
	value: string;
	valueClass?: string;
};

export type HelpState = {
	faqs: HelpFaq[];
	quickStart: string[];
	shortcodeExamples: HelpShortcodeExample[];
	documentationLinks: HelpDocumentationLink[];
	systemInfo: {
		plugin: HelpSystemInfoItem[];
		environment: HelpSystemInfoItem[];
	};
	contactSupport: {
		title: string;
		body: string;
		links: { label: string; href: string; variant: string }[];
	};
};

export type RootState = {
	advancedSettings: AdvancedSettingsState;
	aiSettings: AiSettingsState;
	analytics: AnalyticsState;
	displaySettings: DisplaySettingsState;
	help: HelpState;
	overview: OverviewState;
	socialSharing: SocialSharingState;
	ui: UiState;
};
