import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";

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
const Category = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const Header = styled.h2`
  background-color: #686c78;
  color: white;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
  padding: 10px 20px;
`;
const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #e9e9e9;
  padding: 20px;
`;
const Filter = styled(({ className, name, onClick }) => (
  <Button variant="outlined" onClick={onClick} className={className}>
    {name}
  </Button>
))`
  margin: 7px 0;
  margin-right: 20px;
  background-color: ${props => (props.state ? "#9cf29c" : "white")};
  border: 1px solid #686c78;
  font-size: 0.9rem;
  letter-spacing: 0.08rem;
  &:hover {
    color: white;
    background-color: #686c78;
  }
  &:focus {
    outline: none;
  }
`;
export default function FiltersCategory({ header, names, set }) {
  const filters = createFilters(names, set);
  return (
    <Category>
      <Header>{header}</Header>
      <Filters>
        {filters.map(filter => (
          <Filter
            key={filter.name}
            name={filter.name}
            onClick={filter.onClick}
            state={filter.state}
          />
        ))}
      </Filters>
    </Category>
  );
}
