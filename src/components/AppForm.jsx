import React, { useContext } from 'react';
import { FormControl, Input, InputLabel, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { StateContext } from '../App';
import { add_job_offer, set_job_value, set_name_value, set_location_value, set_salary_value, set_experience_value, search_for_work } from '../store/actions';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 600,
    padding: 50,
    marginRight: 100,
    border: "2px solid mediumturquoise"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
  },
  input: {
    fontSize: "1.5rem",
    marginBottom: 20
  },
  inputLabel: {
    fontSize: "1.5rem"
  },
  buttonsContainer: {
    display: "flex",
  },
  button: {
    marginTop: 40,
    marginRight: 20,
    height: 50,
    fontSize: "1.2rem",
  },

  heading: {
    textAlign: "center",
    marginBottom: 40
  }
}))

const FormInput = ({ name, value, onChange }) => {
  const classes = useStyles()
  return (
    <FormControl>
      <InputLabel className={classes.inputLabel}>{name}</InputLabel>
      <Input
        className={classes.input}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  )
}

export default function AppForm(props) {
  const [state, dispatch] = useContext(StateContext);
  const {
    job_input_value,
    location_input_value,
    experience_input_value,
    salary_input_value
  } = state;
  const classes = useStyles()

  const formHandler = event => {
    event.preventDefault()
    props.handler({
      job: job_input_value,
      location: location_input_value,
      exp: experience_input_value,
      salary: salary_input_value
    }, dispatch)
  }

  const handleJobValue = event => {
    set_job_value(event.target.value, dispatch)
  }

  const handleLocationValue = event => {
    set_location_value(event.target.value, dispatch)
  }

  const handleSalaryValue = event => {
    set_salary_value(event.target.value, dispatch)
  }

  const handleExperienceValue = event => {
    set_experience_value(event.target.value, dispatch)
  }

  const handleAddWork = () => {
    add_job_offer({
      job: job_input_value,
      location: location_input_value,
      exp: experience_input_value,
      salary: salary_input_value
    }, dispatch)
  }

  const handleSearchWork = () => {
    search_for_work({
      job: job_input_value,
      location: location_input_value,
      exp: experience_input_value,
      salary: salary_input_value
    }, dispatch)
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" className={classes.heading}>
        Search for Work or add job offer
      </Typography>
      <form className={classes.form} onSubmit={formHandler}>
        <FormInput
          name="job"
          value={job_input_value}
          onChange={handleJobValue}
        />
        <FormInput
          name="location"
          value={location_input_value}
          onChange={handleLocationValue}
        />
        <FormInput
          name="salary"
          value={salary_input_value}
          onChange={handleSalaryValue}
        />
        <FormInput
          name="experience"
          value={experience_input_value}
          onChange={handleExperienceValue}
        />
        <div className={classes.buttonsContainer}>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={handleSearchWork}
          > Search for work </Button>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={handleAddWork}
          > Add work offer </Button>
        </div>
      </form>
    </Paper>
  )
}