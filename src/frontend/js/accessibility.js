const DEFAULT_SHORTCUT = 'Alt+S';

const isEditableTarget = ( target ) => {
	if ( ! target ) {
		return false;
	}

	const tag = target.tagName ? target.tagName.toLowerCase() : '';
	if ( tag === 'input' || tag === 'textarea' || tag === 'select' ) {
		return true;
	}

	return Boolean( target.isContentEditable );
};

const normalizeShortcut = ( shortcut ) => {
	const raw =
		typeof shortcut === 'string' && shortcut.trim()
			? shortcut.trim()
			: DEFAULT_SHORTCUT;
	const parts = raw
		.toLowerCase()
		.split( '+' )
		.map( ( part ) => part.trim() )
		.filter( Boolean );

	const modifiers = {
		alt: parts.includes( 'alt' ),
		ctrl: parts.includes( 'ctrl' ) || parts.includes( 'control' ),
		shift: parts.includes( 'shift' ),
		meta:
			parts.includes( 'meta' ) ||
			parts.includes( 'cmd' ) ||
			parts.includes( 'command' ) ||
			parts.includes( 'win' ),
	};

	const keys = parts.filter(
		( part ) =>
			! [
				'alt',
				'ctrl',
				'control',
				'shift',
				'meta',
				'cmd',
				'command',
				'win',
			].includes( part )
	);

	return {
		...modifiers,
		key: keys[ 0 ] || 's',
	};
};

const isVisibleElement = ( element ) => {
	if ( ! ( element instanceof HTMLElement ) ) {
		return false;
	}

	if ( element.hidden || element.getAttribute( 'aria-hidden' ) === 'true' ) {
		return false;
	}

	const style = window.getComputedStyle( element );
	if ( style.display === 'none' || style.visibility === 'hidden' ) {
		return false;
	}

	return true;
};

const focusPrimarySummaryAction = () => {
	const selectors = [
		'.pointwise-summary-fab-wrapper.is-visible .pointwise-summary-fab-button',
		'.pointwise-summary-ai-collapse-toggle',
		'.pointwise-summary-button',
	].join( ', ' );

	const candidates = Array.from(
		document.querySelectorAll( selectors )
	).filter( isVisibleElement );
	if ( ! candidates.length ) {
		return;
	}

	const target = candidates[ 0 ];
	if ( target instanceof HTMLElement ) {
		target.focus( { preventScroll: false } );
	}
};

export const initAccessibility = () => {
	const config = window.pointwiseSummaryFrontend?.accessibility || {};
	if ( config.enableRTL ) {
		document.documentElement.classList.add(
			'pointwise-summary-rtl-enabled'
		);
	}

	if ( ! config.enableKeyboard ) {
		return;
	}

	const shortcut = normalizeShortcut( config.keyboardShortcut );

	document.addEventListener( 'keydown', ( event ) => {
		if ( isEditableTarget( event.target ) ) {
			return;
		}

		if (
			event.altKey !== shortcut.alt ||
			event.ctrlKey !== shortcut.ctrl ||
			event.shiftKey !== shortcut.shift ||
			event.metaKey !== shortcut.meta
		) {
			return;
		}

		if ( event.key.toLowerCase() !== shortcut.key ) {
			return;
		}

		event.preventDefault();
		focusPrimarySummaryAction();
	} );
};
