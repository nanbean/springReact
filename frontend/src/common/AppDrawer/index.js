import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import {
	withRouter,
	Link
} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListIcon from '@material-ui/icons/List';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import SettingsIcon from '@material-ui/icons/Settings';

import {
	DRAWER_WIDTH
} from '../../constants';

const styles = theme => ({
	drawerOpen: {
		width: DRAWER_WIDTH,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		[theme.breakpoints.down('lg')]: {
			width: 0
		},
		[theme.breakpoints.up('lg')]: {
			width: theme.spacing.unit * 7 + 1
		}
	},
	link: {
		textDecoration: 'none',
		color: 'inherit'
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	}
});

const routes = [
	{
		path: '/dashboard',
		label: 'Dashboard',
		icon: <DashboardIcon />
	},
	{
		path: '/list',
		label: 'List',
		icon: <ListIcon />
	},
	{
		path: '/content/new',
		label: 'New',
		icon: <FiberNewIcon />
	}
];

const etcRoutes = [
	{
		path: '/setting',
		label: 'Setting',
		icon: <SettingsIcon />
	}
];

class AppDrawer extends React.Component {
	state = {
		open: false
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	render () {
		const { classes, drawerOpen, location } = this.props;

		return (
			<Drawer
				variant="permanent"
				className={classNames(classes.drawer, {
					[classes.drawerOpen]: drawerOpen,
					[classes.drawerClose]: !drawerOpen
				})}
				classes={{
					paper: classNames({
						[classes.drawerOpen]: drawerOpen,
						[classes.drawerClose]: !drawerOpen
					})
				}}
				open={drawerOpen}
			>
				<div className={classes.toolbar}>
				</div>
				<Divider />
				<List>
					{routes.map(item => (
						<Link key={item.label} to={item.path} className={classes.link}>
							<ListItem
								button
								selected={item.path === location.pathname}
							>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.label} />
							</ListItem>
						</Link>
					))}
				</List>
				<Divider />
				<List>
					{etcRoutes.map(item => (
						<Link key={item.label} to={item.path} className={classes.link}>
							<ListItem
								button
								selected={item.path === location.pathname}
							>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.label} />
							</ListItem>
						</Link>
					))}
				</List>
			</Drawer>
		);
	}
}

AppDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	drawerOpen: PropTypes.bool.isRequired,
	location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	drawerOpen: state.ui.drawerOpen
});

export default withRouter(connect(
	mapStateToProps,
	null
)(withStyles(styles)(AppDrawer)));