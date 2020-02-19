import React from "react";
import { connect } from "react-redux";
import {
  setJob,
  resetForm,
  setJobTypes,
  setCities,
  setKeySkills,
  setSalary,
  setExperience
} from "../../store/form/formActions";
import {
  search,
  setOffers,
  searchIvent,
  getAllIvents
} from "../../store/app/appActions";
import {
  editOffer,
  getOffer,
  addOffer,
  addIvent
} from "../../store/auth/authActions";
import AddForm from "./AddForm";
import AddTraining from "./AddTraining";
import AddEvent from "./AddEvent";
import EditForm from "./EditForm";
import SearchForm from "./SearchForm";
import SearchForIvent from "./SearchForIvent";

function Form({ formType, ...props }) {
  React.useEffect(() => {
    resetForm();
  }, []);

  return (
    <>
      {formType === "add" && <AddForm {...props} />}
      {formType === "addTraining" && <AddTraining {...props} />}
      {formType === "addEvent" && <AddEvent {...props} />}
      {formType === "edit" && <EditForm {...props} />}
      {formType === "search" && <SearchForm {...props} />}
      {formType === "searchForIvent" && <SearchForIvent {...props} />}
    </>
  );
}
const mapStateToProps = state => ({
  ...state.form,
  ...state.auth,
  ...state.app
});
const mapDispatchToProps = dispatch => ({
  search: inputs => dispatch(search(inputs)),
  searchIvent: inputs => dispatch(searchIvent(inputs)),
  setOffers: () => dispatch(setOffers()),
  getAllIvents: () => dispatch(getAllIvents()),
  getOffer: id => dispatch(getOffer(id)),
  editOffer: inputs => dispatch(editOffer(inputs)),
  addOffer: inputs => dispatch(addOffer(inputs)),
  addIvent: inputs => dispatch(addIvent(inputs)),
  resetForm: () => dispatch(resetForm()),
  setJob: job => dispatch(setJob(job)),
  setJobTypes: jobType => dispatch(setJobTypes(jobType)),
  setCities: city => dispatch(setCities(city)),
  setKeySkills: skill => dispatch(setKeySkills(skill)),
  setSalary: (event, values) => dispatch(setSalary(values)),
  setExperience: value => dispatch(setExperience(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
