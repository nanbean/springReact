import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Signin } from './index';

configure({ adapter: new Adapter() });

describe('Signin Test Cases', () => {
	const component = shallow(
		<Signin
			accessToken=""
			fetching={true}
			signinAction={() => { }}
			status={0}
			message=""
		/>
	);

	it('renders without crashing', () => {
		expect(component.find('div.signin-container')).toHaveLength(1);
	});

	it('change state when status is 401', () => {
		component.setProps({ fetching: false, status: 401 });
		expect(component.state('message')).toBe('Your Username or Password is incorrect. Please try again!');
		expect(component.state('variant')).toBe('error');
		expect(component.state('snackBarOpen')).toBe(true);
	});

	it('update snackBarOpen state when user close', () => {
		component.find('WithStyles(SnackBar)').prop('onClose')();
		expect(component.state('snackBarOpen')).toBe(false);
	});

	it('renders Redirect when there is accessToken', () => {
		component.setProps({ accessToken: 'abcd' });
		expect(component.find('Redirect')).toHaveLength(1);
	});
});