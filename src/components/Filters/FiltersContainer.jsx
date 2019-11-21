import React from "react";
import { makeStyles } from "@material-ui/styles";
import Filter from "./Filter";

const defaultStyles = {
  container: {},
  filter: {
    notActive: {},
    active: {}
  }
};
const useStyles = styles => makeStyles(styles);

const FiltersContainer = ({ filters, styles }) => {
  // styles = styles || defaultStyles;
  const classes = useStyles(styles)({});
  return (
    <div className={classes.container}>
      {filters.map(filter => (
        <Filter
          key={filter.name}
          name={filter.name}
          onClick={filter.onClick}
          state={filter.state}
          styles={styles.filter}
        />
      ))}
    </div>
  );
};

export default FiltersContainer;
