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
	payload: body
});

const fetchGetCurrentUserActionFailure = ex => ({
	type: SET_CURRENT_USER,
	payload: ex
});

export const getCurrentUserAction = () => (dispatch, getState) => {
	const state = getState();
	const apiUrl = API_BASE_URL + '/user/me';

	if (!state.accessToken) {
		dispatch(fetchGetCurrentUserActionFailure);
	}

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