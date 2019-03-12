import {
	INIT_SIGNUP_RESULT,
	SET_SIGNUP_RESULT
} from './actionTypes';

import {
	API_BASE_URL
} from '../constants';

import {
	getHeaders
} from '../util/actionUtil';

export const initSignupResult = body => ({
	type: INIT_SIGNUP_RESULT,
	payload: body
});

export const setSignupResult = body => ({
	type: SET_SIGNUP_RESULT,
	payload: body
});

const fetchSignupSuccess = body => ({
	type: SET_SIGNUP_RESULT,
	payload: body
});

const fetchSignupFailure = ex => ({
	type: SET_SIGNUP_RESULT,
	payload: ex
});

export const signupAction = (signupRequest) => dispatch => {
	const apiUrl = API_BASE_URL + '/auth/signup';

	return fetch(apiUrl, {
		method: 'POST',
		headers: getHeaders(),
		body: JSON.stringify(signupRequest)
	})
		.then(res => res.json())
		.then(body => dispatch(fetchSignupSuccess(body)))
		.catch(ex => dispatch(fetchSignupFailure(ex)));
};