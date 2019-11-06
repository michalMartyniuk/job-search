import React from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import MDSignUp from "./MDSignUp";
import MDLogIn from "./MDLogIn";

const useStyles = makeStyles(() => ({
  authContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "auto"
  }
}));

function Auth() {
  const classes = useStyles();
  return (
    <div className={classes.authContainer}>
      <MDSignUp />
      <MDLogIn />
    </div>
  );
}

const mapStateToProps = state => state.auth;

export default connect(mapStateToProps)(Auth);
