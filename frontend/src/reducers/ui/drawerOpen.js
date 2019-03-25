import * as actions from '../../actions/actionTypes';

const initialState = true;

export default function drawerOpen (state = initialState, action) {
	switch (action.type) {
	case actions.SET_DRAWER_OPEN:
		return action.payload;
	default:
		return state;
	}
}