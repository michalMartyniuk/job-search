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

function Notification(props) {
  const Icon = variantIcon[props.notification.variant] || variantIcon["success"];
  const classes = useStyles();
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.notification.state}
        autoHideDuration={4000}
        onClose={() => props.set_notification(false)}
      >
        <SnackbarContent
          className={clsx(classes[props.notification.variant], classes.content)}
          aria-describedby="client-notification"
          message={
            <span id="client-notification" className={classes.message}>
               <Icon className={classes.icon} />
               {props.notification.message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => props.set_notification(false)}
            >
              <CloseIcon className={classes.closeIcon} />
            </IconButton>,
          ]}
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