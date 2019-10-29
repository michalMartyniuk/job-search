import React from 'react';
import { FormControl, Input, InputLabel, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  add_job_offer, set_job, set_job_type, set_country, set_city,
  set_salary, set_experience, search, get_all_offers,
} from '../../store/app/appActions';
import FormSelect from './FormSelect';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 50,
    margin: "50px auto",
    border: "2px solid #00bcd4"
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
    color: "white",
    backgroundColor: "#00bcd4",
    marginTop: 40,
    marginRight: 20,
    height: 50,
    fontSize: "1.2rem",
    "&:hover": {
      backgroundColor: "#008c9e"
    }
  },
  buttonAllOffers: {
    marginTop: 20,
    height: 50,
    fontSize: "1.2rem",
    color: "white",
    backgroundColor: "#00bcd4",
    "&:hover": {
      backgroundColor: "#008c9e"
    }
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

  const { experience, job, job_type, country, city,
    salary, set_job, 
    get_all_offers, search, add_job_offer } = props

  const selectsData = [
    { name: "Branża", value: props.job_type, onChange: props.set_job_type, options: ["Medycyna", "Szkolnictwo", "Informatyka", "Rolnictwo"] },
    { name: "Kraj", value: props.country, onChange: props.set_country, options: ["Polska", "Niemcy", "Francja", "Wielka Brytania", "Stany Zjednoczone"] },
    { name: "Miasto", value: props.city, onChange: props.set_city, options: ["Warszawa", "Poznań", "Kraków", "Pruszków", "Szczecinek"] },
    { name: "Zarobki", value: props.salary, onChange: props.set_salary, options: [1000, 3000, 6000, 10000, 15000, 20000] },
    { name: "Doświadczenie", value: props.experience, onChange: props.set_experience, options: [1, 2, 3, 4, 5, 10, 15, 20] },
  ]
  const handleSearchWork = () => {
    search({
      job,
      job_type,
      country,
      city,
      experience: experience,
      salary: salary,
    })
  }
  const handleSearchAll = () => {
    get_all_offers()
  }
  return (
    <Paper className={classes.paper}>
      <div className={classes.heading}>
        Szukaj pracy
      </div>
      <form className={classes.form}>
        <FormInput
          name="Zawód"
          value={job}
          onChange={set_job}
        />
        {selectsData.map(select => {
          return <FormSelect
            key={select.name}
            name={select.name}
            value={select.value}
            className={classes.formControl}
            onChange={select.onChange}
            options={select.options}
          />
        })}
        <div className={classes.buttonsContainer}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleSearchWork}
          >Szukaj pracy</Button>
        </div>
        <Button
          variant="contained"
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
  set_job_type: event => {
    dispatch(set_job_type(event.target.value))
  },
  set_country: event => {
    dispatch(set_country(event.target.value))
  },
  set_city: event => {
    dispatch(set_city(event.target.value))
  },
  set_salary: event => {
    dispatch(set_salary(event.target.value))
  },
  set_experience: event => {
    dispatch(set_experience(event.target.value))
  },
  get_all_offers: () => dispatch(get_all_offers()),
  search: values => dispatch(search(values)),
  add_job_offer: values => dispatch(add_job_offer(values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppForm)