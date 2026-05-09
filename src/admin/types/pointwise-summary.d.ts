export {};
declare module '*.scss';
declare global {
	interface Window {
		pointwiseSummary: {
			apiUrl: string;
			nonce: string;
			pluginUrl: string;
			version: string;
			isDevelopment: boolean;
			currentPage: string;
		};
	}
}
