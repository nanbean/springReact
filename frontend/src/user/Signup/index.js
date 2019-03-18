import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SignupForm from '../SignupForm';
import SnackBar from '../../common/SnackBar';

import {
	initSignupResult,
	signupAction
} from '../../actions/signupActions';

export class Signup extends Component {
	state = {
		snackBarOpen: false,
		message: '',
		redirect: false,
		variant: 'success'
	};

	componentDidMount () {
		// initialize signup result
		this.props.initSignupResult();
	}

	componentDidUpdate (prevProps) {
		if (prevProps.success === false && this.props.success === true) {
			this.setState({
				snackBarOpen: true,
				message: 'Thank you! You\'re successfully registered. Please Signin to continue!',
				variant: 'success'
			});
			setTimeout(() => {
				this.setState({
					redirect: true
				});
			}, 2000);
		} else if (prevProps.status === 0 && this.props.status) {
			this.setState({
				snackBarOpen: true,
				message: this.props.message || 'Sorry! Something went wrong. Please try again!',
				variant: 'error'
			});
		}
	}

	handleClose = () => {
		this.setState({ snackBarOpen: false });
	}

	render () {
		const { message, redirect, snackBarOpen, variant } = this.state;

		if (redirect) {
			return <Redirect push to="/signin" />;
		}

		return (
			<div id="signup-container">
				<SignupForm
					signupAction={this.props.signupAction}
				/>
				<SnackBar
					open={snackBarOpen}
					variant={variant}
					message={message}
					onClose={this.handleClose}
				/>
			</div>
		);
	}
}

Signup.propTypes = {
	initSignupResult: PropTypes.func.isRequired,
	message: PropTypes.string.isRequired,
	signupAction: PropTypes.func.isRequired,
	status: PropTypes.number.isRequired,
	success: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	message: state.signup.response.message,
	status: state.signup.response.status,
	success: state.signup.response.success
});

const mapDispatchToProps = dispatch => ({
	initSignupResult () {
		dispatch(initSignupResult());
	},
	signupAction (value) {
		dispatch(signupAction(value));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Signup);