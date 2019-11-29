/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React from "react";
import FiltersContainer from "./FiltersContainer";

function createFilters(names, set) {
  const filters = Object.keys(names).map(name => {
    return {
      name,
      onClick: () => {
        set(name)
      },
      state: names[name]
    };
  });
  return filters;
}

function Filters({ names, set, styles }) {
  const filters = createFilters(names, set);
  return (
    <div>
      <FiltersContainer filters={filters} styles={styles} />
    </div>
  );
}

export default Filters;
