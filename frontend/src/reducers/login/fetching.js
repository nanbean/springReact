import * as actions from '../../actions/actionTypes';

const initialState = false;

export default function fetching (state = initialState, action) {
	switch (action.type) {
	case actions.SET_LOGIN_FETCHING:
		return action.payload;
	case actions.SET_LOGIN_RESULT:
		return false;
	default:
		return state;
	}
}