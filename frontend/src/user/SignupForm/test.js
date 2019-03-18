import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SignupForm } from './index';

configure({ adapter: new Adapter() });

describe('SignupForm Test Cases', () => {
	const signupAction = jest.fn();
	const component = mount(
		<SignupForm
			classes={{}}
			signupAction={signupAction}
		/>
	);

	it('renders without crashing', () => {
		expect(component.find('Paper')).toHaveLength(1);
	});

	it('update state when user input', () => {
		component.find('input').at(0).simulate('change', { target: { name: 'name', value: 'name' } });
		component.find('input').at(1).simulate('change', { target: { name: 'username', value: 'username' } });
		component.find('input').at(2).simulate('change', { target: { name: 'email', value: 'email@email.com' } });
		component.find('input').at(3).simulate('change', { target: { name: 'password', value: 'password' } });
		expect(component.state('name').value).toBe('name');
		expect(component.state('username').value).toBe('username');
		expect(component.state('email').value).toBe('email@email.com');
		expect(component.state('password').value).toBe('password');
	});

	// TODO add more test cases about abnormal input

	it('call signinAction when form submit', () => {
		component.find('form').simulate('submit');
		expect(signupAction).toHaveBeenCalled();
	});
});