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

const useStyles = makeStyles(theme => ({
  app: {
    display: "flex",
    flexDirection: "column",
  },
}))

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.app}>
        <Notification />
        <Switch>
          <Route path="/search"><WorkSearch /></Route>
          <Route path="/addOffer"><AddOffer /></Route>
          <Route path="/auth"><Auth /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
