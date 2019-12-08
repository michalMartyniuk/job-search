import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import styled from "styled-components";
import { Input_Root, Input_Label, Outlined_Input } from "./FormField";

const StyledSelect = styled(props => (
  <Select
    classes={{
      select: "select"
    }}
    {...props}
  >
    {props.children}
  </Select>
))`
  & .select:focus {
    background-color: white;
  }
`;
export default function FormSelect({
  name,
  items,
  value,
  onChange,
  styles = { root: {}, label: {}, input: {} }
}) {
  return (
    <Input_Root {...styles.root}>
      <Input_Label {...styles.label}>{name}</Input_Label>
      <StyledSelect
        value={value}
        onChange={onChange}
        input={<Outlined_Input {...styles.input} />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {items &&
          items.map(item => {
            return <MenuItem value={item.value}>{item.name}</MenuItem>;
          })}
      </StyledSelect>
    </Input_Root>
  );
}
