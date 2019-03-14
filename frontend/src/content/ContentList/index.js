import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Content from '../Content';
import LoadingIndicator from '../../common/LoadingIndicator';

import {
	getAllContentsAction,
	getUserCreatedContentsAction
} from '../../actions/contentActions';

import { CONTENT_LIST_SIZE } from '../../constants';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
			width: 1100,
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	},
	cardGrid: {
		padding: `${theme.spacing.unit * 8}px 0`
	}
});

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
			classes,
			contents,
			fetching,
			last
		} = this.props;

		return (
			<div className={classNames(classes.layout, classes.cardGrid)}>
				<Grid container spacing={40}>
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
							<Paper elevation={1}>
								<span>No Contents Found.</span>
							</Paper>
						) : null
					}
					{
						!fetching && !last ? (
							<div className="load-more-contents">
								<Button size="small" type="dashed" onClick={this.handleLoadMore}>Load more</Button>
							</div>) : null
					}
					{
						fetching ?
							<LoadingIndicator /> : null
					}
				</Grid>
			</div >
		);
	}
}

ContentList.propTypes = {
	classes: PropTypes.object.isRequired,
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
)(withRouter(withStyles(styles)(ContentList)));