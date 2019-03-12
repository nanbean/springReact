import * as actions from '../../actions/actionTypes';

const initialState = '';

export default function username (state = initialState, action) {
	switch (action.type) {
	case actions.SET_CURRENT_USER:
		if (typeof action.payload.username !== 'undefined') {
			return action.payload.username;
		} else {
			return state;
		}
	default:
		return state;
	}
}