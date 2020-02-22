import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    height: "auto"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: "#2c334d"
  },
  link: {
    "&:focus": {
      outline: "none"
    }
  },
  button: {
    backgroundColor: "#2479a3",
    color: "white",
    fontSize: "1rem",
    height: "50px",
    margin: "0 5px",
    padding: 10,
    outline: 0,
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#008c9e"
    },
    "&:focus": {
      outline: "none"
    }
  }
}));

export default function Navigation({ loggedIn, logout, accountType }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Wyszukiwarka pracy
          </Typography>
          {!loggedIn && (
            <Link to="/home" className={classes.link}>
              <Button className={classes.button}>Strona główna</Button>
            </Link>
          )}
          {loggedIn && accountType === "employee" && (
            <Link to="/search" className={classes.link}>
              <Button className={classes.button}>Szukaj pracy</Button>
            </Link>
          )}
          {loggedIn && accountType === "employee" && (
            <Link to="/searchForIvent" className={classes.link}>
              <Button className={classes.button}>Szukaj szkolenia</Button>
            </Link>
          )}
          {loggedIn && accountType === "employer" && (
            <Link to="/similarOffers" className={classes.link}>
              <Button className={classes.button}>Znajdź kandydata</Button>
            </Link>
          )}
          {loggedIn && accountType === "employer" && (
            <Link to="/addOffer" className={classes.link}>
              <Button className={classes.button}>Dodaj ofertę pracy</Button>
            </Link>
          )}
          {loggedIn && accountType === "employer" && (
            <Link to="/addTraining" className={classes.link}>
              <Button className={classes.button}>Dodaj szkolenie</Button>
            </Link>
          )}
          {loggedIn && accountType === "employer" && (
            <Link to="/addEvent" className={classes.link}>
              <Button className={classes.button}>Dodaj wydarzenie</Button>
            </Link>
          )}
          {loggedIn && (
            <Link to="/profile" className={classes.link}>
              <Button className={classes.button}>Profil</Button>
            </Link>
          )}
          {loggedIn && (
            <Button className={classes.button} onClick={logout}>
              Wylogowanie
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
