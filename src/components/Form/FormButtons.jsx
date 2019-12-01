import React from "react";
import { Button } from "@material-ui/core";
import { formStyles } from "./formStyles";

export default function FormButtons({
  handleReset,
  handleSearch,
  handleShowAll
}) {
  const classes = formStyles();
  return (
    <div className={classes.form__buttons}>
      <Button
        variant="contained"
        className={classes.buttons__button}
        onClick={handleReset}
      >
        Zresetuj formularz
      </Button>

      <Button
        variant="contained"
        className={classes.buttons__button}
        onClick={handleSearch}
      >
        Szukaj pracy
      </Button>
      <Button
        variant="contained"
        className={classes.buttons__button_allOffers}
        onClick={handleShowAll}
      >
        Pokaż wszystkie oferty
      </Button>
    </div>
  );
}
