import * as actions from '../../actions/actionTypes';

const initialState = '';

export default function name (state = initialState, action) {
	switch (action.type) {
	case actions.SET_CURRENT_USER:
		if (action.body && typeof action.body.name !== 'undefined') {
			return action.body.name;
		} else {
			return state;
		}
	default:
		return state;
	}
}