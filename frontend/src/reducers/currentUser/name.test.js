import reducer from './name';
import * as types from '../../actions/actionTypes';

describe('currentUser name reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual('');
	});

	it('should handle SET_CURRENT_USER', () => {
		expect(
			reducer([], {
				type: types.SET_CURRENT_USER,
				body: { name: 'user1' }
			})
		).toEqual('user1');

		expect(
			reducer(
				'user1',
				{
					type: types.SET_CURRENT_USER,
					body: { name: 'user2' }
				}
			)
		).toEqual('user2');
	});
});