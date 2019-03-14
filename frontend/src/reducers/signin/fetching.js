import * as actions from '../../actions/actionTypes';

const initialState = false;

export default function fetching (state = initialState, action) {
	switch (action.type) {
	case actions.SET_SIGNIN_FETCHING:
		return action.payload;
	case actions.SET_SIGNIN_RESULT:
		return false;
	default:
		return state;
	}
}