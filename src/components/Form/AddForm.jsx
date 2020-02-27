import React from "react";
import TextField from "@material-ui/core/TextField";
import { Paper, Button } from "@material-ui/core";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { JobInput } from "./Input";
import { ExperienceSelect } from "./Select";
import Category from "./FiltersCategory";
import SalarySlider from "./Slider";

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
const Description = styled(TextField)`
  margin-top: 20px;
`;
export default function AddFormNew({
  job,
  setJob,
  resetForm,
  jobTypes,
  setJobTypes,
  cities,
  setCities,
  setKeySkills,
  keySkills,
  setSalary,
  salary,
  experience,
  setExperience,
  addOffer,
  description,
  setDescription,
  loggedIn
}) {
  React.useEffect(() => {
    resetForm();
  }, []);
  const handleAddOffer = () => {
    if (!job.trim()) return;
    const inputs = {
      job,
      jobTypes: Object.keys(jobTypes).filter(key => jobTypes[key]),
      cities: Object.keys(cities).filter(key => cities[key]),
      keySkills: Object.keys(keySkills).filter(key => keySkills[key]),
      experience,
      salary,
      description
    };
    addOffer(inputs);
  };
  const handleExperience = event => {
    setExperience(event.target.value);
  };
  const handleDescription = event => {
    setDescription(event.target.value);
  };
  return (
    <Root>
      {loggedIn ? null : <Redirect to="/login" />}
      <Heading>Dodaj ofertę</Heading>
      <StyledForm>
        <Category title="Branża" names={jobTypes} set={setJobTypes} />
        <FormFieldContainer>
          <JobInput
            value={job}
            onChange={event => setJob(event.target.value)}
          />
          <ExperienceSelect value={experience} onChange={handleExperience} />
        </FormFieldContainer>
        <Filters>
          <Category title="Miasta" names={cities} set={setCities} />
          <Category
            title="Kluczowe umiejętności"
            names={keySkills}
            set={setKeySkills}
          />
        </Filters>
        <SalarySlider
          values={salary}
          onChange={setSalary}
          name="Wynagrodzenie"
        />
        <Description
          id="outlined-multiline-static"
          label="Opis"
          multiline
          rows="7"
          defaultValue=""
          onChange={handleDescription}
          variant="outlined"
        />
        <Buttons>
          <Btn onClick={resetForm}>Zresetuj</Btn>
          <Btn onClick={handleAddOffer}>Dodaj ofertę</Btn>
        </Buttons>
      </StyledForm>
    </Root>
  );
}
