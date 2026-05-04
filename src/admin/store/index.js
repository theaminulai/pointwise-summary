/**
 * store/index.js
 *
 * Redux store configuration for state management.
 * Exports the configured store instance.
 */

import { applyMiddleware, createStore } from 'redux';
import rootReducer from './rootReducer';

// Simple middleware for async actions (can be replaced with redux-thunk or redux-saga)
const asyncMiddleware = ( store ) => ( next ) => ( action ) => {
	if ( typeof action === 'function' ) {
		return action( store.dispatch, store.getState );
	}
	return next( action );
};

// Create store with middleware
const store = createStore( rootReducer, applyMiddleware( asyncMiddleware ) );

export default store;
