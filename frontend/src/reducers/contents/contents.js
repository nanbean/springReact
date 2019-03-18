import * as actions from '../../actions/actionTypes';

const initialState = [];

export default function contents (state = initialState, action) {
	switch (action.type) {
	case actions.SET_CONTENTS:
		if (action.payload.content) {
			return [
				...state,
				...action.payload.content
			];
		} else {
			return state;
		}
	default:
		return state;
	}
}