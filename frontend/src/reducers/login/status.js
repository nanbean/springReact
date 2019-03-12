import * as actions from '../../actions/actionTypes';

const initialState = 0;

export default function fetching (state = initialState, action) {
	switch (action.type) {
	case actions.SET_LOGIN_RESULT:
		if (action.payload && action.payload.accessToken) {
			return 200;
		} else if (action.payload && action.payload.status) {
			return action.payload.status;
		} else {
			return state;
		}
	default:
		return state;
	}
}