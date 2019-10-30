import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import WorkSearch from './components/WorkSearch/WorkSearch';
import Home from './components/Home';
import AddOffer from './components/WorkSearch/AddOffer';
import Notification from './components/Notification';
import Profile from './components/Profile';
import { connect } from 'react-redux';
import firebase from './config/firebase';
import Navigation from './components/Navigation'
import MDLogin from './components/Auth/MDLogIn';
import MDSignUp from './components/Auth/MDSignUp';
import Auth from './components/Auth/Auth';
import { set_log_in, auth_log_out } from './store/auth/authActions';
import OffersTable from './components/WorkSearch/OfferTable';

const auth = firebase.auth();

const useStyles = makeStyles(theme => ({
  app: {
    display: "flex",
    flexDirection: "column",
  },
}))

function App(props) {
  const classes = useStyles();
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        props.set_log_in(auth.currentUser)
      }
    })
    return () => unsubscribe()
  }, [auth.onAuthStateChanged])
  return (
    <Router>
      <Navigation logged_in={props.loggedIn} logout={props.auth_log_out}/>
      <div className={classes.app}>
        <Notification />
        <Switch>
          <Route path="/offers"><OffersTable /></Route>
          <Route path="/search"><WorkSearch /></Route>
          <Route path="/profile"><Profile /></Route>
          <Route path="/addOffer"><AddOffer /></Route>
          <Route path="/auth"><Auth /></Route>
          <Route path="/signup"><MDSignUp /></Route>
          <Route path="/login"><MDLogin /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = state => state.auth
const mapDispatchToProps = dispatch => ({
  set_log_in: user => dispatch(set_log_in(user)),
  auth_log_out: () => dispatch(auth_log_out())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
