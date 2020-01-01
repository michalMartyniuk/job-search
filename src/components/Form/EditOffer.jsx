import React from "react";
import { Paper, Button } from "@material-ui/core";
import { connect } from "react-redux";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  setJob,
  resetForm,
  setJobTypes,
  setCountries,
  setCities,
  setSalary,
  setExperience
} from "../../store/form/formActions";
import { editOffer, getOffer } from "../../store/auth/authActions";
import Category from "./FiltersCategory";
import SalarySlider from "./Slider";
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
  font-size: 1rem;
  &:hover {
    background-color: #008c9e;
  }
`;

function EditOffer({
  getOffer,
  editedOffer,
  job,
  setJob,
  resetForm,
  jobTypes,
  setJobTypes,
  cities,
  setCities,
  countries,
  setCountries,
  setSalary,
  salary,
  experience,
  setExperience,
  editOffer,
  loggedIn,
  user
}) {
  const { id } = useParams();
  React.useEffect(() => {
    getOffer(id).then(offer => {
      console.log(offer.salary)
      offer.countries.map(country => {
        setCountries(country);
      });
      offer.cities.map(city => {
        setCities(city);
      });
      offer.jobTypes.map(jobType => {
        setCities(jobType);
      });
      setJob(offer.job);
      setSalary(offer.salary);
      setExperience(offer.experience);
    });
  }, []);

  const handleEditOffer = () => {
    if (!job.trim()) return;
    const inputs = {
      id,
      job,
      jobTypes: Object.keys(jobTypes).filter(key => jobTypes[key]),
      countries: Object.keys(countries).filter(key => countries[key]),
      cities: Object.keys(cities).filter(key => cities[key]),
      experience,
      salary,
      owner: { id: user.id, displayName: user.email }
    };
    editOffer(inputs);
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
  console.log(editedOffer);
  return (
    <Root>
      {loggedIn ? null : <Redirect to="/login" />}
      <Heading>Dodaj ofertę</Heading>
      <StyledForm>
        <Category header="Branża" names={jobTypes} set={setJobTypes} />
        <FormFieldContainer>
          <FormField
            variant="outlined"
            label="Zawód"
            value={job}
            onChange={event => setJob(event.target.value)}
            styles={{
              root: {
                margin: "0px 20px 0px 0px"
              },
              label: {
                shrinkedTransform: "translate(20px, -10px) scale(1)",
                transform: "translate(60px, 22px) scale(1)"
              },
              input: {
                fontSize: "1.3rem",
                topBorderGapWidth: "58px",
                animateGapWidth: "80px",
                border: "5px solid #686c78",
                borderHover: "5px solid #686c78"
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
              label: {
                shrinkedTransform: "translate(20px, -10px) scale(1)",
                shrinkedFocusedTransform: "translate(18px, -6px) scale(1)"
              },
              input: {
                fontSize: "1.3rem",
                topBorderGapWidth: "125px",
                animateGapWidth: "145px",
                height: "62px",
                border: "5px solid #686c78",
                borderHover: "5px solid #686c78"
              }
            }}
          />
        </FormFieldContainer>
        <Filters>
          <Category header="Miasta" names={cities} set={setCities} />
          <Category header="Kraje" names={countries} set={setCountries} />
        </Filters>
        <SalarySlider
          values={salary}
          onChange={setSalary}
          name="Wynagrodzenie"
        />
        <Buttons>
          <Btn onClick={resetForm}>Zresetuj</Btn>
          <Btn onClick={handleEditOffer}>Zatwierdź</Btn>
        </Buttons>
      </StyledForm>
    </Root>
  );
}
const mapStateToProps = state => ({ ...state.form, ...state.auth });
const mapDispatchToProps = dispatch => ({
  getOffer: id => dispatch(getOffer(id)),
  editOffer: inputs => dispatch(editOffer(inputs)),
  resetForm: () => dispatch(resetForm()),
  setJob: job => dispatch(setJob(job)),
  setJobTypes: jobType => dispatch(setJobTypes(jobType)),
  setCountries: country => dispatch(setCountries(country)),
  setCities: city => dispatch(setCities(city)),
  setSalary: (event, values) => dispatch(setSalary(values)),
  setExperience: value => dispatch(setExperience(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOffer);
