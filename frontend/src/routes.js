import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
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

// eslint-disable-next-line react/display-name
export default props => (
	<BrowserRouter>
		<ScrollToTop>
			<CssBaseline />
			<AppHeader />
			<Switch>
				<Route exact path="/" component={Main} />
				<Route exact path="/list" component={ContentList} />
				<Route exact path="/signin" component={Signin} />
				<Route exact path="/signup" component={Signup} />
				<Route path="/profile" component={Profile} />
				<Route path="/content/new" component={NewContent} />
				<Route component={NotFound} />
			</Switch>
		</ScrollToTop>
	</BrowserRouter>
);