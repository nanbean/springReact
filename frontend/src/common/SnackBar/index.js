import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon
};

const styles = theme => ({
	success: {
		backgroundColor: green[600]
	},
	error: {
		backgroundColor: theme.palette.error.dark
	},
	info: {
		backgroundColor: theme.palette.primary.dark
	},
	warning: {
		backgroundColor: amber[700]
	},
	icon: {
		fontSize: 20
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing.unit
	},
	message: {
		display: 'flex',
		alignItems: 'center'
	}
});

function SnackBar (props) {
	const { classes, className, open, message, variant, onClose } = props;
	const Icon = variantIcon[variant];

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left'
			}}
			open={open}
			autoHideDuration={3000}
			ContentProps={{
				'aria-describedby': 'message-id'
			}}
			message={<span id="message-id">{message}</span>}
		>
			<SnackbarContent
				className={classNames(classes[variant], className)}
				aria-describedby="client-snackbar"
				message={
					<span id="client-snackbar" className={classes.message}>
						<Icon className={classNames(classes.icon, classes.iconVariant)} />
						{message}
					</span>
				}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						className={classes.close}
						onClick={onClose}
					>
						<CloseIcon className={classes.icon} />
					</IconButton>
				]}
			/>
		</Snackbar>
	);
}

SnackBar.propTypes = {
	classes: PropTypes.object.isRequired,
	message: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
};

export default withStyles(styles)(SnackBar);