import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import lcms from '../reducers';
export default function configureStore (initialState) {
	const store = createStore(
		lcms,
		initialState,
		applyMiddleware(thunkMiddleware)
	);
	return store;
}