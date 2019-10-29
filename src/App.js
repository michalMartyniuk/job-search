import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Auth from './components/Auth/Auth';
import WorkSearch from './components/WorkSearch/WorkSearch';
import Home from './components/Home';
import AddOffer from './components/WorkSearch/AddOffer';
import Notification from './components/Notification';
import Profile from './components/Profile';
import { connect } from 'react-redux';
import firebase from './config/firebase';
import Navigation from './components/Navigation'

const auth = firebase.auth();

const useStyles = makeStyles(theme => ({
  app: {
    display: "flex",
    flexDirection: "column",
  },
}))

function App(props) {
  const classes = useStyles();
  return (
    <Router>
      <Navigation />
      <div className={classes.app}>
        <Notification />
        <Switch>
          <Route path="/search"><WorkSearch /></Route>
          <Route path="/profile"><Profile /></Route>
          <Route path="/addOffer"><AddOffer /></Route>
          <Route path="/auth"><Auth /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = state => state.auth
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(App);
