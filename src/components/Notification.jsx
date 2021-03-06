import React from "react";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setNotification } from "../store/app/appActions";

const useStyles = makeStyles(theme => ({
  content: {
    fontSize: "1.3rem",
    padding: "10px 20px"
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 26,
    marginRight: 12
  },
  closeIcon: {
    fontSize: 26
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

function Notification(props) {
  // eslint-disable-next-line dot-notation
  const classes = useStyles();
  const MessageContent = () => {
    return (
      <span id="client-notification" className={classes.message}>
        {props.notification.message}
      </span>
    );
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={props.notification && props.notification.state}
        autoHideDuration={4000}
        onClose={() => props.setNotification(false)}
      >
        <SnackbarContent
          className={clsx(classes[props.notification.variant], classes.content)}
          aria-describedby="client-notification"
          message={<MessageContent />}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => props.setNotification(false)}
            >
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          ]}
        />
      </Snackbar>
    </div>
  );
}
const mapStateToProps = state => state.app;
const mapDispatchToProps = dispatch => ({
  setNotification: state => dispatch(setNotification(state))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
