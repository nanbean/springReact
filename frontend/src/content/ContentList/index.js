import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'antd';

import Content from '../Content';
import LoadingIndicator from '../../common/LoadingIndicator';

import {
	getAllContentsAction,
	getUserCreatedContentsAction
} from '../../actions/contentActions';

import { CONTENT_LIST_SIZE } from '../../constants';

import './index.css';

class ContentList extends Component {
	componentDidMount () {
		this.loadContentList();
	}

	componentDidUpdate (prevProps) {
		if (prevProps.username === '' && this.props.username) {
			this.loadContentList();
		}
	}

	loadContentList = (page = 0, size = CONTENT_LIST_SIZE) => {
		const { username } = this.props;

		if (username) {
			this.props.getUserCreatedContentsAction(username, page, size);
		}
	}

	handleLoadMore = () => {
		const { page } = this.props;
		this.loadContentList(page + 1);
	}

	render () {
		const {
			contents,
			fetching,
			last
		} = this.props;

		return (
			<div className="contents-container">
				{
					contents.length > 0 && contents.map(i => {
						return <Content
							key={i.id}
							description={i.description}
							genre={i.genre}
							title={i.title} />;
					})
				}
				{
					!fetching && contents.length === 0 ? (
						<div className="no-contents-found">
							<span>No Contents Found.</span>
						</div>
					) : null
				}
				{
					!fetching && !last ? (
						<div className="load-more-contents">
							<Button type="dashed" onClick={this.handleLoadMore} disabled={fetching}>
								<Icon type="plus" /> Load more
							</Button>
						</div>) : null
				}
				{
					fetching ?
						<LoadingIndicator /> : null
				}
			</div>
		);
	}
}

ContentList.propTypes = {
	contents: PropTypes.array.isRequired,
	fetching: PropTypes.bool.isRequired,
	getAllContentsAction: PropTypes.func.isRequired,
	getUserCreatedContentsAction: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	last: PropTypes.bool.isRequired,
	page: PropTypes.number.isRequired,
	size: PropTypes.number.isRequired,
	type: PropTypes.string,
	username: PropTypes.string
};

const mapStateToProps = state => ({
	contents: state.contents.contents,
	fetching: state.contents.fetching,
	last: state.contents.last,
	page: state.contents.page,
	size: state.contents.size,
	username: state.currentUser.username
});

const mapDispatchToProps = dispatch => ({
	getAllContentsAction (page, size) {
		dispatch(getAllContentsAction(page, size));
	},
	getUserCreatedContentsAction (username, page, size) {
		dispatch(getUserCreatedContentsAction(username, page, size));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ContentList));