import { combineReducers } from 'redux';
import accessToken from './accessToken';
import fetching from './fetching';
import message from './message';
import status from './status';

export default combineReducers({
	accessToken,
	fetching,
	message,
	status
});