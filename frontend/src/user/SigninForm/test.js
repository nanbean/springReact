import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SigninForm } from './index';

configure({ adapter: new Adapter() });

describe('SigninForm Test Cases', () => {
	const signinAction = jest.fn();
	const component = mount(
		<SigninForm
			classes={{}}
			signinAction={signinAction}
		/>
	);

	it('renders without crashing', () => {
		expect(component.find('Paper')).toHaveLength(1);
	});

	it('update state when user input', () => {
		component.find('input').at(0).simulate('change', { target: { value: 'username' } });
		component.find('input').at(1).simulate('change', { target: { value: 'password' } });
		expect(component.state('usernameOrEmail')).toBe('username');
		expect(component.state('password')).toBe('password');
	});

	it('call signinAction when form submit', () => {
		component.find('form').simulate('submit');
		expect(signinAction).toHaveBeenCalled();
	});
});