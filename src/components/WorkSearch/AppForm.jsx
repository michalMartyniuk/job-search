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
  setJobType,
  setCountry,
  setCity,
  setSalary,
  setExperience,
  search,
  getAllOffers,
  resetForm
} from "../../store/app/appActions";
import FormSelect from "./FormSelect";

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

const FormInput = ({ name, value, onChange, className }) => {
  const classes = useStyles();
  return (
    <FormControl className={className || classes.formControl}>
      <InputLabel className={classes.inputLabel}>{name}</InputLabel>
      <Input className={classes.input} value={value} onChange={onChange} />
    </FormControl>
  );
};

function AppForm(props) {
  const classes = useStyles();

  const {
    experience,
    job,
    jobType,
    country,
    city,
    salary,
    setJob,
    getAllOffers,
    search
  } = props;

  const selectsData = [
    {
      name: "Branża",
      value: props.jobType,
      onChange: props.setJobType,
      options: ["Medycyna", "Szkolnictwo", "Informatyka", "Rolnictwo"]
    },
    {
      name: "Kraj",
      value: props.country,
      onChange: props.setCountry,
      options: [
        "Polska",
        "Niemcy",
        "Francja",
        "Wielka Brytania",
        "Stany Zjednoczone"
      ]
    },
    {
      name: "Miasto",
      value: props.city,
      onChange: props.setCity,
      options: ["Warszawa", "Poznań", "Kraków", "Pruszków", "Szczecinek"]
    },
    {
      name: "Zarobki",
      value: props.salary,
      onChange: props.setSalary,
      options: [1000, 3000, 6000, 10000, 15000, 20000]
    },
    {
      name: "Doświadczenie",
      value: props.experience,
      onChange: props.setExperience,
      options: [1, 2, 3, 4, 5, 10, 15, 20]
    }
  ];
  const handleSearchWork = () => {
    search({
      job,
      jobType,
      country,
      city,
      experience,
      salary
    });
  };
  const handleSearchAll = () => {
    getAllOffers();
  };
  return (
    <Paper className={classes.paper}>
      <div className={classes.heading}>Szukaj pracy</div>
      <form className={classes.form}>
        <FormInput name="Zawód" value={job} onChange={setJob} />
        {selectsData.map(select => {
          return (
            <FormSelect
              key={select.name}
              name={select.name}
              value={select.value}
              className={classes.formControl}
              onChange={select.onChange}
              options={select.options}
            />
          );
        })}
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
  setJobType: event => {
    dispatch(setJobType(event.target.value));
  },
  setCountry: event => {
    dispatch(setCountry(event.target.value));
  },
  setCity: event => {
    dispatch(setCity(event.target.value));
  },
  setSalary: event => {
    dispatch(setSalary(event.target.value));
  },
  setExperience: event => {
    dispatch(setExperience(event.target.value));
  },
  getAllOffers: () => dispatch(getAllOffers()),
  search: values => dispatch(search(values)),
  addJobOffer: values => dispatch(addJobOffer(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppForm);
