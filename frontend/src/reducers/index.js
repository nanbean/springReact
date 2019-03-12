import { combineReducers } from 'redux';
import contents from './contents';
import currentUser from './currentUser';
import login from './login';
import newContent from './newContent';
import signup from './signup';

const lcms = combineReducers({
	contents,
	currentUser,
	login,
	newContent,
	signup
});

export default lcms;