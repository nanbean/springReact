import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';

import {
	NAME_MIN_LENGTH, NAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
	EMAIL_MAX_LENGTH,
	PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH,
	API_BASE_URL
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
	}
});

export class SignupForm extends Component {
	state = {
		name: {
			value: ''
		},
		username: {
			value: ''
		},
		email: {
			value: ''
		},
		password: {
			value: ''
		}
	};

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

	handleSubmit = (event) => {
		event.preventDefault();

		const signupRequest = {
			name: this.state.name.value,
			email: this.state.email.value,
			username: this.state.username.value,
			password: this.state.password.value
		};

		this.props.signupAction(signupRequest);
	}

	isFormInvalid = () => {
		return !(this.state.name.validateStatus === 'success' &&
			this.state.username.validateStatus === 'success' &&
			this.state.email.validateStatus === 'success' &&
			this.state.password.validateStatus === 'success'
		);
	}

	// Validation Functions
	validateName = (name) => {
		if (name.length < NAME_MIN_LENGTH) {
			return {
				validateStatus: 'error',
				errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
			};
		} else if (name.length > NAME_MAX_LENGTH) {
			return {
				validationStatus: 'error',
				errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
			};
		} else {
			return {
				validateStatus: 'success',
				errorMsg: null
			};
		}
	}

	validateEmail = (email) => {
		if (!email) {
			return {
				validateStatus: 'error',
				errorMsg: 'Email may not be empty'
			};
		}

		const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
		if (!EMAIL_REGEX.test(email)) {
			return {
				validateStatus: 'error',
				errorMsg: 'Email not valid'
			};
		}

		if (email.length > EMAIL_MAX_LENGTH) {
			return {
				validateStatus: 'error',
				errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
			};
		}

		return {
			validateStatus: null,
			errorMsg: null
		};
	}

	validateUsername = (username) => {
		if (username.length < USERNAME_MIN_LENGTH) {
			return {
				validateStatus: 'error',
				errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
			};
		} else if (username.length > USERNAME_MAX_LENGTH) {
			return {
				validationStatus: 'error',
				errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
			};
		} else {
			return {
				validateStatus: null,
				errorMsg: null
			};
		}
	}

	validateUsernameAvailability = () => {
		const usernameValue = this.state.username.value;
		const usernameValidation = this.validateUsername(usernameValue);
		const apiUrl = API_BASE_URL + '/user/checkUsernameAvailability?username=' + usernameValue;

		if (usernameValidation.validateStatus === 'error') {
			this.setState({
				username: {
					value: usernameValue,
					...usernameValidation
				}
			});
			return;
		}

		this.setState({
			username: {
				value: usernameValue,
				validateStatus: 'validating',
				errorMsg: null
			}
		});

		fetch(apiUrl, {
			method: 'GET',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
			.then(res => res.json())
			.then(body => {
				if (body.available) {
					this.setState({
						username: {
							value: usernameValue,
							validateStatus: 'success',
							errorMsg: null
						}
					});
				} else {
					this.setState({
						username: {
							value: usernameValue,
							validateStatus: 'error',
							errorMsg: 'This username is already taken'
						}
					});
				}
			})
			.catch(() => {
				// Marking validateStatus as success, Form will be recchecked at server
				this.setState({
					username: {
						value: usernameValue,
						validateStatus: 'success',
						errorMsg: null
					}
				});
			});
	}

	validateEmailAvailability = () => {
		const emailValue = this.state.email.value;
		const emailValidation = this.validateEmail(emailValue);
		const apiUrl = API_BASE_URL + '/user/checkEmailAvailability?email=' + emailValue;

		if (emailValidation.validateStatus === 'error') {
			this.setState({
				email: {
					value: emailValue,
					...emailValidation
				}
			});
			return;
		}

		this.setState({
			email: {
				value: emailValue,
				validateStatus: 'validating',
				errorMsg: null
			}
		});

		fetch(apiUrl, {
			method: 'GET',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
			.then(res => res.json())
			.then(body => {
				if (body.available) {
					this.setState({
						email: {
							value: emailValue,
							validateStatus: 'success',
							errorMsg: null
						}
					});
				} else {
					this.setState({
						email: {
							value: emailValue,
							validateStatus: 'error',
							errorMsg: 'This Email is already registered'
						}
					});
				}
			})
			.catch(() => {
				// Marking validateStatus as success, Form will be recchecked at server
				this.setState({
					email: {
						value: emailValue,
						validateStatus: 'success',
						errorMsg: null
					}
				});
			});
	}

	validatePassword = (password) => {
		if (password.length < PASSWORD_MIN_LENGTH) {
			return {
				validateStatus: 'error',
				errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
			};
		} else if (password.length > PASSWORD_MAX_LENGTH) {
			return {
				validationStatus: 'error',
				errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
			};
		} else {
			return {
				validateStatus: 'success',
				errorMsg: null
			};
		}
	}

	render () {
		const { classes } = this.props;

		return (
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<PersonOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign In
				</Typography>
				<form className={classes.form} onSubmit={this.handleSubmit}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="name">Full Name</InputLabel>
						<Input
							id="name"
							name="name"
							autoComplete="off"
							autoFocus
							placeholder="Your full name"
							value={this.state.name.value}
							onChange={(event) => this.handleInputChange(event, this.validateName)}
						/>
						<FormHelperText
							className={classes.help}
						>
							{this.state.name.errorMsg}
						</FormHelperText>
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="id">Username</InputLabel>
						<Input
							id="username"
							name="username"
							autoComplete="off"
							placeholder="A unique username"
							value={this.state.username.value}
							onBlur={this.validateUsernameAvailability}
							onChange={(event) => this.handleInputChange(event, this.validateUsername)}
						/>
						<FormHelperText
							className={classes.help}
						>
							{this.state.username.errorMsg}
						</FormHelperText>
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email</InputLabel>
						<Input
							id="email"
							name="email"
							type="email"
							autoComplete="off"
							placeholder="Your email"
							value={this.state.email.value}
							onBlur={this.validateEmailAvailability}
							onChange={(event) => this.handleInputChange(event, this.validateEmail)}
						/>
						<FormHelperText
							className={classes.help}
						>
							{this.state.email.errorMsg}
						</FormHelperText>
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input
							id="password"
							name="password"
							autoComplete="off"
							placeholder="A password between 6 to 20 characters"
							value={this.state.password.value}
							onChange={(event) => this.handleInputChange(event, this.validatePassword)}
						/>
						<FormHelperText
							className={classes.help}
						>
							{this.state.password.errorMsg}
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
						Sign up
					</Button>
				</form>
			</Paper>
		);
	}
}

SignupForm.propTypes = {
	classes: PropTypes.object.isRequired,
	signupAction: PropTypes.func.isRequired
};

export default withStyles(styles)(SignupForm);