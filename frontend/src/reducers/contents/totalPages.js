import * as actions from '../../actions/actionTypes';

const initialState = 0;

export default function totalPages (state = initialState, action) {
	switch (action.type) {
	case actions.SET_CONTENTS:
		if (typeof action.payload.totalPages !== 'undefined') {
			return action.payload.totalPages;
		} else {
			return state;
		}
	default:
		return state;
	}
}