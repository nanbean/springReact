import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { Form, Input, Button, Icon } from 'antd';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './index.css';

// const FormItem = Form.Item;

class LoginForm extends Component {
	handleSubmit = (event) => {
		event.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const loginRequest = Object.assign({}, values);
				// login(loginRequest)
				// 	.then(response => {
				// 		localStorage.setItem(ACCESS_TOKEN, response.accessToken);
				// 		this.props.onLogin();
				// 	}).catch(error => {
				// 		if (error.status === 401) {
				// 			notification.error({
				// 				message: 'LCMS',
				// 				description: 'Your Username or Password is incorrect. Please try again!'
				// 			});
				// 		} else {
				// 			notification.error({
				// 				message: 'LCMS',
				// 				description: error.message || 'Sorry! Something went wrong. Please try again!'
				// 			});
				// 		}
				// 	});
				this.props.loginAction(loginRequest);
			}
		});
	}

	render () {
		// const { getFieldDecorator } = this.props.form;
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<TextField />
				</div>
				<div>
					<TextField />
				</div>
				<Button type="primary" htmlType="submit" variant="contained">Login</Button>
			</form>
			// <Form onSubmit={this.handleSubmit} className="login-form">
			// 	<FormItem>
			// 		{getFieldDecorator('usernameOrEmail', {
			// 			rules: [{ required: true, message: 'Please input your username or email!' }]
			// 		})(
			// 			<Input
			// 				prefix={<Icon type="user" />}
			// 				size="large"
			// 				name="usernameOrEmail"
			// 				placeholder="Username or Email" />
			// 		)}
			// 	</FormItem>
			// 	<FormItem>
			// 		{getFieldDecorator('password', {
			// 			rules: [{ required: true, message: 'Please input your Password!' }]
			// 		})(
			// 			<Input
			// 				prefix={<Icon type="lock" />}
			// 				size="large"
			// 				name="password"
			// 				type="password"
			// 				placeholder="Password" />
			// 		)}
			// 	</FormItem>
			// 	<FormItem>
			// 		<Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
			// 		Or <Link to="/signup">register now!</Link>
			// 	</FormItem>
			// </Form>
		);
	}
}

LoginForm.propTypes = {
	form: PropTypes.object.isRequired,
	loginAction: PropTypes.func.isRequired
};

export default LoginForm;