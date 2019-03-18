import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './userActions';
import * as types from './actionTypes';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import {
	API_BASE_URL
} from '../constants';

describe('userActions Test Cases', () => {
	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	it('creates SET_CURRENT_USER when fetching getCurrentUserAction has been done', () => {
		fetchMock
			.getOnce(API_BASE_URL + '/user/me', { body: { name: 'user1', username: 'user1' }, headers: { 'content-type': 'application/json' } });
		const expectedActions = [
			{ type: types.SET_CURRENT_USER, body: { name: 'user1', username: 'user1' } }
		];
		const store = mockStore({ accessToken: 'abcd' });

		return store.dispatch(actions.getCurrentUserAction()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});