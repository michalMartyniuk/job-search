import React from 'react';
import { connect } from 'react-redux';
import { auth_log_out } from '../store/auth/authActions';
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  container: {
    margin: "auto",
    marginTop: 150,
    padding: 20
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    fontSize: "1.5rem",
  },
  infoItem: {
    margin: "5px 0",
    padding: 5
  },
  infoName: {
    fontWeight: "700"
  },
  infoValue: {

  }
}))

function Profile(props) {
  const classes = useStyles()
  const ListItem = props => (
    <li className={classes.infoItem}>
      <span className={classes.infoName}>{props.name}</span>
      <span className={classes.infoValue}>{props.value}</span>
    </li>
  )
  return (
    <Paper className={classes.container}>
      {!props.loggedIn && <Redirect to="/login" />}
      <h3>{props.user.name} {props.user.surname}</h3>
      <ul className={classes.list}>
        <ListItem name="Imię: " value={props.user.name} />
        <ListItem name="Nazwisko: " value={props.user.surname} />
        <ListItem name="Email: " value={props.user.email} />
      </ul>
    </Paper>
  )
}

const mapStateToProps = state => state.auth
const mapDispatchToProps = dispatch => ({
  log_out: () => dispatch(auth_log_out())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)