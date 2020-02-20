import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import OfferList from "./Offers/OfferList";
import Search from "./Search/Search";
import IventList from "./Offers/IventList";

const useStyles = makeStyles({
  homeContainer: {
    display: "flex",
    width: 1200,
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    marginBottom: "50px",
    padding: 50,
    border: "2px solid mediumturquoise"
  },
  header: {
    textAlign: "center"
  },
  button: {
    backgroundColor: "#00bcd4",
    color: "white",
    fontSize: "1.2rem",
    margin: 20,
    padding: 20,
    "&:hover": {
      backgroundColor: "#008c9e"
    }
  }
});
const Container = styled.div`
  background-color: inherit;
  margin-top: 70px;
`;
const OffersAndEventsContainer = styled.div`
  display: flex;
  // margin-left: 50px;
`;
const OffersContainer = styled.div`
  display: flex;
`;
const EventsContainer = styled.div`
  display: flex;
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 550px;
  margin-top: 30px;
`;
const resultsNotification = num => {
  let offer = "";
  let ivent = "";
  if (num >= 2 && num <= 4) {
    offer = "oferty";
    ivent = "wydarzenia";
  } else if (num === 1) {
    offer = "ofertę";
    ivent = "wydarzenie";
  } else {
    offer = "ofert";
    ivent = "wydarzeń";
  }
  return { offer, ivent };
};

function Home({ offers, ivents, searchResults, searchIventResults }) {
  const classes = useStyles();

  const displayOffers = offers.length ? (
    <OfferList offers={offers} title="Aktualne oferty" width="100vw" />
  ) : null;

  const displaySearchResults = searchResults.length ? (
    <OfferList
      offers={searchResults}
      title={`Znaleziono ${searchResults.length} ${
        resultsNotification(searchResults.length).offer
      } `}
      width="100vw"
    />
  ) : null;
  const displayIvents = ivents.length ? (
    <IventList ivents={ivents} title="Aktualne wydarzenia" width="100vw" />
  ) : null;

  const displayIventsSearchResults = searchIventResults.length ? (
    <IventList
      ivents={searchIventResults}
      title={`Znaleziono ${searchIventResults.length} ${
        resultsNotification(searchIventResults.length).ivent
      } `}
      width="100vw"
    />
  ) : null;

  return (
    <Container>
      <Paper className={classes.homeContainer}>
        <h1 className={classes.header}>Wyszukiwarka pracy</h1>
        <ButtonsContainer>
          <Link to="/auth/employee">
            <Button variant="contained" className={classes.button}>
              Strefa użytkownika
            </Button>
          </Link>
          <Link to="/auth/employer">
            <Button variant="contained" className={classes.button}>
              Strefa klienta
            </Button>
          </Link>
        </ButtonsContainer>
        <Search />
      </Paper>
      <OffersAndEventsContainer>
        <EventsContainer>
          {displayIventsSearchResults || displayIvents}
        </EventsContainer>
        <OffersContainer>
          {displaySearchResults || displayOffers}
        </OffersContainer>
      </OffersAndEventsContainer>
    </Container>
  );
}

const mapStateToProps = state => ({ ...state.auth, ...state.app });
export default connect(mapStateToProps, null)(Home);
