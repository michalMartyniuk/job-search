import React from "react";
import { Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { setJob, resetForm } from "../../store/form/formActions";
import { getAllOffers, addJobOffer } from "../../store/app/appActions";
import FormFilters from "./FormFilters";
import FormInput from "./FormInput";
import FormButtons from "./FormButtons";
import { formStyles } from "./formStyles";

function Form({ job, setJob, resetForm, search, getAllOffers }) {
  const classes = formStyles();
  return (
    <Paper className={classes.form}>
      <div className={classes.form__heading}>Szukaj pracy</div>
      <form className={classes.form__form}>
        <FormInput name="Zawód" value={job} handleChange={setJob} />
        <FormFilters />
        <FormButtons
          handleReset={resetForm}
          handleSearch={search}
          handleShowAll={getAllOffers}
        />
      </form>
    </Paper>
  );
}
const mapStateToProps = state => ({ ...state.form });
const mapDispatchToProps = dispatch => ({
  addJobOffer: inputs => dispatch(addJobOffer(inputs)),
  getAllOffers: () => dispatch(getAllOffers()),
  resetForm: () => dispatch(resetForm()),
  setJob: event => dispatch(setJob(event.target.value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
