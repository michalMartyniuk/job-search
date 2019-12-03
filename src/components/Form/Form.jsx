import React from "react";
import {
  Paper,
  Button,
  FormControl,
  InputLabel,
  Input
} from "@material-ui/core";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  setJob,
  resetForm,
  setJobTypes,
  setCountries,
  setCities,
  setSalaryMin,
  setSalaryMax,
  setExpMin,
  setExpMax
} from "../../store/form/formActions";
import { search, getAllOffers, addJobOffer } from "../../store/app/appActions";
import Category from "./FiltersCategory";

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
`;
const Heading = styled.h2`
  fontsize: 2.2rem;
  text-align: center;
  margin-bottom: 50px;
`;
const FormInput = styled(FormControl)`
  width: 328px;
  margin-bottom: 50px;
`;
const Label = styled(InputLabel)`
  font-size: 1.5rem;
`;
const StyledInput = styled(Input)`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;
const FormContainer = styled(Paper)`
  padding: 50px;
  margin: 50px auto;
  border: 2px solid #00bcd4;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;
const Buttons = styled.div`
  display: flex;
`;
const Btn = styled(Button).attrs({
  variant: "contained"
})`
  color: white;
  background-color: #00bcd4;
  margin-top: 40px;
  margin-right: 20px;
  height: 50px;
  font-size: 1.2rem;
  &:hover {
    background-color: #008c9e;
  }
`;
function Form({
  job,
  setJob,
  resetForm,
  search,
  getAllOffers,
  jobTypes,
  setJobTypes,
  cities,
  setCities,
  countries,
  setCountries
}) {
  return (
    <FormContainer>
      <Heading>Szukaj pracy</Heading>
      <StyledForm>
        <FormInput>
          <Label>Zawód</Label>
          <StyledInput value={job} onChange={setJob} />
        </FormInput>

        <Filters>
          <Category header="Branża" names={jobTypes} set={setJobTypes} />
          <Category header="Miasta" names={cities} set={setCities} />
          <Category header="Kraje" names={countries} set={setCountries} />
        </Filters>

        <Buttons>
          <Btn onClick={resetForm}>Zresetuj formularz</Btn>
          <Btn onClick={search}>Szukaj pracy</Btn>
          <Btn onClick={getAllOffers}>Pokaż wszystkie oferty</Btn>
        </Buttons>
      </StyledForm>
    </FormContainer>
  );
}
const mapStateToProps = state => ({ ...state.form });
const mapDispatchToProps = dispatch => ({
  addJobOffer: inputs => dispatch(addJobOffer(inputs)),
  getAllOffers: () => dispatch(getAllOffers()),
  resetForm: () => dispatch(resetForm()),
  setJob: event => dispatch(setJob(event.target.value)),
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
)(Form);
