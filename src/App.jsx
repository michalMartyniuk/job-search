import React from "react";
import { makeStyles } from "@material-ui/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import WorkSearch from "./components/WorkSearch/WorkSearch";
import Home from "./components/Home";
import AddOffer from "./components/WorkSearch/AddOffer";
import Notification from "./components/Notification";
import Profile from "./components/Profile";
import firebase from "./config/firebase";
import Navigation from "./components/Navigation";
import MDLogin from "./components/Auth/MDLogIn";
import MDSignUp from "./components/Auth/MDSignUp";
import Auth from "./components/Auth/Auth";
import { setLogIn, authLogOut } from "./store/auth/authActions";

const auth = firebase.auth();

const useStyles = makeStyles(() => ({
  app: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f2f2f2"
  }
}));

function App(props) {
  const { setLogIn, loggedIn, authLogOut } = props;
  const classes = useStyles();
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        setLogIn(auth.currentUser);
      }
    });
    return () => unsubscribe();
  }, [auth.onAuthStateChanged]);
  return (
    <Router>
      <div className={classes.app}>
        <Navigation
          loggedIn={loggedIn}
          logout={authLogOut}
          accountType={props.user ? props.user.accountType : null}
        />
        <Notification />
        <Switch>
          <Route path="/search">
            <WorkSearch />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/addOffer">
            <AddOffer />
          </Route>
          <Route path="/auth/employer">
            <Auth />
          </Route>
          <Route path="/auth/employee">
            <Auth />
          </Route>
          <Route path="/signup">
            <MDSignUp />
          </Route>
          <Route path="/login">
            <MDLogin />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => ({
  setLogIn: user => dispatch(setLogIn(user)),
  authLogOut: () => dispatch(authLogOut())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

App.propTypes = {
  setLogIn: PropTypes.func,
  loggedIn: PropTypes.bool,
  authLogOut: PropTypes.func
};
