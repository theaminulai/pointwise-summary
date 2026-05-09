/**
 * socialSharing.actions.js
 *
 * Redux action creators for social sharing settings.
 */

export const SET_ENABLE_SOCIAL_SHARING = 'SET_ENABLE_SOCIAL_SHARING';
export const SET_BUTTON_ORDER = 'SET_BUTTON_ORDER';
export const TOGGLE_NETWORK = 'TOGGLE_NETWORK';
export const UPDATE_NETWORK_MENTION = 'UPDATE_NETWORK_MENTION';
export const SET_SOCIAL_SHARING = 'SET_SOCIAL_SHARING';

export const setSocialSharing = ( settings ) => ( {
	type: SET_SOCIAL_SHARING,
	payload: settings,
} );

export const setEnableSocialSharing = ( value ) => ( {
	type: SET_ENABLE_SOCIAL_SHARING,
	payload: value,
} );

export const setButtonOrder = ( value ) => ( {
	type: SET_BUTTON_ORDER,
	payload: value,
} );

export const toggleNetwork = ( id ) => ( {
	type: TOGGLE_NETWORK,
	payload: id,
} );

export const updateNetworkMention = ( id, mention ) => ( {
	type: UPDATE_NETWORK_MENTION,
	payload: { id, mention },
} );
