import { __ } from '@wordpress/i18n';
import { NotepadText, Menu } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleMobileMenu } from '../../store/ui.actions';

/**
 * Renders the mobile header for the admin interface.
 *
 * @returns Header section with menu trigger and plugin status.
 */
const Header: React.FC = () => {
	const dispatch = useDispatch();
	return (
		<header
			className="
			bg-white border-b border-gray-200 px-6 py-3 z-50 relative
			min-[600px]:sticky min-[600px]:top-[46px]
			md:top-8 block md:hidden
			"
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<button
						onClick={ () => dispatch( toggleMobileMenu() ) }
						className="cursor-pointer md:hidden p-2 ml-[-2] hover:bg-gray-100 rounded transition-colors"
					>
						<Menu className="w-6 h-6 text-gray-800" />
					</button>
					{/* <NotepadText className="w-10 h-10 text-indigo-500" /> */}
					<div className="ml-0">
						<h1 className="text-xl! font-medium! text-gray-900 hidden sm:block! p-0!">
							{ __( 'Pointwise Summary', 'pointwise-summary' ) }
						</h1>
					</div>
				</div>
				<div className="flex gap-2">
					<span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
						{ __( 'Active', 'pointwise-summary' ) }
					</span>
					<span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
						v1.0.0
					</span>
				</div>
			</div>
		</header>
	);
};
export default Header;
