import {
	SET_ACCESS_TOKEN,
	SET_LOGIN_FETCHING,
	SET_LOGIN_RESULT
} from './actionTypes';

import {
	getCurrentUserAction
} from './userActions';

import {
	API_BASE_URL
} from '../constants';

import {
	getHeaders
} from '../util/actionUtil';

export const setLoginFetchingAction = value => ({
	type: SET_LOGIN_FETCHING,
	payload: value
});

export const setAccessTokenAction = value => ({
	type: SET_ACCESS_TOKEN,
	payload: value
});

const fetchLoginSuccess = body => ({
	type: SET_LOGIN_RESULT,
	payload: body
});

const fetchLoginFailure = ex => ({
	type: SET_LOGIN_RESULT,
	payload: ex
});

export const loginAction = (loginRequest) => dispatch => {
	const apiUrl = API_BASE_URL + '/auth/signin';

	dispatch(setLoginFetchingAction(true));
	return fetch(apiUrl, {
		method: 'POST',
		headers: getHeaders(),
		body: JSON.stringify(loginRequest)
	})
		.then(res => res.json())
		.then(body => {
			dispatch(fetchLoginSuccess(body));
			dispatch(getCurrentUserAction());
		})
		.catch(ex => dispatch(fetchLoginFailure(ex)));
};

export const logoutAction = () => dispatch => {
	dispatch(setAccessTokenAction(''));
};