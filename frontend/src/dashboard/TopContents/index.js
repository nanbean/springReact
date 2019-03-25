import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
	root: {
		width: '100%',
		overflowX: 'auto'
	},
	table: {
		minWidth: 700
	}
};

let id = 0;
function createData (name, genre, views, runningTime, userRate) {
	id += 1;
	return { id, name, genre, views, runningTime, userRate };
}

const data = [
	createData('Frozen', 'Fantasy', 5324, '1h 20m', 4.0),
	createData('The Incredibles', 'Action', 4354, '1h 30m', 4.3),
	createData('Pororo', 'Kids', 4312, '30m', 6.0),
	createData('Ironman', 'Action', 3985, '2h 10m', 4.3),
	createData('The Shawshank Redemption', 'Movie', 2378, '3h', 3.9)
];

function TopContents (props) {
	const { classes } = props;

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Ranking</TableCell>
						<TableCell align="center">Title</TableCell>
						<TableCell align="center">Genre</TableCell>
						<TableCell align="right">Views</TableCell>
						<TableCell align="right">Running Time</TableCell>
						<TableCell align="right">User Rate</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map(n => (
						<TableRow key={n.id}>
							<TableCell component="th" scope="row">
								{n.id}
							</TableCell>
							<TableCell align="center">
								{n.name}
							</TableCell>
							<TableCell align="center">{n.genre}</TableCell>
							<TableCell align="right">{n.views}</TableCell>
							<TableCell align="right">{n.runningTime}</TableCell>
							<TableCell align="right">{n.userRate}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
}

TopContents.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopContents);