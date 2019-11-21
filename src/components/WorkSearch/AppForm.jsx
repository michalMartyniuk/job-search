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
    margin: "50px auto",
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

const FormInput = ({ name, value, onChange, className = undefined }) => {
  const classes = useStyles();
  return (
    <FormControl className={className || classes.formControl}>
      <InputLabel className={classes.inputLabel}>{name}</InputLabel>
      <Input className={classes.input} value={value} onChange={onChange} />
    </FormControl>
  );
};

function AppForm(props) {
  const classes = useStyles({});
  const {
    job,
    jobTypes,
    countries,
    cities,
    salaryMin,
    salaryMax,
    expMin,
    expMax,
    setJob,
    getAllOffers,
    search
  } = props;

  const handleSearchWork = () => {
    search({
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
  const handleSearchAll = () => {
    getAllOffers();
  };
  const filtersStyles = {
    container: {
      display: "flex",
      // justifyContent: "center",
      width: 600,
      margin: "10px auto"
    },
    filter: {
      notActive: {
        margin: "0 10px",
        backgroundColor: "white",
        border: "1px solid black",
        "&:hover": {
          backgroundColor: "lightgreen",
          border: "1px solid lightblue"
        }
      },
      active: {
        margin: "0 10px",
        backgroundColor: "lightgreen",
        border: "1px solid lightblue",
        "&:hover": {
          backgroundColor: "lightgreen",
          border: "1px solid lightblue"
        }
      }
    }
  };
  return (
    <Paper className={classes.paper}>
      <div className={classes.heading}>Szukaj pracy</div>
      <form className={classes.form}>
        <FormInput name="Zawód" value={job} onChange={setJob} />
        <Filters
          names={props.jobTypes}
          set={props.setJobTypes}
          styles={filtersStyles}
        />
        <Filters
          names={props.cities}
          set={props.setCities}
          styles={filtersStyles}
        />
        <Filters
          names={props.countries}
          set={props.setCountries}
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
            onClick={handleSearchWork}
          >
            Szukaj pracy
          </Button>
        </div>
        <Button
          variant="contained"
          className={classes.buttonAllOffers}
          onClick={handleSearchAll}
        >
          Pokaż wszystkie oferty
        </Button>
      </form>
    </Paper>
  );
}

const mapStateToProps = state => ({ ...state.app });
const mapDispatchToProps = dispatch => ({
  resetForm: () => dispatch(resetForm()),
  setJob: event => dispatch(setJob(event.target.value)),
  setJobTypes: jobType => {
    dispatch(setJobTypes(jobType));
  },
  setCountries: country => {
    dispatch(setCountries(country));
  },
  setCities: city => {
    dispatch(setCities(city));
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
)(AppForm);
