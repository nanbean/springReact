import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	Route,
	withRouter,
	Switch
} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Layout, notification } from 'antd';

import { ACCESS_TOKEN } from './constants';

import ContentList from './content/ContentList';
import NewContent from './content/NewContent';
import Login from './user/Login';
import SignUp from './user/SignUp';
import Profile from './user/Profile';
import AppHeader from './common/AppHeader';
import NotFound from './common/NotFound';
import LoadingIndicator from './common/LoadingIndicator';
import PrivateRoute from './common/PrivateRoute';

import { rehydrateAction } from './actions/rehydrateActions';

import {
	getCurrentUserAction,
	setAuthenticatedAction,
	setCurrentUserAction
} from './actions/userActions';

import {
	logoutAction
} from './actions/loginoutActions';

import theme from './theme';

import './App.css';

const { Content } = Layout;

class App extends Component {
	constructor (props) {
		super(props);

		notification.config({
			placement: 'topRight',
			top: 70,
			duration: 3
		});

		this.props.rehydrateAction();
	}

	componentDidMount () {
		this.props.getCurrentUserAction();
	}

	handleLogout = (redirectTo = '/', notificationType = 'success', description = 'You\'re successfully logged out.') => {
		localStorage.removeItem(ACCESS_TOKEN);

		this.props.setCurrentUserAction({
			name: '',
			username: ''
		});

		this.props.logoutAction();
		this.props.setAuthenticatedAction(false);

		this.props.history.push(redirectTo);

		notification[notificationType]({
			message: 'LCMS',
			description: description
		});
	}

	render () {
		const {
			accessToken,
			currentUser,
			isAuthenticated
		} = this.props;

		if (accessToken && !currentUser.username) { // App is fetching user information
			return <LoadingIndicator />;
		}

		return (
			<MuiThemeProvider theme={theme}>
				<Layout className="app-container">
					<AppHeader
						currentUser={currentUser}
						isAuthenticated={isAuthenticated}
						onLogout={this.handleLogout}
					/>
					<Content className="app-content">
						<div className="container">
							<Switch>
								<Route
									exact
									path="/"
									render={(props) => <ContentList isAuthenticated={isAuthenticated}
										currentUser={currentUser} {...props} />}
								/>
								<Route
									path="/login"
									component={Login}
								/>
								<Route
									path="/signup"
									component={SignUp}
								/>
								<Route
									path="/users/:username"
									render={(props) => <Profile currentUser={currentUser} {...props} />}
								/>
								<PrivateRoute
									authenticated={isAuthenticated}
									path="/content/new"
									component={NewContent}
								/>
								<Route
									component={NotFound}
								/>
							</Switch>
						</div>
					</Content>
				</Layout>
			</MuiThemeProvider>
		);
	}
}

App.propTypes = {
	accessToken: PropTypes.string.isRequired,
	currentUser: PropTypes.object.isRequired,
	getCurrentUserAction: PropTypes.func.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	logoutAction: PropTypes.func.isRequired,
	rehydrateAction: PropTypes.func.isRequired,
	setAuthenticatedAction: PropTypes.func.isRequired,
	setCurrentUserAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	accessToken: state.login.accessToken,
	currentUser: state.currentUser,
	isAuthenticated: state.currentUser.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
	getCurrentUserAction () {
		dispatch(getCurrentUserAction());
	},
	logoutAction () {
		dispatch(logoutAction());
	},
	rehydrateAction () {
		dispatch(rehydrateAction());
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
)(App));
