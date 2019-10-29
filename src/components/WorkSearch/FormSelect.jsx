import React from 'react';
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';

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
  label: {
    fontSize: "1.5rem"
  },
  input: {
    fontSize: "1.5rem"
  },
  menuItem: {
    fontSize: "1.2rem"
  }
}));

function FormSelect({ name, value, options, onChange, className }) {
  const classes = useStyles();
  return (
    <FormControl className={clsx(classes.formControl, className)}>
      <InputLabel className={classes.label}>{name}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        className={classes.input}
      >
        {options && options.map((option, index) => {
          return <MenuItem
            key={option}
            value={option}
            className={classes.menuItem}
          >{option}
          </MenuItem>
        })}
      </Select>
    </FormControl>
  );
}

export default FormSelect;