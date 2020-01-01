import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button, Paper } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import styled from 'styled-components';
import OfferList from "./Offers/OfferList";
import Search from "./Search/Search";

const useStyles = makeStyles({
  homeContainer: {
    display: "flex",
    margin: "auto",
    marginBottom: "50px",
    padding: 50,
    justifyContent: "center",
    border: "2px solid mediumturquoise"
  },
  header: {
    textAlign: "center",
    marginBottom: "4rem"
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
function Home(props) {
  const classes = useStyles();
  return (
    <Container>
      <Paper className={classes.homeContainer}>
        <div>
          <h1 className={classes.header}>Wyszukiwarka pracy</h1>
          <Search />
          <Link to="/auth/employee">
            <Button variant="contained" className={classes.button}>
              Szukam pracy
            </Button>
          </Link>
          <Link to="/auth/employer">
            <Button variant="contained" className={classes.button}>
              Jestem pracodawcą
            </Button>
          </Link>
        </div>
      </Paper>
      {props.offers.length ? (
        <OfferList offers={props.offers} title="Aktualne oferty" />
      ) : null}
    </Container>
  );
}

const mapStateToProps = state => state.auth;
export default connect(mapStateToProps)(Home);
