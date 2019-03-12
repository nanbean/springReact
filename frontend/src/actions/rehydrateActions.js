import {
	REHYDRATE
} from './actionTypes';

import {
	ACCESS_TOKEN
} from '../constants';

export const rehydrateAction = () => {
	const payload = {};

	if (typeof window === 'object') {
		try {
			const accessToken = localStorage.getItem(ACCESS_TOKEN);
			payload.accessToken = accessToken;
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