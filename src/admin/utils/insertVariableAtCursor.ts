type InsertVariableOptions = {
	textarea: HTMLTextAreaElement | null;
	value: string;
	variable: string;
	onChange: ( nextValue: string ) => void;
};

export const insertVariableAtCursor = ( {
	textarea,
	value,
	variable,
	onChange,
}: InsertVariableOptions ) => {
	if ( ! textarea ) {
		return;
	}

	const start = textarea.selectionStart ?? value.length;
	const end = textarea.selectionEnd ?? value.length;
	const before = value.substring( 0, start );
	const after = value.substring( end, value.length );
	const nextValue = before + variable + after;

	onChange( nextValue );

	setTimeout( () => {
		if ( ! textarea.isConnected ) {
			return;
		}
		textarea.focus();
		const cursor = start + variable.length;
		textarea.setSelectionRange( cursor, cursor );
	}, 0 );
};
