import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import {
	CONTENT_TITLE_MAX_LENGTH,
	CONTENT_DESCRIPTION_MAX_LENGTH,
	CONTENT_GENRE_MAX_LENGTH
} from '../../constants';

const styles = theme => ({
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit
	},
	submit: {
		marginTop: theme.spacing.unit * 3
	},
	help: {
		color: 'red'
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit
	}
});

export class NewContentForm extends Component {
	state = {
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

	handleSubmit = (event) => {
		event.preventDefault();
		const contentData = {
			title: this.state.title.text,
			description: this.state.description.text,
			genre: this.state.genre.text
		};

		this.props.createContentAction(contentData);
	}

	handleInputChange = (event, validationFun) => {
		const target = event.target;
		const inputName = target.name;
		const inputValue = target.value;

		this.setState({
			[inputName]: {
				value: inputValue,
				...validationFun(inputValue)
			}
		});
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

	handleTitleChange = (event) => {
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

	handleDescriptionChange = (event) => {
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

	handleGenreChange = (event) => {
		const value = event.target.value;
		this.setState({
			genre: {
				text: value,
				...this.validateGenre(value)
			}
		});
	}

	isFormInvalid = () => {
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
		const { classes } = this.props;

		return (
			<Paper className={classes.paper}>
				<Typography component="h1" variant="h5">
					Create Content
				</Typography>
				<form className={classes.form} onSubmit={this.handleSubmit}>
					<FormControl margin="normal" required fullWidth>
						<TextField
							id="title"
							label="title"
							value={this.state.title.text}
							onChange={this.handleTitleChange}
							className={classes.textField}
							margin="normal"
							helperText="Enter content title"
							variant="filled"
						/>
						<FormHelperText
							className={classes.help}
						>
							{this.state.title.errorMsg}
						</FormHelperText>
					</FormControl>

					<FormControl margin="normal" required fullWidth>
						<TextField
							id="description"
							label="description"
							multiline
							value={this.state.description.text}
							onChange={this.handleDescriptionChange}
							className={classes.textField}
							margin="normal"
							helperText="Enter content description"
							variant="outlined"
						/>
						<FormHelperText
							className={classes.help}
						>
							{this.state.description.errorMsg}
						</FormHelperText>
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<TextField
							id="genre"
							label="genre"
							value={this.state.genre.text}
							onChange={this.handleGenreChange}
							className={classes.textField}
							margin="normal"
							helperText="Enter content genre"
							variant="filled"
						/>
						<FormHelperText
							className={classes.help}
						>
							{this.state.genre.errorMsg}
						</FormHelperText>
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={this.isFormInvalid()}
					>
						Create Content
					</Button>
				</form>
			</Paper>
		);
	}
}

NewContentForm.propTypes = {
	classes: PropTypes.object.isRequired,
	createContentAction: PropTypes.func.isRequired
};

export default withStyles(styles)(NewContentForm);