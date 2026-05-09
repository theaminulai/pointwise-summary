import { Calendar, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateRangePicker } from 'rsuite';
import {
	setAnalyticsCustomRange,
	setAnalyticsRange,
} from '../../store/analytics.actions';
import type { AnalyticsRange, RootState } from '../../store/types';
import { Title } from '../common';

export const Header: React.FC = () => {
	const CalendarIcon = ( props: React.SVGProps< SVGSVGElement > ) => (
		<Calendar { ...props } className="w-4 h-4" fill="white" />
	);
	const dispatch = useDispatch();
	const range = useSelector( ( state: RootState ) => state.analytics.range );
	const customRange = useSelector(
		( state: RootState ) => state.analytics.customRange
	);
	const [ pickerValue, setPickerValue ] = useState< [ Date, Date ] | null >(
		null
	);

	useEffect( () => {
		if ( customRange.startDate && customRange.endDate ) {
			setPickerValue( [
				new Date( `${ customRange.startDate }T00:00:00Z` ),
				new Date( `${ customRange.endDate }T00:00:00Z` ),
			] );
		} else {
			setPickerValue( null );
		}
	}, [ customRange.endDate, customRange.startDate ] );

	const rangeOptions: Array< { value: AnalyticsRange; label: string } > = [
		{ value: 'weekly', label: 'Last 7 Days' },
		{ value: 'monthly', label: 'Last 30 Days' },
		{ value: 'yearly', label: 'Last 12 Months' },
	];

	return (
		<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
			<Title
				title="Overview"
				description="Overview of your AI summary and social sharing performance"
			/>
			<div className="flex flex-wrap gap-2 sm:gap-3">
				{ /* range selector */ }
				<div className="flex items-center gap-2">
					<span className="text-xs sm:text-sm text-gray-500">
						Date Range:
					</span>
					<div className="flex rounded-lg border border-gray-300 overflow-hidden">
						{ rangeOptions.map( ( option ) => (
							<button
								key={ option.value }
								onClick={ () =>
									dispatch(
										setAnalyticsRange( option.value )
									)
								}
								className={
									'cursor-pointer px-3 py-2 text-xs sm:text-sm transition-colors ' +
									( option.value === range
										? 'bg-indigo-600 text-white'
										: 'bg-white text-gray-700 hover:bg-gray-50' )
								}
								aria-pressed={ option.value === range }
							>
								{ option.label }
							</button>
						) ) }
					</div>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-xs sm:text-sm text-gray-500">
						Custom Range:
					</span>
					<DateRangePicker
						appearance="default"
						placement="bottomEnd"
						placeholder="Select range"
						format="yyyy-MM-dd"
						caretAs={ CalendarIcon }
						value={ pickerValue }
						onChange={ ( nextValue ) => {
							if (
								nextValue &&
								nextValue[ 0 ] &&
								nextValue[ 1 ]
							) {
								dispatch(
									setAnalyticsCustomRange( {
										startDate: nextValue[ 0 ]
											.toISOString()
											.slice( 0, 10 ),
										endDate: nextValue[ 1 ]
											.toISOString()
											.slice( 0, 10 ),
									} )
								);
							} else if ( ! nextValue ) {
								dispatch( setAnalyticsRange( 'weekly' ) );
							}
							setPickerValue(
								nextValue as [ Date, Date ] | null
							);
						} }
						style={ { width: 230 } }
					/>
				</div>
			</div>
		</div>
	);
};
