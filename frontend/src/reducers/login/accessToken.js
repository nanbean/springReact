import * as actions from '../../actions/actionTypes';

import { ACCESS_TOKEN } from '../../constants';

const initialState = '';

export default function accessToken (state = initialState, action) {
	switch (action.type) {
	case actions.SET_ACCESS_TOKEN:
		if (action.payload) {
			localStorage.setItem(ACCESS_TOKEN, action.payload);
			return action.payload;
		} if (action.payload === '') {
			localStorage.removeItem(ACCESS_TOKEN);
			return initialState;
		} else {
			return state;
		}
	case actions.SET_LOGIN_RESULT:
		if (action.payload.accessToken) {
			localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
			return action.payload.accessToken;
		} else {
			return state;
		}
	case actions.REHYDRATE:
		return action.payload.accessToken || state;
	default:
		return state;
	}
}