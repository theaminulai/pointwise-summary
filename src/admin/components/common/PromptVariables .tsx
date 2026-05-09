/**
 * Prompt variable buttons component.
 *
 * @since 1.0.0
 */

const PROMPT_VARIABLES = [ '{title}', '{url}', '{site_name}', '{content}' ];
interface PromptVariablesProps {
	onInsert: ( variable: string ) => void;
}
/**
 * Render prompt variable buttons.
 *
 * @param {Object}   props
 * @param {Function} props.onInsert Variable insert callback.
 *
 */
const PromptVariables = ( { onInsert }: PromptVariablesProps ) => {
	return (
		<div className="flex flex-wrap gap-2">
			{ PROMPT_VARIABLES.map( ( variable ) => (
				<button
					key={ variable }
					type="button"
					onClick={ () => onInsert( variable ) }
					className="inline-flex cursor-pointer items-center rounded border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-xs font-mono text-blue-600 transition-colors hover:bg-blue-500/20"
				>
					{ variable }
				</button>
			) ) }
		</div>
	);
};

export default PromptVariables;
