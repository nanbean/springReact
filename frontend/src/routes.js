import React from 'react';
import PropTypes from 'prop-types';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Main from './common/Main';
import ContentList from './content/ContentList';
import NewContent from './content/NewContent';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Profile from './user/Profile';
import NotFound from './common/NotFound';
import ScrollToTop from './common/ScrollTop';
import AppHeader from './common/AppHeader';
import AppDrawer from './common/AppDrawer';
import DashboardMain from './dashboard/DashboardMain';

const styles = theme => ({
	root: {
		display: 'flex'
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		backgroundColor: theme.palette.background.default
	}
});

// eslint-disable-next-line react/display-name
function Routes ({ classes }) {
	return (
		<BrowserRouter>
			<ScrollToTop>
				<div className={classes.root}>

					<CssBaseline />
					<AppHeader />
					<AppDrawer />
					<main className={classes.content}>
						<div className={classes.appBarSpacer} />
						<Switch>
							<Route exact path="/" component={Main} />
							<Route exact path="/list" component={ContentList} />
							<Route exact path="/signin" component={Signin} />
							<Route exact path="/signup" component={Signup} />
							<Route path="/profile" component={Profile} />
							<Route path="/content/new" component={NewContent} />
							<Route path="/dashboard" component={DashboardMain} />
							<Route component={NotFound} />
						</Switch>
					</main>

				</div>
			</ScrollToTop>
		</BrowserRouter >
	);
}

Routes.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Routes);