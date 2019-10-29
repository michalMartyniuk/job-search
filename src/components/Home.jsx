import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { set_work_giver, set_work_taker } from '../store/auth/authActions';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  homeContainer: {
    display: "flex",
    margin: "auto",
    marginTop: 250,
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
}))

function Home(props) {
  const classes = useStyles()

  return (
    <Paper className={classes.homeContainer}>
      {props.work_giver && props.loggedIn && <Redirect to="/addOffer" />}
      {props.work_taker && props.loggedIn && <Redirect to="/search" />}
      <div>
        <h1 className={classes.header}>Wyszukiwarka pracy</h1>
        <Link to="/auth">
          <Button
            variant="contained"
            className={classes.button}
            onClick={props.set_work_taker}
          >
            Szukam pracy
          </Button>
        </Link>
        <Link to="/auth">
          <Button
            variant="contained"
            className={classes.button}
            onClick={props.set_work_giver}
          >Jestem pracodawcą</Button>
        </Link>
      </div>
    </Paper>
  )
}

const mapStateToProps = state => state.auth
const mapDispatchToProps = dispatch => ({
  set_work_taker: () => dispatch(set_work_taker()),
  set_work_giver: () => dispatch(set_work_giver())
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);