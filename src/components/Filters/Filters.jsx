import React from "react";
import Filter from "./Filter";
import { filtersStyles } from "./filtersStyles";

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

export default function Filters({ names, set }) {
  const filters = createFilters(names, set);
  const classes = filtersStyles();
  return (
    <div className={classes.container}>
      {filters.map(filter => (
        <Filter
          key={filter.name}
          name={filter.name}
          onClick={filter.onClick}
          state={filter.state}
        />
      ))}
    </div>
  );
}
