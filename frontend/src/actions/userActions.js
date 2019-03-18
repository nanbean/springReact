import {
	SET_AUTHENTICATED,
	SET_CURRENT_USER
} from './actionTypes';

import {
	API_BASE_URL
} from '../constants';

import {
	getHeaders
} from '../util/actionUtil';

export const setAuthenticatedAction = value => ({
	type: SET_AUTHENTICATED,
	payload: value
});

export const setCurrentUserAction = value => ({
	type: SET_CURRENT_USER,
	payload: value
});

const fetchGetCurrentUserActionSuccess = body => ({
	type: SET_CURRENT_USER,
	body
});

const fetchGetCurrentUserActionFailure = ex => ({
	type: SET_CURRENT_USER,
	ex
});

export const getCurrentUserAction = () => dispatch => {
	const apiUrl = API_BASE_URL + '/user/me';

	return fetch(apiUrl, {
		method: 'GET',
		headers: getHeaders()
	})
		.then(res => res.json())
		.then(body => {
			dispatch(fetchGetCurrentUserActionSuccess(body));
		})
		.catch(ex => {
			dispatch(fetchGetCurrentUserActionFailure(ex));
		});
};