import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
	root: {
		maxWidth: 520,
		margin: '0 auto',
		marginTop: 40
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
	},
	heroUnit: {
		backgroundColor: theme.palette.background.paper
	},
	heroContent: {
		maxWidth: 600,
		margin: '0 auto',
		padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
	},
	link: {
		textDecoration: 'none',
		color: 'inherit'
	}
});

const NotFound = ({ classes }) => {
	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<div className={classes.heroUnit}>
					<div className={classes.heroContent}>
						<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
							404
						</Typography>
						<Typography variant="h6" align="center" color="textSecondary" paragraph>
							{'The Page you\'re looking for was not found.'}
						</Typography>
						<div className={classes.heroButtons}>
							<Grid container spacing={16} justify="center">
								<Grid item>
									<Link to="/" className={classes.link}>
										<Button variant="contained" color="secondary">Go Back</Button>
									</Link>
								</Grid>
							</Grid>
						</div>
					</div>
				</div>
			</Paper>
		</div>
	);
};

NotFound.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotFound);