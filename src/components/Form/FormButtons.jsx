import React from "react";
import { Button } from "@material-ui/core";
import { buttonStyles } from "./formStyles";

export default function FormButtons({
  handleReset,
  handleSearch,
  handleShowAll
}) {
  const classes = buttonStyles();
  return (
    <div className={classes.buttonsContainer}>
      <Button
        variant="contained"
        className={classes.button}
        onClick={handleReset}
      >
        Zresetuj formularz
      </Button>

      <Button
        variant="contained"
        className={classes.button}
        onClick={handleSearch}
      >
        Szukaj pracy
      </Button>
      <Button
        variant="contained"
        className={classes.buttonAllOffers}
        onClick={handleShowAll}
      >
        Pokaż wszystkie oferty
      </Button>
    </div>
  );
}
