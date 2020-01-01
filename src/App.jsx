import React from "react";
import { makeStyles, StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import theme from "./theme";
import Home from "./components/Home";
import Notification from "./components/Notification";
import Profile from "./components/Profile/Profile";
import firebase from "./config/firebase";
import Navigation from "./components/Navigation";
import Auth from "./components/Auth/Auth";
import { setLogIn, authLogOut } from "./store/auth/authActions";
import { getAllOffers } from "./store/app/appActions";
import SearchForm from "./components/Form/SearchForm";
import AddForm from "./components/Form/AddOffer";
import OfferList from "./components/Offers/OfferList";
import SimilarOffers from "./components/Offers/SimilarOffers";
import EditOffer from "./components/Form/EditOffer";

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
    props.getAllOffers();
    return () => unsubscribe();
  }, [auth.onAuthStateChanged]);
  return (
    <Router>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <div className={classes.app}>
            <Navigation
              loggedIn={loggedIn}
              logout={authLogOut}
              accountType={props.user ? props.user.accountType : null}
            />
            <Notification />
            <Switch>
              <Route path="/search">
                <SearchForm />
                {props.searchResults.length ? (
                  <OfferList offers={props.searchResults} title="Oferty" />
                ) : null}
              </Route>
              <Route path="/profile">
                {props.loggedIn ? <Profile /> : <Redirect to="/" />}
              </Route>
              <Route path="/addOffer">
                <AddForm />
              </Route>
              <Route path="/similarOffers">
                <SimilarOffers />
              </Route>
              <Route path="/auth">
                {props.loggedIn ? <Redirect to="/profile" /> : <Auth />}
              </Route>
              <Route path="/edit/:id">
                <EditOffer />
              </Route>
              <Route path="/" exact>
                {props.loggedIn ? (
                  <Redirect to="/profile" />
                ) : (
                  <Home offers={props.searchResults} />
                )}
              </Route>
              <Route path="*">
                {props.loggedIn ? (
                  <Redirect to="/profile" />
                ) : (
                  <Redirect to="/" />
                )}
              </Route>
            </Switch>
          </div>
        </ThemeProvider>
      </StylesProvider>
    </Router>
  );
}

const mapStateToProps = state => ({
  ...state.auth,
  ...state.app,
  form: { ...state.form }
});
const mapDispatchToProps = dispatch => ({
  setLogIn: user => dispatch(setLogIn(user)),
  authLogOut: () => dispatch(authLogOut()),
  getAllOffers: () => dispatch(getAllOffers())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
