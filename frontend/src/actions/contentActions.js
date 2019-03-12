import {
	SET_CONTENTS,
	SET_CONTENTS_FETCHING,
	SET_NEW_CONTENT_FETCHING,
	SET_NEW_CONTENT_RESULT
} from './actionTypes';

import {
	API_BASE_URL,
	CONTENT_LIST_SIZE
} from '../constants';

import {
	getHeaders
} from '../util/actionUtil';

export const setContentFetchingAction = value => ({
	type: SET_CONTENTS_FETCHING,
	payload: value
});

const fetchGetAllContentsActionSuccess = body => ({
	type: SET_CONTENTS,
	payload: body
});

const fetchGetAllContentsActionFailure = ex => ({
	type: SET_CONTENTS,
	payload: ex
});

export const getAllContentsAction = (page, size) => dispatch => {
	page = page || 0;
	size = size || CONTENT_LIST_SIZE;
	const apiUrl = API_BASE_URL + '/contents?page=' + page + '&size=' + size;

	dispatch(setContentFetchingAction(true));
	return fetch(apiUrl, {
		method: 'GET',
		headers: getHeaders()
	})
		.then(res => res.json())
		.then(body => dispatch(fetchGetAllContentsActionSuccess(body)))
		.catch(ex => dispatch(fetchGetAllContentsActionFailure(ex)));
};

const fetchGetUserCreatedContentsSuccess = body => ({
	type: SET_CONTENTS,
	payload: body
});

const fetchGetUserCreatedContentsFailure = ex => ({
	type: SET_CONTENTS,
	payload: ex
});

export const getUserCreatedContentsAction = (username, page, size) => dispatch => {
	page = page || 0;
	size = size || CONTENT_LIST_SIZE;
	const apiUrl = API_BASE_URL + '/users/' + username + '/contents?page=' + page + '&size=' + size;

	dispatch(setContentFetchingAction(true));
	return fetch(apiUrl, {
		method: 'GET',
		headers: getHeaders()
	})
		.then(res => res.json())
		.then(body => dispatch(fetchGetUserCreatedContentsSuccess(body)))
		.catch(ex => dispatch(fetchGetUserCreatedContentsFailure(ex)));
};

const setNewContentFetchingAction = value => ({
	type: SET_NEW_CONTENT_FETCHING,
	payload: value
});

const fetchCreateContentSuccess = body => ({
	type: SET_NEW_CONTENT_RESULT,
	payload: body
});

const fetchCreateContentFailure = ex => ({
	type: SET_NEW_CONTENT_RESULT,
	payload: ex
});

export const createContentAction = (contentData) => dispatch => {
	const apiUrl = API_BASE_URL + '/contents';

	dispatch(setNewContentFetchingAction(true));
	return fetch(apiUrl, {
		method: 'POST',
		headers: getHeaders(),
		body: JSON.stringify(contentData)
	})
		.then(res => res.json())
		.then(body => dispatch(fetchCreateContentSuccess(body)))
		.catch(ex => dispatch(fetchCreateContentFailure(ex)));
};