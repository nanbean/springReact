import * as actions from '../../actions/actionTypes';

const initialState = 0;

export default function page (state = initialState, action) {
	switch (action.type) {
	case actions.SET_CONTENTS:
		if (typeof action.payload.page !== 'undefined') {
			return action.payload.page;
		} else {
			return state;
		}
	default:
		return state;
	}
}