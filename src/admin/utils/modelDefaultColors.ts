export const MODEL_DEFAULT_COLORS: Record< string, string > = {
	chatgpt: '#11A27F',
	gemini: '#8AB5FF',
	claude: '#D97757',
	perplexity: '#23B8CD',
	grok: '#000000',
	'google-ai': '#FBBC03',
};

export function getDefaultModelColor( modelId: string ): string {
	return MODEL_DEFAULT_COLORS[ modelId ] ?? '#11A27F';
}
