import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, notification } from 'antd';

import LoginForm from '../LoginForm';
import SnackBar from '../../common/SnackBar';

import {
	loginAction
} from '../../actions/loginoutActions';

import './index.css';

class Login extends Component {
	state = {
		open: false,
		message: '',
		variant: 'success'
	};

	componentDidUpdate (prevProps) {
		if (prevProps.fetching === true && this.props.status === 401) {
			this.setState({
				open: true,
				message: 'Your Username or Password is incorrect. Please try again!',
				variant: 'error'
			});
		}
	}

	handleClose = () => {
		this.setState({ open: false });
	}

	render () {
		const { open, message } = this.state;
		const AntWrappedLoginForm = Form.create()(LoginForm);

		if (this.props.accessToken) {
			return <Redirect to="/" />;
		}

		return (
			<div>
				<div className="login-container">
					<h1 className="page-title">Login</h1>
					<div className="login-content">
						<AntWrappedLoginForm
							loginAction={this.props.loginAction}
						/>
					</div>
				</div>
				<SnackBar
					open={open}
					variant="error"
					message={message}
					onClose={this.handleClose}
				/>
			</div>
		);
	}
}

Login.propTypes = {
	accessToken: PropTypes.string.isRequired,
	fetching: PropTypes.bool.isRequired,
	loginAction: PropTypes.func.isRequired,
	message: PropTypes.string.isRequired,
	status: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
	accessToken: state.login.accessToken,
	fetching: state.login.fetching,
	status: state.login.status,
	message: state.login.message
});

const mapDispatchToProps = dispatch => ({
	loginAction (value) {
		dispatch(loginAction(value));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);