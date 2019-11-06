/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import {
  setExperience,
  setSalary,
  setCountry,
  setCity,
  setJobType
} from "../../store/app/appActions";

const useStyles = makeStyles(theme => ({
  selectContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 15
  },
  button: {
    marginTop: 40,
    marginRight: 20,
    height: 50,
    fontSize: "1.2rem"
  }
}));
function Filters() {
  return <div />;
}
const mapStateToProps = state => ({ ...state.app });
const mapDispatchToProps = dispatch => ({
  selectJobType: event => {
    dispatch(selectJobType(event.target.value));
    dispatch(setJobType(event.target.value));
  },
  selectCountry: event => {
    dispatch(selectCountry(event.target.value));
    dispatch(setCountry(event.target.value));
  },
  selectCity: event => {
    dispatch(selectCity(event.target.value));
    dispatch(setCity(event.target.value));
  },
  selectExperience: event => {
    dispatch(selectExperience(event.target.value));
    dispatch(setExperience(event.target.value));
  },
  selectSalary: event => {
    dispatch(selectSalary(event.target.value));
    dispatch(setSalary(event.target.value));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
