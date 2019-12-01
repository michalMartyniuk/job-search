import React from "react";
import clsx from "clsx";
import { Button } from "@material-ui/core";
import { formStyles } from "./formStyles";

function createFilters(names, set) {
  const filters = Object.keys(names).map(name => {
    return {
      name,
      onClick: () => {
        set(name);
      },
      state: names[name]
    };
  });
  return filters;
}

function Filter({ name, onClick, state }) {
  const classes = formStyles();
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      className={clsx(
        { [classes.category__filter]: true },
        { [classes.category__filter_active]: state }
      )}
    >
      {name}
    </Button>
  );
}
export default function Filters({ header, names, set }) {
  const filters = createFilters(names, set);
  const classes = formStyles();
  return (
    <div className={classes.filters__category}>
      <h2>{header}</h2>
      <div className={classes.category__filters}>
        {filters.map(filter => (
          <Filter
            key={filter.name}
            name={filter.name}
            onClick={filter.onClick}
            state={filter.state}
          />
        ))}
      </div>
    </div>
  );
}
