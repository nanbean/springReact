import * as actions from '../../actions/actionTypes';

const initialState = {
	status: 200
};

export default function error (state = initialState, action) {
	switch (action.type) {
	case actions.SET_NEW_CONTENT_RESULT:
		if (typeof action.payload.error !== 'undefined') {
			return action.payload.error;
		} else {
			return state;
		}
	default:
		return state;
	}
}