import React from "react";
import { Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { setJob, resetForm } from "../../store/actions/formActions";
import FormFilters from "./FormFilters/FormFilters";
import FormInput from "./FormInput/FormInput";
import FormButtons from "./FormButtons/FormButtons";
import { styles } from "./formStyles";

function Form(props) {
  const classes = styles();
  return (
    <Paper className={classes.paper}>
      <div className={classes.heading}>Szukaj pracy</div>
      <form className={classes.form}>
        <FormInput name="Zawód" value={props.job} handleChange={props.setJob} />
        <FormFilters />
        <FormButtons
          handleReset={props.resetForm}
          handleSearch={props.search}
          handleShowAll={props.handleShowAll}
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

export default connect(mapStateToProps, mapDispatchToProps)(Form);
