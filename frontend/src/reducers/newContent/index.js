import { combineReducers } from 'redux';
import error from './error';
import fetching from './fetching';

export default combineReducers({
	error,
	fetching
});