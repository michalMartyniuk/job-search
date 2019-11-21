import React from "react";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  addJobOffer,
  setJob,
  setJobTypes,
  setCountries,
  setCities,
  setSalaryMin,
  setSalaryMax,
  setExpMin,
  setExpMax,
  search,
  getAllOffers,
  resetForm
} from "../../store/app/appActions";
import Filters from "../Filters/Filters";

const useStyles = makeStyles(() => ({
  paper: {
    padding: 50,
    margin: "auto",
    marginTop: 50,
    border: "2px solid #00bcd4"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center"
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
    display: "flex"
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
}));

const FormInput = ({ name, value, onChange, className }) => {
  const classes = useStyles();
  return (
    <FormControl className={className || classes.formControl}>
      <InputLabel className={classes.inputLabel}>{name}</InputLabel>
      <Input className={classes.input} value={value} onChange={onChange} />
    </FormControl>
  );
};

function AddOffer(props) {
  const classes = useStyles();
  const {
    job,
    jobTypes,
    countries,
    cities,
    salaryMin,
    salaryMax,
    expMin,
    expMax
  } = props;
  const handleAddWork = () => {
    props.addJobOffer({
      job,
      jobTypes,
      countries,
      cities,
      salaryMin,
      salaryMax,
      expMin,
      expMax
    });
  };
  const filtersStyles = {
    container: {
      display: "flex",
      justifyContent: "center",
      width: 600,
      margin: "auto"
    },
    filter: {
      notActive: {
        backgroundColor: "white",
        border: "1px solid black"
      },
      active: {
        backgroundColor: "lightgreen",
        border: "1px solid white"
      }
    }
  };
  return (
    <Paper className={classes.paper}>
      {!props.loggedIn && <Redirect to="/login" />}
      <div className={classes.heading}>Dodaj ofertę</div>
      <form className={classes.form}>
        <FormInput name="Zawód" value={props.job} onChange={props.setJob} />
        <Filters
          names={props.jobTypes}
          set={setJobTypes}
          styles={filtersStyles}
        />
        <Filters names={props.cities} set={setCities} styles={filtersStyles} />
        <Filters
          names={props.countries}
          set={setCountries}
          styles={filtersStyles}
        />
        <div className={classes.buttonsContainer}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={props.resetForm}
          >
            Zresetuj formularz
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleAddWork}
          >
            Dodaj ofertę
          </Button>
        </div>
      </form>
    </Paper>
  );
}

const mapStateToProps = state => ({ ...state.app, ...state.auth });
const mapDispatchToProps = dispatch => ({
  resetForm: () => dispatch(resetForm()),
  setJob: event => {
    dispatch(setJob(event.target.value));
  },
  setJobTypes: event => {
    dispatch(setJobTypes(event.target.value));
  },
  setCountries: event => {
    dispatch(setCountries(event.target.value));
  },
  setCities: event => {
    dispatch(setCities(event.target.value));
  },
  setSalaryMin: event => {
    dispatch(setSalaryMin(event.target.value));
  },
  setSalaryMax: event => {
    dispatch(setSalaryMax(event.target.value));
  },
  setExpMin: event => {
    dispatch(setExpMin(event.target.value));
  },
  setExpMax: event => {
    dispatch(setExpMax(event.target.value));
  },
  getAllOffers: () => dispatch(getAllOffers()),
  search: values => dispatch(search(values)),
  addJobOffer: values => dispatch(addJobOffer(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOffer);
