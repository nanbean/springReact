import {
	SET_ACCESS_TOKEN,
	SET_SIGNIN_FETCHING,
	SET_SIGNIN_RESULT
} from './actionTypes';

import {
	getCurrentUserAction
} from './userActions';

import {
	initContentsAction
} from './contentActions';

import {
	API_BASE_URL
} from '../constants';

import {
	getHeaders
} from '../util/actionUtil';

export const setSigninFetchingAction = value => ({
	type: SET_SIGNIN_FETCHING,
	payload: value
});

export const setAccessTokenAction = value => ({
	type: SET_ACCESS_TOKEN,
	payload: value
});

const fetchSigninSuccess = body => ({
	type: SET_SIGNIN_RESULT,
	payload: body
});

const fetchSigninFailure = ex => ({
	type: SET_SIGNIN_RESULT,
	payload: ex
});

export const signinAction = (signinRequest) => dispatch => {
	const apiUrl = API_BASE_URL + '/auth/signin';

	dispatch(setSigninFetchingAction(true));
	return fetch(apiUrl, {
		method: 'POST',
		headers: getHeaders(),
		body: JSON.stringify(signinRequest)
	})
		.then(res => res.json())
		.then(body => {
			dispatch(fetchSigninSuccess(body));
			dispatch(getCurrentUserAction());
		})
		.catch(ex => {
			dispatch(fetchSigninFailure(ex));
		});
};

export const logoutAction = () => dispatch => {
	dispatch(setAccessTokenAction(''));
	dispatch(initContentsAction());
};