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
import {
  setLogIn,
  authLogOut,
  applyToOffer,
  applyToIvent,
  saveOffer,
  saveIvent
} from "./store/auth/authActions";
import { setOffers, setIvents } from "./store/app/appActions";
import Form from "./components/Form/Form";
import OfferList from "./components/Offers/OfferList";
import IventList from "./components/Offers/IventList";
import SimilarOffers from "./components/Offers/SimilarOffers";

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
    props.setOffers();
    props.setIvents();
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
                <Form formType="search" />
                {props.offers.length ? (
                  <OfferList
                    offers={props.offers}
                    title="Oferty"
                    apply={props.apply}
                    save={props.save}
                  />
                ) : null}
              </Route>
              <Route path="/searchForIvent">
                <Form formType="searchForIvent" />
                {props.ivents.length ? (
                  <IventList
                    ivents={props.ivents}
                    title="Wydarzenia"
                    apply={props.applyToIvent}
                    save={props.saveIvent}
                  />
                ) : null}
              </Route>
              <Route path="/profile">
                {props.loggedIn ? <Profile /> : <Redirect to="/" />}
              </Route>
              <Route path="/addOffer">
                <Form formType="add" />
              </Route>
              <Route path="/addTraining">
                <Form formType="addTraining" />
              </Route>
              <Route path="/addEvent">
                <Form formType="addEvent" />
              </Route>
              <Route path="/similarOffers">
                {props.loggedIn ? <SimilarOffers /> : <Redirect to="/" />}
              </Route>
              <Route path="/auth">
                {props.loggedIn ? <Redirect to="/profile" /> : <Auth />}
              </Route>
              <Route path="/edit/:id">
                <Form formType="edit" />
              </Route>
              <Route path="/" exact>
                {props.loggedIn ? <Redirect to="/profile" /> : <Home />}
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
  setOffers: () => dispatch(setOffers()),
  setIvents: () => dispatch(setIvents()),

  apply: offerId => dispatch(applyToOffer(offerId)),
  save: offerId => dispatch(saveOffer(offerId)),

  applyToIvent: iventId => dispatch(applyToIvent(iventId)),
  saveIvent: iventId => dispatch(saveIvent(iventId))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
