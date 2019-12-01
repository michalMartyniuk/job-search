import React from "react";
import { connect } from "react-redux";
import Filters from "./Filters";
import {
  setJobTypes,
  setCountries,
  setCities,
  setSalaryMin,
  setSalaryMax,
  setExpMin,
  setExpMax
} from "../../store/form/formActions";
import { formStyles } from "./formStyles";

function FormFilters({
  jobTypes,
  setJobTypes,
  cities,
  setCities,
  countries,
  setCountries
}) {
  const classes = formStyles();
  return (
    <div className={classes.form__filters}>
      <Filters header="Branża" names={jobTypes} set={setJobTypes} />
      <Filters header="Miasta" names={cities} set={setCities} />
      <Filters header="Kraje" names={countries} set={setCountries} />
    </div>
  );
}
const mapStateToProps = state => ({ ...state.form });
const mapDispatchToProps = dispatch => ({
  setJobTypes: jobType => dispatch(setJobTypes(jobType)),
  setCountries: country => dispatch(setCountries(country)),
  setCities: city => dispatch(setCities(city)),
  setSalaryMin: value => dispatch(setSalaryMin(value)),
  setSalaryMax: value => dispatch(setSalaryMax(value)),
  setExpMin: value => dispatch(setExpMin(value)),
  setExpMax: value => dispatch(setExpMax(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormFilters);
