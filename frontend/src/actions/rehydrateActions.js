import {
	REHYDRATE
} from './actionTypes';

import {
	getCurrentUserAction
} from './userActions';

import {
	ACCESS_TOKEN
} from '../constants';

export const rehydrateAction = () => dispatch => {
	const payload = {};

	if (typeof window === 'object') {
		try {
			const accessToken = localStorage.getItem(ACCESS_TOKEN);
			payload.accessToken = accessToken;
			dispatch(getCurrentUserAction());
		} catch (err) {
			// do nothing
		}
	} else {
		// do nothing
	}

	return {
		type: REHYDRATE,
		payload
	};
};