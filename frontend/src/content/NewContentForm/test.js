import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NewContentForm } from './index';

configure({ adapter: new Adapter() });

describe('NewContentForm Test Cases', () => {
	const createContentAction = jest.fn();
	const component = mount(
		<NewContentForm
			classes={{}}
			createContentAction={createContentAction}
		/>
	);

	it('renders without crashing', () => {
		expect(component.find('Paper')).toHaveLength(1);
	});

	it('update state when user input', () => {
		component.find('input').at(0).simulate('change', { target: { name: 'title', value: 'title' } });
		component.find('textarea').filter({ id: 'description' }).simulate('change', { target: { name: 'description', value: 'description' } });
		component.find('input').at(1).simulate('change', { target: { name: 'genre', value: 'genre' } });
		expect(component.state('title').text).toBe('title');
		expect(component.state('description').text).toBe('description');
		expect(component.state('genre').text).toBe('genre');
	});

	// TODO add more test cases about abnormal input

	it('call createContentAction when form submit', () => {
		component.find('form').simulate('submit');
		expect(createContentAction).toHaveBeenCalled();
	});
});