const normalizeLocale = ( locale?: string ) =>
	( locale ?? '' ).trim().replace( '-', '_' ).toLowerCase();

const getLocalizedAskAiText = (
	translations: Array< { locale: string; buttonText: string } >,
	fallback: string
) => {
	if ( ! Array.isArray( translations ) || translations.length === 0 ) {
		return fallback;
	}

	const htmlLang =
		typeof document !== 'undefined' && document.documentElement?.lang
			? document.documentElement.lang
			: '';
	const currentLocale = normalizeLocale( htmlLang || 'en_US' );
	const currentLanguage = currentLocale.split( '_' )[ 0 ] ?? '';

	const exact = translations.find(
		( item ) =>
			normalizeLocale( item?.locale ) === currentLocale &&
			item?.buttonText
	);
	if ( exact?.buttonText ) {
		return exact.buttonText;
	}

	const languageMatch = translations.find( ( item ) => {
		const locale = normalizeLocale( item?.locale );
		return (
			locale &&
			locale.split( '_' )[ 0 ] === currentLanguage &&
			item?.buttonText
		);
	} );

	return languageMatch?.buttonText || fallback;
};
export default getLocalizedAskAiText;
