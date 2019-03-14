import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SigninForm from '../SigninForm';
import SnackBar from '../../common/SnackBar';

import {
	signinAction
} from '../../actions/signinoutActions';

import './index.css';

export class Signin extends Component {
	state = {
		snackBarOpen: false,
		message: '',
		variant: 'success'
	};

	componentDidUpdate (prevProps) {
		if (prevProps.fetching === true && this.props.status === 401) {
			this.setState({
				snackBarOpen: true,
				message: 'Your Username or Password is incorrect. Please try again!',
				variant: 'error'
			});
		}
	}

	handleClose = () => {
		this.setState({ snackBarOpen: false });
	}

	render () {
		const { message, snackBarOpen, variant } = this.state;

		if (this.props.accessToken) {
			return <Redirect to="/list" />;
		}

		return (
			<div className="signin-container">
				<div className="signin-content">
					<SigninForm
						signinAction={this.props.signinAction}
					/>
				</div>
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

Signin.propTypes = {
	accessToken: PropTypes.string.isRequired,
	fetching: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired,
	signinAction: PropTypes.func.isRequired,
	status: PropTypes.number.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => ({
	accessToken: state.signin.accessToken,
	fetching: state.signin.fetching,
	status: state.signin.status,
	message: state.signin.message
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
	signinAction (value) {
		dispatch(signinAction(value));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Signin);