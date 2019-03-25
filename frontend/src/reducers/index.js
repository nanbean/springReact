import { combineReducers } from 'redux';
import contents from './contents';
import currentUser from './currentUser';
import signin from './signin';
import newContent from './newContent';
import signup from './signup';
import ui from './ui';

const lcms = combineReducers({
	contents,
	currentUser,
	signin,
	newContent,
	signup,
	ui
});

export default lcms;