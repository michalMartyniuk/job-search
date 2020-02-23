import React from "react";
import { Paper, Button } from "@material-ui/core";
import styled from "styled-components";
import { Redirect, useParams } from "react-router-dom";
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
export default function EditFormNew({
  getOffer,
  job,
  setJob,
  resetForm,
  jobTypes,
  setJobTypes,
  cities,
  setCities,
  keySkills,
  setKeySkills,
  setSalary,
  salary,
  experience,
  setExperience,
  editOffer,
  loggedIn
}) {
  const { id } = useParams();
  React.useEffect(() => {
    getOffer(id).then(offer => {
      offer.cities.map(city => {
        setCities(city);
        return 1;
      });
      offer.jobTypes.map(jobType => {
        setCities(jobType);
        return 1;
      });
      offer.keySkills.map(keySkill => {
        setKeySkills(keySkill);
        return 1;
      });
      setJob(offer.job);
      setSalary(null, offer.salary);
      setExperience(offer.experience);
    });
  }, []);
  const handleEditOffer = () => {
    if (!job.trim()) return;
    const inputs = {
      id,
      job,
      jobTypes: Object.keys(jobTypes).filter(key => jobTypes[key]),
      cities: Object.keys(cities).filter(key => cities[key]),
      keySkills: Object.keys(keySkills).filter(key => keySkills[key]),
      experience,
      salary
    };
    editOffer(inputs);
  };
  const handleExperience = event => {
    setExperience(event.target.value);
  };
  return (
    <Root>
      {loggedIn ? null : <Redirect to="/login" />}
      <Heading>Edytuj ofertę</Heading>
      <StyledForm>
        <Category header="Branża" names={jobTypes} set={setJobTypes} />
        <FormFieldContainer>
          <JobInput
            value={job}
            onChange={event => setJob(event.target.value)}
          />
          <ExperienceSelect value={experience} onChange={handleExperience} />
        </FormFieldContainer>
        <Filters>
          <Category header="Miasta" names={cities} set={setCities} />
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
        <Buttons>
          <Btn onClick={resetForm}>Zresetuj</Btn>
          <Btn onClick={handleEditOffer}>Zatwierdź</Btn>
        </Buttons>
      </StyledForm>
    </Root>
  );
}
