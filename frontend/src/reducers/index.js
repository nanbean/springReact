import { combineReducers } from 'redux';
import contents from './contents';
import currentUser from './currentUser';
import signin from './signin';
import newContent from './newContent';
import signup from './signup';

const lcms = combineReducers({
	contents,
	currentUser,
	signin,
	newContent,
	signup
});

export default lcms;