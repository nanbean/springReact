import * as actions from '../../actions/actionTypes';

const initialState = false;

export default function isAuthenticated (state = initialState, action) {
	switch (action.type) {
	case actions.SET_AUTHENTICATED:
		return action.payload;
	case actions.SET_CURRENT_USER:
		if (action.body && typeof action.body.name !== 'undefined') {
			return true;
		} else {
			return state;
		}
	default:
		return state;
	}
}