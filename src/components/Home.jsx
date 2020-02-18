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
`;
function Home(props) {
  const classes = useStyles();
  return (
    <Container>
      <Paper className={classes.homeContainer}>
        <h1 className={classes.header}>Wyszukiwarka pracy</h1>
        <Search />
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
      </Paper>
      <OffersAndEventsContainer>
        <EventsContainer>
          {props.ivents.length ? (
            <IventList ivents={props.ivents} title="Aktualne wydarzenia" />
          ) : null}
        </EventsContainer>
        <OffersContainer>
          {props.offers.length ? (
            <OfferList offers={props.offers} title="Aktualne oferty" />
          ) : null}
        </OffersContainer>
      </OffersAndEventsContainer>
    </Container>
  );
}

const mapStateToProps = state => state.auth;
export default connect(mapStateToProps)(Home);
