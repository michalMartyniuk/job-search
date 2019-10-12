import React, { useContext } from 'react';
import { FormControl, Input, InputLabel, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { StateContext } from '../App';
import {
  add_job_offer, set_job_value, set_location_value,
  set_salary_value_min, set_salary_value_max,
  set_experience_value_min, set_experience_value_max,
  search_for_work, get_all_offers
} from '../store/actions';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 550,
    padding: 50,
    margin: "auto",
    border: "2px solid mediumturquoise"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
  },
  formControl: {
    width: 328
  },
  formControlMinMax: {
    width: 154,
    "&:nth-child(1)": {
      marginRight: 20
    }
  },
  input: {
    fontSize: "1.5rem",
    marginBottom: 20
  },
  inputsHeader: {
    fontSize: "1.4rem",
    marginBottom: "1rem"
  },
  inputLabel: {
    fontSize: "1.5rem"
  },
  salaryContainer: {
    display: "flex",
    flexDirection: "column"
  },
  salaryInputs: {
    display: "flex"
  },
  expContainer: {
    display: "flex",
    flexDirection: "column"
  },
  expInputs: {
    display: "flex"
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
  buttonAllOffers: {
    marginTop: 20,
    height: 50,
    fontSize: "1.2rem",
  },
  heading: {
    fontSize: "2.2rem",
    textAlign: "center",
    marginBottom: 40
  }
}))

const FormInput = ({ name, value, onChange, className }) => {
  const classes = useStyles()
  return (
    <FormControl className={className ? className : classes.formControl}>
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
    experience_input_value_min,
    experience_input_value_max,
    salary_input_value_min,
    salary_input_value_max
  } = state;
  const classes = useStyles()

  const formHandler = event => {
    event.preventDefault()
    props.handler({
      job: job_input_value,
      location: location_input_value,
      exp_min: experience_input_value_min,
      exp_max: experience_input_value_max,
      salary_min: salary_input_value_min,
      salary_max: salary_input_value_max
    }, dispatch)
  }

  const handleJobValue = event => {
    set_job_value(event.target.value, dispatch)
  }

  const handleLocationValue = event => {
    set_location_value(event.target.value, dispatch)
  }

  const handleSalaryValueMin = event => {
    set_salary_value_min(event.target.value, dispatch)
  }
  const handleSalaryValueMax = event => {
    set_salary_value_max(event.target.value, dispatch)
  }
  const handleExperienceValueMin = event => {
    set_experience_value_min(event.target.value, dispatch)
  }
  const handleExperienceValueMax = event => {
    set_experience_value_max(event.target.value, dispatch)
  }
  const handleAddWork = () => {
    add_job_offer({
      job: job_input_value,
      location: location_input_value,
      exp_min: experience_input_value_min,
      exp_max: experience_input_value_max,
      salary_min: salary_input_value_min,
      salary_max: salary_input_value_max
    }, dispatch)
  }

  const handleSearchWork = () => {
    search_for_work({
      job: job_input_value,
      location: location_input_value,
      exp_min: experience_input_value_min,
      exp_max: experience_input_value_max,
      salary_min: salary_input_value_min,
      salary_max: salary_input_value_max
    }, dispatch)
  }

  const handleSearchAll = () => {
    get_all_offers(dispatch)
  }

  return (
    <Paper className={classes.paper}>
      <div className={classes.heading}>
        Search for Work or add job offer
      </div>
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
        <div className={classes.salaryContainer}>
          <h4 className={classes.inputsHeader}>Salary</h4>
          <div className={classes.salaryInputs}>
            <FormInput
              name="$ min"
              className={classes.formControlMinMax}
              value={salary_input_value_min}
              onChange={handleSalaryValueMin}
            />
            <FormInput
              name="$ max"
              className={classes.formControlMinMax}
              value={salary_input_value_max}
              onChange={handleSalaryValueMax}
            />
          </div>
        </div>
        <div className={classes.expContainer}>
          <h4 className={classes.inputsHeader}>Experience</h4>
          <div className={classes.expInputs}>
            <FormInput
              name="min"
              className={classes.formControlMinMax}
              value={experience_input_value_min}
              onChange={handleExperienceValueMin}
            />
            <FormInput
              name="max"
              className={classes.formControlMinMax}
              value={experience_input_value_max}
              onChange={handleExperienceValueMax}
            />
          </div>
        </div>
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
        <Button
          variant="outlined"
          className={classes.buttonAllOffers}
          onClick={handleSearchAll}
        > Show all offers </Button>
      </form>
    </Paper >
  )
}