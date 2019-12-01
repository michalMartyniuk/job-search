import React from "react";
import { FormControl, InputLabel, Input } from "@material-ui/core";
import { formStyles } from "./formStyles";

export default function FormInput({ name, value, handleChange }) {
  const classes = formStyles();
  return (
    <FormControl className={classes.form__input}>
      <InputLabel className={classes.input__label}>{name}</InputLabel>
      <Input
        className={classes.input__input}
        value={value}
        onChange={handleChange}
      />
    </FormControl>
  );
}
