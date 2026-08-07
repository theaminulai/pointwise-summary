import { __ } from '@wordpress/i18n';
import React from 'react';

/**
 * Properties for the AppStateWrapper component.
 */
interface AppStateWrapperProps {
	isLoading: boolean;
	error: Error | null;
	children: React.ReactNode;
	onRetry?: () => void;
}

/**
 * AppStateWrapper Component.
 *
 * A top-level container that manages the global loading and error states
 * of the application. It ensures that the main UI is only rendered once
 * all critical data has been successfully fetched.
 * @param root0
 * @param root0.isLoading
 * @param root0.error
 * @param root0.children
 * @param root0.onRetry
 */
export const AppStateWrapper: React.FC< AppStateWrapperProps > = ( {
	isLoading,
	error,
	children,
	onRetry,
} ) => {
	// 1. Handle Loading State
	if ( isLoading ) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-white rounded-lg">
				<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
				<span className="ml-3 mt-4 text-sm font-medium text-gray-600">
					{ __( 'Initializing Application…', 'pointwise-summary' ) }
				</span>
			</div>
		);
	}

	// 2. Handle Error State
	if ( error ) {
		return (
			<div className="p-8 text-center bg-red-50 border border-red-200 rounded-lg w-full">
				<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
					<svg
						className="w-6 h-6 text-red-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={ 2 }
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
				</div>
				<h3 className="text-red-800 font-semibold text-lg">
					{ __( 'Initialization Failed', 'pointwise-summary' ) }
				</h3>
				<p className="text-red-600 text-sm mt-2 mb-6">
					{ error.message ||
						__(
							'An unexpected error occurred while loading settings.',
							'pointwise-summary'
						) }
				</p>
				{ onRetry && (
					<button
						onClick={ onRetry }
						className="cursor-pointer px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-all shadow-sm"
					>
						{ __( 'Retry Connection', 'pointwise-summary' ) }
					</button>
				) }
			</div>
		);
	}

	// 3. Render Content
	return <>{ children }</>;
};
