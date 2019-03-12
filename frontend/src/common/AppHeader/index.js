import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Link,
	withRouter
} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import './index.css';

const Header = Layout.Header;

class AppHeader extends Component {
	handleMenuClick = ({ key }) => {
		if (key === '/logOut') {
			this.props.onLogout();
		}
	}

	render () {
		const {
			currentUser,
			isAuthenticated,
			location
		} = this.props;
		let menuItems;

		if (isAuthenticated) {
			menuItems = [
				<Menu.Item key="/">
					<Link to="/">
						<Icon type="home" />
					</Link>
				</Menu.Item>,
				<Menu.Item key="/content/new">
					<Link to="/content/new">
						<Icon type="video-camera" className="nav-icon" />
					</Link>
				</Menu.Item>,
				<Menu.Item key="/profile">
					<Link to={`/users/${currentUser.username}`}>
						<Icon type="user" className="nav-icon" />
					</Link>
				</Menu.Item>,
				<Menu.Item key="/logOut">
					<Icon type="poweroff" className="nav-icon" />
				</Menu.Item>
			];
		} else {
			menuItems = [
				<Menu.Item key="/login">
					<Link to="/login">Login</Link>
				</Menu.Item>,
				<Menu.Item key="/signup">
					<Link to="/signup">Signup</Link>
				</Menu.Item>
			];
		}

		return (
			<Header className="app-header">
				<div className="container">
					<div className="app-title" >
						<Link to="/">LCMS</Link>
					</div>
					<Menu
						className="app-menu"
						mode="horizontal"
						selectedKeys={[location.pathname]}
						onClick={this.handleMenuClick}
						style={{ lineHeight: '64px' }} >
						{menuItems}
					</Menu>
				</div>
			</Header>
		);
	}
}

AppHeader.propTypes = {
	currentUser: PropTypes.shape({
		username: PropTypes.string.isRequired
	}).isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	location: PropTypes.object.isRequired,
	onLogout: PropTypes.func.isRequired
};

export default withRouter(AppHeader);