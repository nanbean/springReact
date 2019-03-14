import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	heroUnit: {
		backgroundColor: theme.palette.background.paper
	},
	heroContent: {
		maxWidth: 600,
		margin: '0 auto',
		padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
	}
});

class Main extends Component {
	render () {
		const {
			classes
		} = this.props;

		return (
			<main>
				<div className={classes.heroUnit}>
					<div className={classes.heroContent}>
						<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
							LG Channel Management System
						</Typography>
						<Typography variant="h6" align="center" color="textSecondary" paragraph>
							This Revolutionay IP base television Eco System by LG.
							Service providers provides there contents easily, Viewers access contents with seamless TV experience.
						</Typography>
						<div className={classes.heroButtons}>
							<Grid container spacing={16} justify="center">
								<Grid item>
									<Button variant="contained" color="primary">
										More Information
									</Button>
								</Grid>
							</Grid>
						</div>
					</div>
				</div>
			</main>
		);
	}
}

Main.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);