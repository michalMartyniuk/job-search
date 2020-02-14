import React from "react";
import TextField from "@material-ui/core/TextField";

function MainInput({ value, onChange, label, variant }) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      label={label}
      variant={variant}
    />
  );
}

export function JobInput({ value, onChange }) {
  return (
    <MainInput
      value={value}
      onChange={onChange}
      label="Zawód"
      variant="outlined"
    />
  );
}
