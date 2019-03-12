import { combineReducers } from 'redux';
import isAuthenticated from './isAuthenticated';
import name from './name';
import username from './username';

export default combineReducers({
	isAuthenticated,
	name,
	username
});