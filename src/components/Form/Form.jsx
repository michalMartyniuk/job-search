import React from "react";
import { Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { setJob, resetForm } from "../../store/form/formActions";
import FormFilters from "./FormFilters";
import FormInput from "./FormInput";
import FormButtons from "./FormButtons";
import { formStyles } from "./formStyles";

function Form({ job, setJob, resetForm, search, handleShowAll }) {
  const classes = formStyles();
  return (
    <Paper className={classes.paper}>
      <div className={classes.heading}>Szukaj pracy</div>
      <form className={classes.form}>
        <FormInput name="Zawód" value={job} handleChange={setJob} />
        <FormFilters />
        <FormButtons
          handleReset={resetForm}
          handleSearch={search}
          handleShowAll={handleShowAll}
        />
      </form>
    </Paper>
  );
}
const mapStateToProps = state => ({ ...state.form });
const mapDispatchToProps = dispatch => ({
  resetForm: () => dispatch(resetForm()),
  setJob: event => dispatch(setJob(event.target.value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
