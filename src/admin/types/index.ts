export type ActivityStatus = 'success' | 'error';
export interface RecentActivity {
	post: string;
	action: string;
	time: string;
	status: ActivityStatus;
}

export interface TopPost {
	title: string;
	summaries: number;
	shares: number;
}
export interface StatsProps {
	label: string;
	value: string;
	icon: React.ComponentType< React.SVGProps< SVGSVGElement > >;
	color: string;
}
