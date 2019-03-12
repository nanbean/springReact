import * as actions from '../../actions/actionTypes';

const initialState = false;

export default function fetching (state = initialState, action) {
	switch (action.type) {
	case actions.SET_CONTENTS_FETCHING:
		return true;
	case actions.SET_CONTENTS:
		return false;
	default:
		return state;
	}
}