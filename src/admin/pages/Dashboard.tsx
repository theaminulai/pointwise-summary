/**
 * Dashboard.tsx
 *
 * Main dashboard layout component.
 * Provides the layout structure with header, sidebar, and main content area.
 */
import { Outlet } from 'react-router-dom';
import { Header, Sidebar } from '../components/common';
import React from 'react';

const Dashboard: React.FC = (): JSX.Element => {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-full mx-auto">
				<Header />
				<div className="flex relative">
					<Sidebar />
					<main className="flex-1 p-6 md:p-8 bg-gray-50 min-w-0">
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
