import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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
	}
});

export class SigninForm extends Component {
	state = {
		usernameOrEmail: '',
		password: ''
	};

	handleUsernameOrEmailChange = (event) => {
		this.setState({ usernameOrEmail: event.target.value });
	}

	handlePasswordChange = (event) => {
		this.setState({ password: event.target.value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		// TODO add validation
		this.props.signinAction({
			usernameOrEmail: this.state.usernameOrEmail,
			password: this.state.password
		});
	}

	render () {
		const { classes } = this.props;

		return (
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign In
				</Typography>
				<form className={classes.form} onSubmit={this.handleSubmit}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Username or Email</InputLabel>
						<Input
							id="usernameOrEmail"
							name="usernameOrEmail"
							autoComplete="signin email"
							autoFocus
							value={this.state.usernameOrEmail}
							onChange={this.handleUsernameOrEmailChange}
						/>
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input
							name="password"
							type="password"
							id="password"
							autoComplete="signin current-password"
							value={this.state.password}
							onChange={this.handlePasswordChange}
						/>
					</FormControl>
					{/* TODO add remember me with localStorage */}
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign in
					</Button>
				</form>
			</Paper>
		);
	}
}

SigninForm.propTypes = {
	classes: PropTypes.object.isRequired,
	signinAction: PropTypes.func.isRequired
};

export default withStyles(styles)(SigninForm);