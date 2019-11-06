import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { authLogOut } from "../store/auth/authActions";

const useStyles = makeStyles(() => ({
  container: {
    margin: "auto",
    marginTop: 150,
    padding: 20
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    fontSize: "1.5rem"
  },
  infoItem: {
    margin: "5px 0",
    padding: 5
  },
  infoName: {
    fontWeight: "700"
  },
  infoValue: {}
}));

function Profile(props) {
  const classes = useStyles();
  let accountType;
  if (props.user) {
    if (props.user.accountType === "employer") {
      accountType = "pracodawca";
    } else if (props.user.accountType === "employee") {
      accountType = "pracownik";
    } else {
      accountType = null;
    }
  }
  const ListItem = props => (
    <li className={classes.infoItem}>
      <span className={classes.infoName}>{props.name}</span>
      <span className={classes.infoValue}>{props.value}</span>
    </li>
  );
  const Profile = () => {
    return (
      <Paper className={classes.container}>
        <h3>
          {props.user.name} {props.user.surname}
        </h3>
        <ul className={classes.list}>
          <ListItem name="Imię: " value={props.user.name} />
          <ListItem name="Nazwisko: " value={props.user.surname} />
          <ListItem name="Email: " value={props.user.email} />
          <ListItem name="Rodzaj konta: " value={accountType} />
        </ul>
      </Paper>
    );
  };
  if (props.loggedIn && props.user) {
    return <Profile />;
  }
  return <Redirect to="/home" />;
}

const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => ({
  log_out: () => dispatch(authLogOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
