import * as actions from '../../actions/actionTypes';

const initialState = false;

export default function isAuthenticated (state = initialState, action) {
	switch (action.type) {
	case actions.SET_AUTHENTICATED:
		return action.payload;
	case actions.SET_CURRENT_USER:
		if (typeof action.payload.name !== 'undefined') {
			return true;
		} else {
			return state;
		}
	default:
		return state;
	}
}