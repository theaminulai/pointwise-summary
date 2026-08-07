/**
 * index.js
 *
 * Entry point for the AI Summarizer admin dashboard application.
 * Initializes React app with providers and renders the main App component.
 */

import { Fragment, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import AppProvider from './providers/AppProvider';
import { getPointwiseConfig } from './utils/helpers';
import './assets/styles/global.scss';
// Initialize the admin dashboard application
const initAdminApp = () => {
	const rootElement = document.getElementById(
		'pointwise-summary-admin-root'
	);

	if ( ! rootElement ) {
		// eslint-disable-next-line no-console -- surfaced intentionally for debugging a missing mount point.
		console.error(
			'Root element not found. Make sure #pointwise-summary-admin-root exists in the DOM.'
		);
		return;
	}
	const config = getPointwiseConfig() as { isDevelopment?: boolean };
	const isDevelopment = config?.isDevelopment;
	const AppWrapper = isDevelopment ? StrictMode : Fragment;
	const root = createRoot( rootElement );

	root.render(
		<AppWrapper>
			<AppProvider>
				<App />
			</AppProvider>
		</AppWrapper>
	);
};

// Start the app when DOM is ready
if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', initAdminApp );
} else {
	initAdminApp();
}
