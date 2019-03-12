import * as actions from '../../actions/actionTypes';

const initialState = {
	message: '',
	status: 0,
	success: false
};

export default function response (state = initialState, action) {
	switch (action.type) {
	case actions.INIT_SIGNUP_RESULT:
		return initialState;
	case actions.SET_SIGNUP_RESULT:
		if (action.payload && action.payload.success) {
			return { ...state, status: 201, message: '', success: action.payload.success };
		} else if (action.payload && action.payload.success === false && action.payload.message) {
			return { ...state, status: 400, message: action.payload.message, success: action.payload.message };
		} else {
			return state;
		}
	default:
		return state;
	}
}