import { __ } from '@wordpress/i18n';
import {
	BarChart3,
	ChevronRight,
	Eye,
	FileEdit,
	HelpCircle,
	LayoutDashboard,
	NotepadText,
	Settings,
	Share2,
	Sparkles,
} from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import type { RootState } from '../../store/types';
import { setMobileMenu } from '../../store/ui.actions';
import { Logo } from '../icons';

/**
 * Renders the main admin navigation sidebar.
 *
 * @returns Sidebar with menu links and mobile overlay behavior.
 */
const Sidebar: React.FC = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const mobileMenuOpen = useSelector(
		( state: RootState ) => state.ui.mobileMenuOpen
	);

	const menuItems = [
		// { path: '/overview', label: __( 'Overview', 'pointwise-summary' ), icon: LayoutDashboard },
		{
			path: '/ai-settings',
			label: __( 'AI Settings', 'pointwise-summary' ),
			icon: Sparkles,
		},
		{
			path: '/display',
			label: __( 'Display Settings', 'pointwise-summary' ),
			icon: Eye,
		},
		{
			path: '/social',
			label: __( 'Social Sharing', 'pointwise-summary' ),
			icon: Share2,
		},
		{
			path: '/advanced',
			label: __( 'Advanced', 'pointwise-summary' ),
			icon: Settings,
		},
		// { path: '/analytics', label: __( 'Analytics', 'pointwise-summary' ), icon: BarChart3 },
		// { path: '/per-post', label: __( 'Per-Post Settings', 'pointwise-summary' ), icon: FileEdit },
		{
			path: '/help',
			label: __( 'Help & Support', 'pointwise-summary' ),
			icon: HelpCircle,
		},
	];

	return (
		<>
			{ /* Mobile Overlay */ }
			{ mobileMenuOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-50 md:hidden"
					onClick={ () => dispatch( setMobileMenu( false ) ) }
				/>
			) }

			{ /* Sidebar */ }
			<aside
				className={ `
					w-78 bg-white border-r border-gray-200 
					fixed md:sticky top-[46px] left-0 h-screen md:h-[calc(100vh-40px)] md:top-10
					z-50 md:z-0
					transition-transform duration-300 ease-in-out
					${ mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0' }
				` }
			>
				{ /* Logo/Header */ }
				<div className="p-4 border-b border-gray-200 hidden md:block!">
					<div className="flex items-center gap-3">
						{ /* <Sparkles className="w-8 h-8 text-indigo-500" /> */ }
						{/* <Logo className="w-10 h-10 text-indigo-500" /> */}
						<div>
							<h1 className="text-xl font-bold! text-gray-900">
								{ __(
									'AI Summary (TL;DR)',
									'pointwise-summary'
								) }
							</h1>
							<p className="text-xs text-gray-500 m-0!">v1.0.0</p>
						</div>
					</div>
				</div>

				{ /* Navigation */ }
				<nav className="flex-1 p-4 overflow-y-auto">
					<ul className="space-y-1">
						{ menuItems.map( ( item ) => {
							const Icon = item.icon;
							const isActive = location.pathname === item.path;

							return (
								<li key={ item.path }>
									<Link
										to={ item.path }
										onClick={ () =>
											dispatch( setMobileMenu( false ) )
										}
										className={ `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
											focus:outline-none!
											focus:ring-0!
											focus-visible:outline-none!
											focus-visible:ring-0!
											${
												isActive
													? 'bg-indigo-50! text-indigo-600!'
													: 'text-gray-700! hover:bg-gray-50!'
											}` }
									>
										<Icon className="w-5 h-5" />
										<span className="flex-1 text-left">
											{ item.label }
										</span>
										{ isActive && (
											<ChevronRight className="w-4 h-4" />
										) }
									</Link>
								</li>
							);
						} ) }
					</ul>
				</nav>
			</aside>
		</>
	);
};

export default Sidebar;
