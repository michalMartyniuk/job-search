import React from 'react';
import { makeStyles } from '@material-ui/styles';
import MDSignUp from './MDSignUp';
import MDLogIn from './MDLogIn'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  authContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "auto",
  }
}))

function Auth(props) {
  const classes = useStyles()
  return (
    <div className={classes.authContainer}>
      {props.work_giver && props.loggedIn && <Redirect to="/addOffer" />}
      {props.work_taker && props.loggedIn && <Redirect to="/search" />}
      <MDSignUp />
      <MDLogIn />
    </div>
  )
}

const mapStateToProps = state => state.auth

export default connect(mapStateToProps)(Auth);