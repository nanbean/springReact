import * as actions from '../../actions/actionTypes';

const initialState = '';

export default function message (state = initialState, action) {
	switch (action.type) {
	case actions.SET_SIGNIN_RESULT:
		if (action.payload && action.payload.accessToken) {
			return initialState;
		} else if (action.payload && action.payload.message) {
			return action.payload.message;
		} else {
			return state;
		}
	default:
		return state;
	}
}