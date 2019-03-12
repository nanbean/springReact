import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Form, Input, Button, notification } from 'antd';

import { createContentAction } from '../../actions/contentActions';

import {
	CONTENT_TITLE_MAX_LENGTH,
	CONTENT_DESCRIPTION_MAX_LENGTH,
	CONTENT_GENRE_MAX_LENGTH
} from '../../constants';

import './index.css';

const FormItem = Form.Item;
const { TextArea } = Input;

class NewContent extends Component {
	constructor (props) {
		super(props);
		this.state = {
			title: {
				text: ''
			},
			description: {
				text: ''
			},
			genre: {
				text: ''
			}
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleGenreChange = this.handleGenreChange.bind(this);
		this.isFormInvalid = this.isFormInvalid.bind(this);
	}

	componentDidUpdate (prevProps) {
		const { fetching, error } = this.props;

		if (prevProps.fetching === true && fetching === false) {
			if (error.status === 200) {
				this.setState({ redirect: true });
			} else {
				notification.error({
					message: 'LCMS',
					description: error.message || 'Sorry! Something went wrong. Please try again!'
				});
			}
		}
	}

	handleSubmit (event) {
		event.preventDefault();
		const contentData = {
			title: this.state.title.text,
			description: this.state.description.text,
			genre: this.state.genre.text
		};

		this.props.createContentAction(contentData);
	}

	validateTitle = (titleText) => {
		if (titleText.length === 0) {
			return {
				validateStatus: 'error',
				errorMsg: 'Please enter your title!'
			};
		} else if (titleText.length > CONTENT_TITLE_MAX_LENGTH) {
			return {
				validateStatus: 'error',
				errorMsg: `Title is too long (Maximum ${CONTENT_TITLE_MAX_LENGTH} characters allowed)`
			};
		} else {
			return {
				validateStatus: 'success',
				errorMsg: null
			};
		}
	}

	handleTitleChange (event) {
		const value = event.target.value;
		this.setState({
			title: {
				text: value,
				...this.validateTitle(value)
			}
		});
	}

	validateDescription = (descriptionText) => {
		if (descriptionText.length === 0) {
			return {
				validateStatus: 'error',
				errorMsg: 'Please enter your description!'
			};
		} else if (descriptionText.length > CONTENT_DESCRIPTION_MAX_LENGTH) {
			return {
				validateStatus: 'error',
				errorMsg: `Description is too long (Maximum ${CONTENT_DESCRIPTION_MAX_LENGTH} characters allowed)`
			};
		} else {
			return {
				validateStatus: 'success',
				errorMsg: null
			};
		}
	}

	handleDescriptionChange (event) {
		const value = event.target.value;
		this.setState({
			description: {
				text: value,
				...this.validateDescription(value)
			}
		});
	}

	validateGenre = (genreText) => {
		if (genreText.length === 0) {
			return {
				validateStatus: 'error',
				errorMsg: 'Please enter your genre!'
			};
		} else if (genreText.length > CONTENT_GENRE_MAX_LENGTH) {
			return {
				validateStatus: 'error',
				errorMsg: `Genre is too long (Maximum ${CONTENT_GENRE_MAX_LENGTH} characters allowed)`
			};
		} else {
			return {
				validateStatus: 'success',
				errorMsg: null
			};
		}
	}

	handleGenreChange (event) {
		const value = event.target.value;
		this.setState({
			genre: {
				text: value,
				...this.validateGenre(value)
			}
		});
	}

	isFormInvalid () {
		if (this.state.title.validateStatus !== 'success') {
			return true;
		}

		if (this.state.description.validateStatus !== 'success') {
			return true;
		}

		if (this.state.genre.validateStatus !== 'success') {
			return true;
		}
	}

	render () {
		if (this.state.redirect) {
			return <Redirect push to="/" />;
		}
		return (
			<div className="new-content-container">
				<h1 className="page-title">Create Content</h1>
				<div className="new-content-content">
					<Form onSubmit={this.handleSubmit} className="create-content-form">
						<FormItem
							validateStatus={this.state.title.validateStatus}
							help={this.state.title.errorMsg} className="content-form-row"
						>
							<TextArea
								placeholder="Enter content title"
								style={{ fontSize: '16px' }}
								autosize={{ minRows: 3, maxRows: 6 }}
								name="title"
								value={this.state.title.text}
								onChange={this.handleTitleChange}
							/>
						</FormItem>
						<FormItem
							validateStatus={this.state.description.validateStatus}
							help={this.state.description.errorMsg} className="content-form-row">
							<TextArea
								placeholder="Enter content description"
								style={{ fontSize: '16px' }}
								autosize={{ minRows: 3, maxRows: 6 }}
								name="description"
								value={this.state.description.text}
								onChange={this.handleDescriptionChange}
							/>
						</FormItem>
						<FormItem
							validateStatus={this.state.genre.validateStatus}
							help={this.state.genre.errorMsg} className="content-form-row">
							<TextArea
								placeholder="Enter content genre"
								style={{ fontSize: '16px' }}
								autosize={{ minRows: 3, maxRows: 6 }}
								name="genre"
								value={this.state.genre.text}
								onChange={this.handleGenreChange}
							/>
						</FormItem>
						<FormItem className="content-form-row">
							<Button type="primary"
								htmlType="submit"
								size="large"
								disabled={this.isFormInvalid()}
								className="create-content-form-button">Create Content</Button>
						</FormItem>
					</Form>
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