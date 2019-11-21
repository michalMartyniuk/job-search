/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React from "react";
import FiltersContainer from "./FiltersContainer";

function createFilters(names: any, set: Function) {
  const filters = Object.keys(names).map(name => {
    return {
      name,
      onClick: () => {
        console.log(name, names[name])
        set(name)
      },
      state: names[name]
    };
  });
  return filters;
}

function Filters({ names, set, styles }: FilterProps): JSX.Element {
  const filters = createFilters(names, set);
  return (
    <div>
      <FiltersContainer filters={filters} styles={styles} />
    </div>
  );
}

interface FilterProps {
  names: any;
  set: Function;
  styles: object;
}
export default Filters;
