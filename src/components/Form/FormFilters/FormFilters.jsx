import React from "react";
import { connect } from "react-redux";
import Filters from "../../Filters/Filters";
import { styles, filterStyles } from "./formFiltersStyles";
import {
  setJobTypes,
  setCountries,
  setCities,
  setSalaryMin,
  setSalaryMax,
  setExpMin,
  setExpMax,
} from "../../../store/actions/formActions";

function FormFilters({
  jobTypes,
  setJobTypes,
  cities,
  setCities,
  countries,
  setCountries
}) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <Filters names={jobTypes} set={setJobTypes} styles={filterStyles} />
      <Filters names={cities} set={setCities} styles={filterStyles} />
      <Filters names={countries} set={setCountries} styles={filterStyles} />
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
export default connect(mapStateToProps, mapDispatchToProps)(FormFilters);
