import * as actions from '../../actions/actionTypes';

const initialState = '';

export default function username (state = initialState, action) {
	switch (action.type) {
	case actions.SET_CURRENT_USER:
		if (action.body && typeof action.body.username !== 'undefined') {
			return action.body.username;
		} else {
			return state;
		}
	default:
		return state;
	}
}