import { combineReducers } from 'redux';
import contents from './contents';
import fetching from './fetching';
import last from './last';
import page from './page';
import size from './size';
import totalElements from './totalElements';
import totalPages from './totalPages';

export default combineReducers({
	contents,
	fetching,
	last,
	page,
	size,
	totalElements,
	totalPages
});