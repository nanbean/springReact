import React from 'react';
import PropTypes from 'prop-types';
import {
	Route,
	Redirect
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			authenticated ? (
				<Component {...rest} {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/signin',
						state: { from: props.location }
					}}
				/>
			)
		}
	/>
);

PrivateRoute.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired,
	location: PropTypes.object
};

export default PrivateRoute;