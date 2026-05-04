/**
 * AppProvider.tsx
 *
 * Main application context provider that wraps the entire admin app.
 * Combines all providers (Redux store, theme, etc.) in one place.
 */

import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
import store from '../store';

interface AppProviderProps {
	children: ReactNode;
}

const AppProvider = ( { children }: AppProviderProps ) => {
	return <Provider store={ store }>{ children }</Provider>;
};

export default AppProvider;
