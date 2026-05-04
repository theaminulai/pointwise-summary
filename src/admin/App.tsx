import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AdvancedSettings } from './components/advanced-settings';
import { AISettings } from './components/ai-settings';
import { Analytics } from './components/analytics/Analytics';
import { AppStateWrapper } from './components/common';
import { DisplaySettings } from './components/display-settings';
import { Help } from './components/help/Help';
import { Overview } from './components/overview';
import { SocialSharing } from './components/social-sharing';
import { useGetQuery } from './hooks/useGetQuery';
import DashboardLayout from './pages/Dashboard';
import { Toaster } from 'sonner';

/**
 * Main Application Component.
 * 
 * Manages the routing of the admin dashboard and queries global
 * application settings via useGetQuery.
 *
 * @returns The rendered application component.
 */
const App: React.FC = (): JSX.Element => {
	const { isLoading, error, refetch } = useGetQuery();

	return (
		<AppStateWrapper
			isLoading={ isLoading }
			error={ error }
			onRetry={ () => void refetch() }
		>
			<Toaster position="bottom-right" />
			<HashRouter>
				<Routes>
					<Route path="/" element={ <DashboardLayout /> }>
						<Route
							index
							element={ <Navigate to="/overview" replace /> }
						/>
						<Route path="overview" element={ <Overview /> } />
						<Route path="ai-settings" element={ <AISettings /> } />
						<Route path="display" element={ <DisplaySettings /> }/>
						<Route path="social" element={ <SocialSharing /> } />
						<Route path="advanced" element={ <AdvancedSettings /> }/>
						<Route path="analytics" element={ <Analytics /> } />

						{ /*<Route path="per-post" element={ <PerPostSettings /> } /> */ }
						<Route path="help" element={ <Help /> } />
					</Route>
				</Routes>
			</HashRouter>
		</AppStateWrapper>
	);
};

export default App;
