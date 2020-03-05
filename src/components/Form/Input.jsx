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
export function PlaceInput({ value, onChange, ...props }) {
  return (
    <MainInput
      value={value}
      onChange={onChange}
      label="Ilość miejsc"
      variant="outlined"
      className={props.className}
      {...props}
    />
  );
}
export function MinSalaryInput({ value, onChange, ...props }) {
  return (
    <MainInput
      value={value}
      onChange={onChange}
      label="Wynagrodzenie"
      variant="outlined"
      className={props.className}
      {...props}
    />
  );
}
export function ProcessLengthInput({ value, onChange, ...props }) {
  return (
    <MainInput
      value={value}
      onChange={onChange}
      label="Długość procesu rekrutacji"
      variant="outlined"
      className={props.className}
      {...props}
    />
  );
}