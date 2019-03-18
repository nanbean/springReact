import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewContentForm from '../NewContentForm';

import { createContentAction } from '../../actions/contentActions';

const styles = {
	root: {
		maxWidth: 520,
		margin: '0 auto',
		marginTop: 40
	}
};

class NewContent extends Component {
	state = {
		redirect: false
	};

	componentDidUpdate (prevProps) {
		const { fetching, error } = this.props;

		if (prevProps.fetching === true && fetching === false) {
			if (error.status === 200) {
				this.setState({ redirect: true });
			} else {
				// notification.error({
				// 	message: 'LCMS',
				// 	description: error.message || 'Sorry! Something went wrong. Please try again!'
				// });
			}
		}
	}

	render () {
		const { classes } = this.props;

		if (this.state.redirect) {
			return <Redirect push to="/" />;
		}
		return (
			<div className={classes.root}>
				<div className="new-content-content">
					<NewContentForm
						createContentAction={this.props.createContentAction}
					/>
				</div>
			</div>
		);
	}
}

NewContent.propTypes = {
	classes: PropTypes.object.isRequired,
	createContentAction: PropTypes.func.isRequired,
	error: PropTypes.object.isRequired,
	fetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	error: state.newContent.error,
	fetching: state.newContent.fetching
});

const mapDispatchToProps = dispatch => ({
	createContentAction (contentData) {
		dispatch(createContentAction(contentData));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(NewContent));