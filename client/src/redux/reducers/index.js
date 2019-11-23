// @flow

import nameReducer from './name.js';
import loggedReducer from './isLogged.js';
import idReducer from './id.js';
import { combineReducers } from 'redux';

/**
 * Combines all the reducers into one constant.
 */

const allReducers = combineReducers({
    name: nameReducer,
    isLogged: loggedReducer,
    id: idReducer
});

export default allReducers;
