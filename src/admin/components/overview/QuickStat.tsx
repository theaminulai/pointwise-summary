import React from 'react';

type QuickStatProps = {
	title: string;
	value: string | number;
	description: string;
	className?: string;
};

const QuickStat: React.FC< QuickStatProps > = ( {
	title,
	value,
	description,
	className,
} ): JSX.Element => {
	return (
		<div className={ className }>
			<p className="text-base! font-medium! text-gray-900 m-0! mb-2!">
				{ title }
			</p>

			<p className="text-xl! font-bold! text-indigo-600 m-0!">
				{ value }
			</p>

			<p className="text-xs! text-gray-500 m-0! mt-1!">{ description }</p>
		</div>
	);
};

export default QuickStat;
