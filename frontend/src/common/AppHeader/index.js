import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	withRouter,
	Link
} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { ACCESS_TOKEN } from '../../constants';

import {
	setAuthenticatedAction,
	setCurrentUserAction
} from '../../actions/userActions';

import {
	logoutAction
} from '../../actions/signinoutActions';

import logo from '../../resources/images/logo.svg';

const styles = {
	grow: {
		flexGrow: 1
	},
	link: {
		textDecoration: 'none',
		color: 'inherit'
	}
};

class AppHeader extends Component {
	state = {
		anchorEl: null
	};

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	}

	handleSignout = () => {
		localStorage.removeItem(ACCESS_TOKEN);

		this.props.setCurrentUserAction({
			name: '',
			username: ''
		});

		this.props.logoutAction();
		this.props.setAuthenticatedAction(false);

		this.props.history.push('/');
	}

	handleClose = () => {
		this.setState({ anchorEl: null });
	}

	render () {
		const {
			classes,
			isAuthenticated
		} = this.props;
		let menuItems;

		if (isAuthenticated) {
			menuItems = [
				<Link key="list" to="/list" className={classes.link}>
					<Button color="inherit">List</Button>
				</Link>,
				<Link key="/content/new" to="/content/new" className={classes.link}>
					<Button color="inherit">New</Button>
				</Link>,
				<Link key="/profile" to="/profile" className={classes.link}>
					<Button color="inherit">Profile</Button>
				</Link>,
				<Link key="/logOut" to="/" className={classes.link}>
					<Button color="inherit" onClick={this.handleSignout}>Signout</Button>
				</Link>
			];
		} else {
			menuItems = [
				<Link key="/signin" to="/signin" className={classes.link}>
					<Button color="inherit">Signin</Button>
				</Link>,
				<Link key="/signup" to="/signup" className={classes.link}>
					<Button color="inherit">Signup</Button>
				</Link>
			];
		}

		return (
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" color="inherit" className={classes.grow}>
						<Link to="/" className={classes.link}>
							<img width={20} src={logo} alt="" />
							<span className={classes.tagline}>LCMS</span>
						</Link>
					</Typography>
					<div>
						{menuItems}
					</div>
				</Toolbar>
			</AppBar>
		);
	}
}

AppHeader.propTypes = {
	classes: PropTypes.object.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	logoutAction: PropTypes.func.isRequired,
	setAuthenticatedAction: PropTypes.func.isRequired,
	setCurrentUserAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.currentUser.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
	logoutAction () {
		dispatch(logoutAction());
	},
	setAuthenticatedAction (value) {
		dispatch(setAuthenticatedAction(value));
	},
	setCurrentUserAction (value) {
		dispatch(setCurrentUserAction(value));
	}
});

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(AppHeader)));