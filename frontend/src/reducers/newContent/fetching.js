import * as actions from '../../actions/actionTypes';

const initialState = false;

export default function fetching (state = initialState, action) {
	switch (action.type) {
	case actions.SET_NEW_CONTENT_FETCHING:
		return true;
	case actions.SET_NEW_CONTENT_RESULT:
		return false;
	default:
		return state;
	}
}