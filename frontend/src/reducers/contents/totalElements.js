import * as actions from '../../actions/actionTypes';

const initialState = 0;

export default function totalElements (state = initialState, action) {
	switch (action.type) {
	case actions.SET_CONTENTS:
		if (typeof action.payload.totalElements !== 'undefined') {
			return action.payload.totalElements;
		} else {
			return state;
		}
	default:
		return state;
	}
}