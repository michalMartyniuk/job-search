import React from "react";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import {makeStyles} from '@material-ui/styles';


const useStyles = styles => makeStyles(styles);

function Filter({ name, onClick, state, styles }) {
  const classes = useStyles(styles)();
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      className={clsx(
        { [classes.notActive]: !state },
        { [classes.active]: state }
      )}
    >
      {name}
    </Button>
  );
}

export default Filter;
