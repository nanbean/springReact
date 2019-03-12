import * as actions from '../../actions/actionTypes';

const initialState = true;

export default function last (state = initialState, action) {
	switch (action.type) {
	case actions.SET_CONTENTS:
		if (typeof action.payload.last !== 'undefined') {
			return action.payload.last;
		} else {
			return state;
		}
	default:
		return state;
	}
}