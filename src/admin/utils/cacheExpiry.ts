export const MIN_CACHE_EXPIRY_HOURS = 0;
export const MAX_CACHE_EXPIRY_HOURS = 168;

export function parseAndClamp( raw: string ): number | null {
	if ( raw === '' ) {
		return null;
	}

	const parsed = Number( raw );
	if ( Number.isNaN( parsed ) ) {
		return null;
	}

	return Math.min(
		MAX_CACHE_EXPIRY_HOURS,
		Math.max( MIN_CACHE_EXPIRY_HOURS, parsed )
	);
}