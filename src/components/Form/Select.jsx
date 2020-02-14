import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 170
  }
}));

function MainSelect({ label, value, onChange, items, labelWidth }) {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        id="demo-simple-select-outlined-label"
        value={value}
        onChange={onChange}
        labelWidth={labelWidth}
      >
        {items.map(item => {
          return (
            <MenuItem key={item.name} value={item.value}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export function ExperienceSelect({ value, onChange }) {
  return (
    <MainSelect
      label="Doświadczenie"
      labelWidth={120}
      value={value}
      onChange={onChange}
      items={[
        { value: 1, name: "Rok" },
        { value: 2, name: "2 lata" },
        { value: 3, name: "3 lata" },
        { value: 4, name: "4 lata" },
        { value: 5, name: "5 lat" },
        { value: 6, name: "6 lat" },
        { value: 7, name: "7 lat" },
        { value: 8, name: "8 lat" },
        { value: 9, name: "9 lat" },
        { value: 10, name: "10 lat" }
      ]}
    />
  );
}
