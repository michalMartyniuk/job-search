import React from 'react';
import { FormControl, InputLabel, Input } from "@material-ui/core";
import { styles } from "./formInputStyles";

export default function FormInput({ name, value, handleChange }) {
  const classes = styles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.inputLabel}>{name}</InputLabel>
      <Input className={classes.input} value={value} onChange={handleChange} />
    </FormControl>
  );
}
