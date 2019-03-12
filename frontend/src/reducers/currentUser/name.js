import * as actions from '../../actions/actionTypes';

const initialState = '';

export default function name (state = initialState, action) {
	switch (action.type) {
	case actions.SET_CURRENT_USER:
		if (typeof action.payload.name !== 'undefined') {
			return action.payload.name;
		} else {
			return state;
		}
	default:
		return state;
	}
}