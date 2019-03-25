import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ViewLineChart from '../ViewLineChart';
import TopContents from '../TopContents';

const styles = {
	root: {

	},
	chartContainer: {
		marginLeft: -22
	},
	tableContainer: {
		height: 320
	}
};

function DashboardMain ({ classes }) {
	return (
		<div>
			<Typography variant="h4" gutterBottom component="h2">
				Views
			</Typography>
			<Typography component="div" className={classes.chartContainer}>
				<ViewLineChart />
			</Typography>
			<Typography variant="h4" gutterBottom component="h2">
				Top Contensts
			</Typography>
			<div className={classes.tableContainer}>
				<TopContents />
			</div>
		</div>
	);

}

DashboardMain.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashboardMain);