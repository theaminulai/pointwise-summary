import { initAccessibility } from './js/accessibility';
import { initAiModelButtons } from './js/ai-model';
import { initFab } from './js/fab';
import { initSocialButtons } from './js/social';
import './scss/frontend.scss';

const initPointwiseSummary = () => {
	initAccessibility();
	initAiModelButtons();
	initSocialButtons();
	initFab();
};

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', initPointwiseSummary );
} else {
	initPointwiseSummary();
}
