const toggleFab = ( wrapper ) => {
	const button = wrapper.querySelector( '.pointwise-summary-fab-button' );
	const panel = wrapper.querySelector( '.pointwise-summary-fab-panel' );

	if ( ! button || ! panel ) {
		return;
	}

	const isOpen = button.getAttribute( 'aria-expanded' ) === 'true';
	const willOpen = ! isOpen;

	button.setAttribute( 'aria-expanded', willOpen ? 'true' : 'false' );

	// Add animation class when opening, remove when closing
	if ( willOpen ) {
		wrapper.classList.add( 'is-opening' );
		panel.hidden = false;

		// Trigger animation by adding opened class after hidden is removed
		window.requestAnimationFrame( () => {
			wrapper.classList.add( 'is-open' );
		} );
	} else {
		wrapper.classList.remove( 'is-open' );

		// Wait for animation to complete before hiding
		const transitionEnd = () => {
			panel.hidden = true;
			wrapper.classList.remove( 'is-opening' );
			wrapper.removeEventListener( 'transitionend', transitionEnd );
		};

		wrapper.addEventListener( 'transitionend', transitionEnd );
	}
};

/**
 * Close the FAB panel by removing open class and resetting state.
 * @param {HTMLElement} wrapper The FAB wrapper element.
 */
const closeFabPanel = ( wrapper ) => {
	const button = wrapper.querySelector( '.pointwise-summary-fab-button' );
	if ( button && button.getAttribute( 'aria-expanded' ) === 'true' ) {
		toggleFab( wrapper );
	}
};

const handleScroll = ( wrapper ) => {
	const enabled = wrapper.getAttribute( 'data-scroll-trigger' ) === '1';
	if ( ! enabled ) {
		wrapper.classList.add( 'is-visible' );
		return;
	}

	const threshold = Number(
		wrapper.getAttribute( 'data-scroll-threshold' ) || 10
	);
	const total = document.documentElement.scrollHeight - window.innerHeight;
	const progress = total > 0 ? ( window.scrollY / total ) * 100 : 0;

	if ( progress >= threshold ) {
		wrapper.classList.add( 'is-visible' );
	} else {
		wrapper.classList.remove( 'is-visible' );
		// Close panel when scrolled past threshold
		closeFabPanel( wrapper );
	}
};

export const initFab = () => {
	const wrappers = document.querySelectorAll(
		'.pointwise-summary-fab-wrapper'
	);
	if ( ! wrappers.length ) {
		return;
	}

	wrappers.forEach( ( wrapper ) => {
		// Only collapsed style has a toggle button; flat style shows all buttons directly
		const button = wrapper.querySelector( '.pointwise-summary-fab-button' );
		if ( button ) {
			button.addEventListener( 'click', ( e ) => {
				e.stopPropagation();
				toggleFab( wrapper );
			} );
		}

		// Close panel when clicking outside
		document.addEventListener( 'click', ( e ) => {
			const isClickInside = wrapper.contains( e.target );
			if ( ! isClickInside ) {
				closeFabPanel( wrapper );
			}
		} );

		// Scroll trigger visibility works for both collapsed and flat styles
		handleScroll( wrapper );
	} );

	window.addEventListener( 'scroll', () => {
		wrappers.forEach( ( wrapper ) => handleScroll( wrapper ) );
	} );
};
