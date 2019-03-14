import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
	heroUnit: {
		backgroundColor: theme.palette.background.paper
	},
	heroContent: {
		maxWidth: 600,
		margin: '0 auto',
		padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
	},
	avatar: {
		margin: 10,
		width: 100,
		height: 100,
		fontSize: '3rem'
	}
});

class Profile extends Component {
	render () {
		const { classes, name } = this.props;

		return (
			<div>
				{
					name ? (
						<main>
							<div className={classes.heroUnit}>
								<div className={classes.heroContent}>
									<Grid container justify="center" alignItems="center">
										<Avatar className={classes.avatar}>{name[0].toUpperCase()}</Avatar>
										<Typography variant="h4" gutterBottom>{name}</Typography>
									</Grid>
								</div>
							</div>
						</main>
					) : null
				}
			</div>
		);
	}
}

Profile.propTypes = {
	classes: PropTypes.object.isRequired,
	match: PropTypes.shape({
		params: PropTypes.object.isRequired
	}).isRequired,
	name: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	name: state.currentUser.name
});

export default connect(
	mapStateToProps
)(withStyles(styles)(Profile));