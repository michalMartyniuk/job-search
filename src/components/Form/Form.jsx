import React from "react";
import { Paper, Button } from "@material-ui/core";
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
  setExperience
} from "../../store/form/formActions";
import { search, getAllOffers, addJobOffer } from "../../store/app/appActions";
import Category from "./FiltersCategory";
import DiscreteSlider from "./Slider";
import FormField from "./FormField";
import FormSelect from "./Select";

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
`;
const Heading = styled.h2`
  fontsize: 2.2rem;
  text-align: center;
  margin-bottom: 70px;
`;
const Root = styled(Paper)`
  padding: 50px;
  margin: 50px auto;
  border: 2px solid #00bcd4;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: auto;
`;
const FormFieldContainer = styled.div`
  display: flex;
  // border: 2px solid black;
  margin-bottom: 30px;
`;
const StyledForm = styled.form`
  width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
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
  setCountries,
  salaryMin,
  salaryMax,
  experience,
  setExperience
}) {
  const handleSearch = () => {
    const inputs = {
      job,
      jobTypes: Object.keys(jobTypes).map(key => key),
      countries: Object.keys(countries).map(key => key),
      cities: Object.keys(cities).map(key => key),
      experience,
      salary: [salaryMin, salaryMax]
    };
    search(inputs);
  };
  const handleExperience = event => {
    setExperience(event.target.value);
  };
  const expSelectItems = [
    { name: "1 rok", value: 1 },
    { name: "2 lata", value: 2 },
    { name: "3 lata", value: 3 },
    { name: "4 lata", value: 4 },
    { name: "5 lat", value: 5 },
    { name: "6 lat", value: 6 },
    { name: "7 lat", value: 7 },
    { name: "8 lat", value: 8 },
    { name: "9 lat", value: 9 },
    { name: "10 lat", value: 10 }
  ];
  return (
    <Root>
      <Heading>Szukaj pracy</Heading>
      <StyledForm>
        <FormFieldContainer>
          <FormField
            variant="outlined"
            label="Zawód"
            value={job}
            onChange={setJob}
            styles={{
              root: {
                margin: "0px 20px 0px 0px"
              },
              input: {
                fontSize: "1.3rem",
                topBorderGapWidth: "58px"
              }
            }}
          />
          <FormSelect
            name="Doświadczenie"
            margin="0px"
            width="200px"
            value={experience}
            onChange={handleExperience}
            items={expSelectItems}
            topBorderGapWidth="118px"
            styles={{
              root: {
                width: "200px",
                margin: "0px"
              },
              input: {
                fontSize: "1.3rem",
                topBorderGapWidth: "118px",
                animateGapWidth: "90px",
                height: "62px"
              }
            }}
          />
        </FormFieldContainer>
        <Filters>
          <Category header="Branża" names={jobTypes} set={setJobTypes} />
          <Category header="Miasta" names={cities} set={setCities} />
          <Category header="Kraje" names={countries} set={setCountries} />
        </Filters>
        <DiscreteSlider />
        <Buttons>
          <Btn onClick={resetForm}>Zresetuj formularz</Btn>
          <Btn onClick={handleSearch}>Szukaj pracy</Btn>
          <Btn onClick={getAllOffers}>Pokaż wszystkie oferty</Btn>
        </Buttons>
      </StyledForm>
    </Root>
  );
}
const mapStateToProps = state => ({ ...state.form });
const mapDispatchToProps = dispatch => ({
  search: inputs => dispatch(search(inputs)),
  addJobOffer: inputs => dispatch(addJobOffer(inputs)),
  getAllOffers: () => dispatch(getAllOffers()),
  resetForm: () => dispatch(resetForm()),
  setJob: event => dispatch(setJob(event.target.value)),
  setJobTypes: jobType => dispatch(setJobTypes(jobType)),
  setCountries: country => dispatch(setCountries(country)),
  setCities: city => dispatch(setCities(city)),
  setSalaryMin: value => dispatch(setSalaryMin(value)),
  setSalaryMax: value => dispatch(setSalaryMax(value)),
  setExperience: value => dispatch(setExperience(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
