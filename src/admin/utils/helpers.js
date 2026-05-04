/**
 * helpers.js
 *
 * Utility functions and helper methods used throughout the application.
 */

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = ( date ) => {
	const d = new Date( date );
	return d.toLocaleDateString( 'en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	} );
};

/**
 * Format time to relative string (e.g., "2 hours ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = ( date ) => {
	const now = new Date();
	const then = new Date( date );
	const seconds = Math.floor( ( now - then ) / 1000 );

	const intervals = {
		year: 31536000,
		month: 2592000,
		week: 604800,
		day: 86400,
		hour: 3600,
		minute: 60,
	};

	for ( const [ unit, secondsInUnit ] of Object.entries( intervals ) ) {
		const interval = Math.floor( seconds / secondsInUnit );
		if ( interval >= 1 ) {
			return `${ interval } ${ unit }${ interval > 1 ? 's' : '' } ago`;
		}
	}

	return 'Just now';
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = ( text, length = 100 ) => {
	if ( ! text || text.length <= length ) return text;
	return `${ text.substring( 0, length ) }...`;
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = ( email ) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test( email );
};

/**
 * Debounce function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = ( func, wait = 300 ) => {
	let timeout;
	return function executedFunction( ...args ) {
		const later = () => {
			clearTimeout( timeout );
			func( ...args );
		};
		clearTimeout( timeout );
		timeout = setTimeout( later, wait );
	};
};

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = ( obj ) => {
	return JSON.parse( JSON.stringify( obj ) );
};

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
	return `${ Date.now() }-${ Math.random().toString( 36 ).substr( 2, 9 ) }`;
};

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} True if empty
 */
export const isEmpty = ( obj ) => {
	return Object.keys( obj ).length === 0;
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = ( num ) => {
	return num.toString().replace( /\B(?=(\d{3})+(?!\d))/g, ',' );
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = ( str ) => {
	if ( ! str ) return '';
	return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
};

/**
 * Get value from nested object safely
 * @param {Object} obj - Object to get value from
 * @param {string} path - Path to value (e.g., 'user.profile.name')
 * @param {*} defaultValue - Default value if path not found
 * @returns {*} Value at path or default
 */
export const getNestedValue = ( obj, path, defaultValue = null ) => {
	const keys = path.split( '.' );
	let result = obj;

	for ( const key of keys ) {
		if ( result && typeof result === 'object' && key in result ) {
			result = result[ key ];
		} else {
			return defaultValue;
		}
	}

	return result;
};
/**
 * Get Pointwise Summary configuration from global window object
 * @returns {Object} Pointwise Summary configuration
 */

export const getPointwiseConfig = () => {
	if ( ! window.pointwiseSummary ) {
		throw new Error( 'pointwiseSummary is not defined' );
	}
	return window.pointwiseSummary;
};

/**
 * Local storage helpers with error handling
 */
export const storage = {
	get: ( key, defaultValue = null ) => {
		try {
			const item = localStorage.getItem( key );
			return item ? JSON.parse( item ) : defaultValue;
		} catch ( error ) {
			console.error( 'Error reading from localStorage:', error );
			return defaultValue;
		}
	},

	set: ( key, value ) => {
		try {
			localStorage.setItem( key, JSON.stringify( value ) );
			return true;
		} catch ( error ) {
			console.error( 'Error writing to localStorage:', error );
			return false;
		}
	},

	remove: ( key ) => {
		try {
			localStorage.removeItem( key );
			return true;
		} catch ( error ) {
			console.error( 'Error removing from localStorage:', error );
			return false;
		}
	},

	clear: () => {
		try {
			localStorage.clear();
			return true;
		} catch ( error ) {
			console.error( 'Error clearing localStorage:', error );
			return false;
		}
	},
};

export default {
	formatDate,
	formatRelativeTime,
	truncateText,
	isValidEmail,
	debounce,
	deepClone,
	generateId,
	isEmpty,
	formatNumber,
	capitalize,
	getNestedValue,
	storage,
};
