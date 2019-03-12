import * as actions from '../../actions/actionTypes';

const initialState = 10;

export default function size (state = initialState, action) {
	switch (action.type) {
	case actions.SET_CONTENTS:
		if (typeof action.payload.size !== 'undefined') {
			return action.payload.size;
		} else {
			return state;
		}
	default:
		return state;
	}
}