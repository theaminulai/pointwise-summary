import { RecentActivity } from '../../types';
import React from 'react';

type RecentActivityItemProps = {
	activity: RecentActivity;
};

const RecentActivityItem: React.FC< RecentActivityItemProps > = ( {
	activity,
} ): JSX.Element => {
	return (
		<div className="flex items-start gap-3 sm:gap-4">
			<div
				className={ `w-2 h-2 rounded-full mt-2 shrink-0 ${
					activity.status === 'success'
						? 'bg-green-500'
						: 'bg-red-500'
				}` }
			/>

			<div className="flex-1 min-w-0">
				<p className="text-sm! font-medium! text-gray-900 truncate m-0!">
					{ activity.post }
				</p>
				<p className="text-xs! sm:text-sm! text-gray-600 m-0!">
					{ activity.action }
				</p>
				<div className="flex items-center gap-1 mt-1">
					<p className="text-xs! text-gray-500 m-0!">
						{ activity.time }
					</p>
				</div>
			</div>
		</div>
	);
};

export default RecentActivityItem;
