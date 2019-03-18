import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Routes from './routes';

import LoadingIndicator from './common/LoadingIndicator';

import { MuiThemeProvider } from '@material-ui/core/styles';

import { rehydrateAction } from './actions/rehydrateActions';

import {
	getCurrentUserAction
} from './actions/userActions';

import theme from './theme';

import './App.css';

class App extends Component {
	componentDidMount () {
		const { accessToken } = this.props;

		this.props.rehydrateAction();
		if (accessToken) {
			this.props.getCurrentUserAction();
		}
	}

	render () {
		const { accessToken, username } = this.props;

		if (accessToken && !username) {
			return (
				<LoadingIndicator />
			);
		}
		return (
			<MuiThemeProvider theme={theme}>
				<Routes />
			</MuiThemeProvider>
		);
	}
}

App.propTypes = {
	accessToken: PropTypes.string.isRequired,
	getCurrentUserAction: PropTypes.func.isRequired,
	rehydrateAction: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	accessToken: state.signin.accessToken,
	username: state.currentUser.username
});

const mapDispatchToProps = dispatch => ({
	getCurrentUserAction () {
		dispatch(getCurrentUserAction());
	},
	rehydrateAction () {
		dispatch(rehydrateAction());
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
