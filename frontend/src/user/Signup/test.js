import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Signup } from './index';

configure({ adapter: new Adapter() });

describe('Signin Test Cases', () => {
	const component = shallow(
		<Signup
			accessToken=""
			fetching={true}
			initSignupResult={() => { }}
			signupAction={() => { }}
			status={0}
			success={false}
			message=""
		/>
	);

	it('renders without crashing', () => {
		expect(component.find('#signup-container')).toHaveLength(1);
	});

	it('change state when status is 401', () => {
		component.setProps({ success: false, status: 401 });
		expect(component.state('message')).toBe('Sorry! Something went wrong. Please try again!');
		expect(component.state('variant')).toBe('error');
		expect(component.state('snackBarOpen')).toBe(true);
	});

	it('change state when success is true', () => {
		component.setProps({ success: true, status: 200 });
		expect(component.state('message')).toBe('Thank you! You\'re successfully registered. Please Signin to continue!');
		expect(component.state('variant')).toBe('success');
		expect(component.state('snackBarOpen')).toBe(true);
	});

	it('update snackBarOpen state when user close', () => {
		component.find('WithStyles(SnackBar)').prop('onClose')();
		expect(component.state('snackBarOpen')).toBe(false);
	});

	it('renders Redirect when redirect state is true', () => {
		component.setState({ redirect: true });
		expect(component.find('Redirect')).toHaveLength(1);
	});
});