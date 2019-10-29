import React from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { set_notification } from '../store/app/appActions';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
  content: {
    fontSize: "1.3rem",
    padding: "10px 20px"
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 26,
    marginRight: 12
  },
  closeIcon: {
    fontSize: 26
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-notification"
      message={
        <span id="client-notification" className={classes.message}>
          <Icon className={classes.icon} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.closeIcon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

function Notification(props) {
  console.log(props.notification)
  const classes = useStyles();
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.notification.state}
        autoHideDuration={2000}
        onClose={() => props.set_notification(false)}
      >
        <MySnackbarContentWrapper
          onClose={() => props.set_notification(false)}
          variant={props.notification.variant}
          message={props.notification.message}
          className={classes.content}
        />
      </Snackbar>
    </div>
  );
}
const mapStateToProps = state => state.app
const mapDispatchToProps = dispatch => ({
  set_notification: state => dispatch(set_notification(state))
})
export default connect(mapStateToProps, mapDispatchToProps)(Notification)