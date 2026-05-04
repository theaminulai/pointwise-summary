import React from 'react';

/**
 * Props for the Title component.
 */
type titleProps = {
	title: string;
	description?: string;
	className?: string;
};

/**
 * Renders a page title and optional description text.
 *
 * @param props Component props.
 * @returns Title block.
 */
const Title: React.FC< titleProps > = ( {
	title,
	description,
	className = '',
} ) => {
	return (
		<div className={ `${ className }` }>
			<h2 className="text-gray-900 m-0!">{ title }</h2>
			<p className="mt-2! text-gray-600 text-base! sm:text-base!">
				{ description }
			</p>
		</div>
	);
};

export default Title;
