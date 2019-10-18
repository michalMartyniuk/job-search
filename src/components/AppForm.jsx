import React from 'react';
import { FormControl, Input, InputLabel, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  add_job_offer, set_job, set_country, set_city,
  set_salary_min, set_salary_max,
  set_exp_min, set_exp_max,
  search, get_all_offers, select_job_type, 
  select_country, select_city,
  select_exp_min, select_exp_max,
  select_salary_min, select_salary_max
} from '../store/app/appActions';
import FormSelect from './FormSelect';
import { connect } from 'react-redux';

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

function AppForm(props) {
  const classes = useStyles()

  const { exp_value_min, exp_value_max, job_value, country, city_value,
    salary_value_min, salary_value_max, set_job, set_country,
    set_salary_min, set_salary_max, set_exp_min, set_exp_max, get_all_offers,
    search, add_job_offer } = props

  const handleAddWork = () => {
    add_job_offer({
      job: job_value,
      location: country,
      city: city_value,
      exp_min: exp_value_min,
      exp_max: exp_value_max,
      salary_min: salary_value_min,
      salary_max: salary_value_max
    })
  }
  const handleSearchWork = () => {
    search({
      job: job_value,
      location: country,
      city: city_value,
      exp_min: exp_value_min,
      exp_max: exp_value_max,
      salary_min: salary_value_min,
      salary_max: salary_value_max
    })
  }
  const handleSearchAll = () => {
    get_all_offers()
  }
  return (
    <Paper className={classes.paper}>
      <div className={classes.heading}>
        Szukaj pracy albo dodaj ofertę
      </div>
      <form className={classes.form}>
        <FormSelect
          name="Branża"
          value={props.job_type}
          onChange={props.select_job_type}
          options={["one", "two", "three"]}
        />
        <FormInput
          name="Zawód"
          value={job_value}
          onChange={set_job}
        />
        <FormInput
          name="Kraj"
          value={country}
          onChange={set_country}
        />
        <FormInput
          name="Miasto"
          value={city_value}
          onChange={set_city}
        />
        <div className={classes.salaryContainer}>
          <h4 className={classes.inputsHeader}>Zarobki</h4>
          <div className={classes.salaryInputs}>
            <FormInput
              name="$ min"
              className={classes.formControlMinMax}
              value={salary_value_min}
              onChange={set_salary_min}
            />
            <FormInput
              name="$ max"
              className={classes.formControlMinMax}
              value={salary_value_max}
              onChange={set_salary_max}
            />
          </div>
        </div>
        <div className={classes.expContainer}>
          <h4 className={classes.inputsHeader}>Doświadczenie</h4>
          <div className={classes.expInputs}>
            <FormInput
              name="min"
              className={classes.formControlMinMax}
              value={exp_value_min}
              onChange={set_exp_min}
            />
            <FormInput
              name="max"
              className={classes.formControlMinMax}
              value={exp_value_max}
              onChange={set_exp_max}
            />
          </div>
        </div>
        <div className={classes.buttonsContainer}>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={handleSearchWork}
          >Szukaj pracy</Button>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={handleAddWork}
          >Dodaj ofertę</Button>
        </div>
        <Button
          variant="outlined"
          className={classes.buttonAllOffers}
          onClick={handleSearchAll}
        >Pokaż wszystkie oferty</Button>
      </form>
    </Paper >
  )
}

const mapStateToProps = (state) => ({ ...state.app })
const mapDispatchToProps = (dispatch) => ({
  set_job: event => dispatch(set_job(event.target.value)),
  set_country: event => dispatch(set_country(event.target.value)),
  set_city: event => dispatch(set_city(event.target.value)),
  set_salary_min: event => dispatch(set_salary_min(event.target.value)),
  set_salary_max: event => dispatch(set_salary_max(event.target.value)),
  set_exp_min: event => dispatch(set_exp_min(event.target.value)),
  set_exp_max: event => dispatch(set_exp_max(event.target.value)),
  get_all_offers: () => dispatch(get_all_offers()),
  search: values => dispatch(search(values)),
  add_job_offer: values => dispatch(add_job_offer(values)),
  select_job_type: event => dispatch(select_job_type(event.target.value)),
  select_country: event => dispatch(select_country(event.target.value)),
  select_city: event => dispatch(select_city(event.target.value)),
  select_exp_min: event => dispatch(select_exp_min(event.target.value)),
  select_exp_max: event => dispatch(select_exp_max(event.target.value)),
  select_salary_min: event => dispatch(select_salary_min(event.target.value)),
  select_salary_max: event => dispatch(select_salary_max(event.target.value))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppForm)