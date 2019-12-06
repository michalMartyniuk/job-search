import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Input_Root, Input_Label, Outlined_Input } from "./FormField";

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
      <Select
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
      </Select>
    </Input_Root>
  );
}
