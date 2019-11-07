import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AppForm from "./AppForm";
import OfferList from "../Offers/OfferList";
import { getAllOffers } from "../../store/app/appActions";

const useStyles = makeStyles(() => ({
  workSearchkContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f2f2f2"
  }
}));

function WorkSearch(props) {
  const classes = useStyles();
  const { searchResults } = props;

  return (
    <div className={classes.workSearchkContainer}>
      {!props.loggedIn && <Redirect to="/login" />}
      <AppForm />
      {searchResults.length ? (
        <OfferList title="Oferty pracy" offers={searchResults} />
      ) : null}
    </div>
  );
}

const mapStateToProps = state => ({ ...state.app, ...state.auth });

const mapDispatchToProps = dispatch => ({
  getAllOffers: () => dispatch(getAllOffers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkSearch);
