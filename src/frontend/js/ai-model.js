const openUrl = ( url ) => {
	if ( ! url ) {
		return;
	}
	window.open( url, '_blank', 'noopener' );
};

export const initAiModelButtons = () => {
	const buttons = document.querySelectorAll(
		'.pointwise-summary-ai-button[data-url]'
	);

	buttons.forEach( ( button ) => {
		if ( button.tagName.toLowerCase() !== 'button' ) {
			return;
		}
		button.addEventListener( 'click', () => openUrl( button.dataset.url ) );
	} );

	const collapseToggles = document.querySelectorAll(
		'.pointwise-summary-ai-collapse-toggle'
	);

	const closeCollapsePanel = ( toggle ) => {
		const wrapper = toggle.closest( '.pointwise-summary-collapse' );
		if ( ! wrapper ) {
			return;
		}

		const panel = wrapper.querySelector(
			'.pointwise-summary-collapse-panel'
		);
		if ( ! panel ) {
			return;
		}

		const isExpanded = toggle.getAttribute( 'aria-expanded' ) === 'true';
		if ( ! isExpanded ) {
			return;
		}

		toggle.setAttribute( 'aria-expanded', 'false' );
		wrapper.classList.remove( 'is-open' );
		wrapper.classList.remove( 'is-opening' );
		panel.hidden = true;
	};

	const collapseWrappers = new Set();

	collapseToggles.forEach( ( toggle ) => {
		if ( toggle.tagName.toLowerCase() !== 'button' ) {
			return;
		}

		const wrapper = toggle.closest( '.pointwise-summary-collapse' );
		if ( wrapper ) {
			collapseWrappers.add( wrapper );
		}

		toggle.addEventListener( 'click', ( e ) => {
			// Prevent the document click handler from immediately closing the panel
			e.stopPropagation();

			if ( ! wrapper ) {
				return;
			}

			const panel = wrapper.querySelector(
				'.pointwise-summary-collapse-panel'
			);
			if ( ! panel ) {
				return;
			}

			const isExpanded =
				toggle.getAttribute( 'aria-expanded' ) === 'true';
			if ( isExpanded ) {
				closeCollapsePanel( toggle );
				return;
			}

			toggle.setAttribute( 'aria-expanded', 'true' );
			wrapper.classList.add( 'is-opening' );
			panel.hidden = false;

			window.requestAnimationFrame( () => {
				wrapper.classList.add( 'is-open' );
			} );
		} );
	} );

	document.addEventListener( 'click', ( event ) => {
		collapseToggles.forEach( ( toggle ) => {
			const wrapper = toggle.closest( '.pointwise-summary-collapse' );
			// Ignore if click is inside wrapper, or on an internal button/toggle to avoid immediate close
			if (
				! wrapper ||
				wrapper.contains( event.target ) ||
				event.target.closest(
					'.pointwise-summary-button, .pointwise-summary-ai-collapse-toggle'
				)
			) {
				return;
			}

			closeCollapsePanel( toggle );
		} );
	} );

	// Close collapse panels when their wrapper scrolls out of the viewport
	const isInViewport = ( el ) => {
		const rect = el.getBoundingClientRect();
		return rect.bottom >= 0 && rect.top <= window.innerHeight;
	};

	const handleCollapseScroll = () => {
		collapseWrappers.forEach( ( wrapper ) => {
			if ( ! isInViewport( wrapper ) ) {
				const toggle = wrapper.querySelector(
					'.pointwise-summary-ai-collapse-toggle'
				);
				if ( toggle ) {
					closeCollapsePanel( toggle );
				}
			}
		} );
	};

	window.addEventListener( 'scroll', handleCollapseScroll );
	window.addEventListener( 'resize', handleCollapseScroll );
};
