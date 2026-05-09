const openUrl = ( url ) => {
	if ( ! url ) {
		return;
	}
	window.open( url, '_blank', 'noopener' );
};

export const initSocialButtons = () => {
	const buttons = document.querySelectorAll(
		'.pointwise-summary-social-button[data-url]'
	);

	buttons.forEach( ( button ) => {
		if ( button.tagName.toLowerCase() !== 'button' ) {
			return;
		}
		button.addEventListener( 'click', () => openUrl( button.dataset.url ) );
	} );
};
