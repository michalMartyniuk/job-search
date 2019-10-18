import React from 'react';
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: 16,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 32,
  },
}));

export default function FormSelect({ name, value, options, onChange }) {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{name}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
      >
        {options && options.map(option => {
          return <MenuItem key={option} value={option}>{option}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
}