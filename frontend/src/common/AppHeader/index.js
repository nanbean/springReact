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
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import {
	ACCESS_TOKEN
} from '../../constants';

import {
	setAuthenticatedAction,
	setCurrentUserAction
} from '../../actions/userActions';

import {
	logoutAction
} from '../../actions/signinoutActions';

import {
	setDrawerOpenAction
} from '../../actions/uiActions';

import logo from '../../resources/images/logo.svg';

const styles = theme => ({
	appBar: {
		flexGrow: 1,
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	grow: {
		flexGrow: 1
	},
	logo: {
		width: 40,
		verticalAlign: 'middle',
		margin: 10
	},
	tagline: {
		verticalAlign: 'middle'
	},
	link: {
		textDecoration: 'none',
		color: 'inherit'
	}
});

class AppHeader extends Component {
	state = {
		anchorEl: null
	};

	handleMenuIconClick = () => {
		const { drawerOpen } = this.props;
		this.props.setDrawerOpenAction(!drawerOpen);
	}

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
			<AppBar
				position="fixed"
				className={classes.appBar}
			>
				<Toolbar>
					<IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleMenuIconClick}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="inherit" className={classes.grow}>
						<Link to="/" className={classes.link}>
							<img src={logo} alt="" className={classes.logo} />
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
	drawerOpen: PropTypes.bool.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	logoutAction: PropTypes.func.isRequired,
	setAuthenticatedAction: PropTypes.func.isRequired,
	setCurrentUserAction: PropTypes.func.isRequired,
	setDrawerOpenAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	drawerOpen: state.ui.drawerOpen,
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
	},
	setDrawerOpenAction (value) {
		dispatch(setDrawerOpenAction(value));
	}
});

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(AppHeader)));