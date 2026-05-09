/**
 * socialSharing.reducer.js
 *
 * Redux reducer for social sharing settings.
 */

import {
	SET_BUTTON_ORDER,
	SET_ENABLE_SOCIAL_SHARING,
	SET_SOCIAL_SHARING,
	TOGGLE_NETWORK,
	UPDATE_NETWORK_MENTION,
} from './socialSharing.actions';

const initialState = {
	enableSocialSharing: false,
	buttonOrder: 'social-first',
	networks: [],
};

const socialSharingReducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case SET_ENABLE_SOCIAL_SHARING:
			return { ...state, enableSocialSharing: action.payload };
		case SET_BUTTON_ORDER:
			return { ...state, buttonOrder: action.payload };
		case TOGGLE_NETWORK:
			return {
				...state,
				networks: state.networks.map( ( network ) =>
					network.id === action.payload
						? { ...network, enabled: ! network.enabled }
						: network
				),
			};
		case UPDATE_NETWORK_MENTION:
			return {
				...state,
				networks: state.networks.map( ( network ) =>
					network.id === action.payload.id
						? { ...network, mention: action.payload.mention }
						: network
				),
			};
		case SET_SOCIAL_SHARING:
			return {
				...state,
				...action.payload,
				networks: Array.isArray( action.payload?.networks )
					? action.payload.networks
					: state.networks,
			};
		default:
			return state;
	}
};

export default socialSharingReducer;
