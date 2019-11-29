import React from "react";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { filterStyles } from "./filtersStyles";

function Filter({ name, onClick, state }) {
  const classes = filterStyles();
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      className={clsx({ [classes.filter]: true }, { [classes.active]: state })}
    >
      {name}
    </Button>
  );
}

export default Filter;
