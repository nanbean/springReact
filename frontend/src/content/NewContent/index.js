import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewContentForm from '../NewContentForm';

import { createContentAction } from '../../actions/contentActions';

import './index.css';

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
		if (this.state.redirect) {
			return <Redirect push to="/" />;
		}
		return (
			<div className="new-content-container">
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
)(NewContent);