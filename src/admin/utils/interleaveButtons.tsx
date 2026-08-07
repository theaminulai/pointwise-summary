import type { ReactNode } from 'react';

/**
 * Interleave two arrays of React nodes by alternating elements from each.
 *
 * Example: given socialItems = [S1, S2] and aiItems = [A1, A2, A3]
 * the result will be [S1, A1, S2, A2, A3].
 *
 * @param {ReactNode[]} socialItems - Array of social button nodes.
 * @param {ReactNode[]} aiItems     - Array of AI button nodes.
 * @return {ReactNode[]} Mixed array with elements from `socialItems` and `aiItems` interleaved.
 */
const interleaveButtons = (
	socialItems: ReactNode[],
	aiItems: ReactNode[]
): ReactNode[] => {
	const mixedItems: ReactNode[] = [];
	const maxLength = Math.max( socialItems.length, aiItems.length );

	for ( let index = 0; index < maxLength; index += 1 ) {
		if ( socialItems[ index ] ) {
			mixedItems.push( socialItems[ index ] );
		}
		if ( aiItems[ index ] ) {
			mixedItems.push( aiItems[ index ] );
		}
	}

	return mixedItems;
};

export default interleaveButtons;
