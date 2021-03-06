import React from "react";
import { Paper, Button } from "@material-ui/core";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { JobInput } from "./Input";
import Category from "./FiltersCategory";
import Search from "../Search/Search";

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
export default function SearchForIvent({
  job,
  setJob,
  resetForm,
  searchIvent,
  jobTypes,
  setJobTypes,
  cities,
  setCities,
  keySkills,
  setKeySkills,
  loggedIn,
  setOffers,
  setIvents
}) {
  const handleSearch = () => {
    const inputs = {
      job,
      jobTypes: Object.keys(jobTypes).filter(key => jobTypes[key]),
      cities: Object.keys(cities).filter(key => cities[key]),
      keySkills: Object.keys(keySkills).filter(key => keySkills[key]),
    };
    searchIvent(inputs);
  };
  const handleShowAll = () => {
    setOffers();
    setIvents();
  };
  return (
    <Root>
      {loggedIn ? null : <Redirect to="/login" />}
      <Heading>Szukaj szkolenia</Heading>
      <Search searchType="events" />
      <StyledForm>
        <Category title="Branża" names={jobTypes} set={setJobTypes} />
        <FormFieldContainer>
          <JobInput
            value={job}
            onChange={event => setJob(event.target.value)}
          />
        </FormFieldContainer>
        <Filters>
          <Category title="Miasta" names={cities} set={setCities} />
          <Category
            title="Kluczowe umiejętności"
            names={keySkills}
            set={setKeySkills}
          />
        </Filters>
        <Buttons>
          <Btn onClick={resetForm}>Zresetuj</Btn>
          <Btn onClick={handleSearch}>Szukaj</Btn>
          <Btn onClick={handleShowAll}>Pokaż wszystkie</Btn>
        </Buttons>
      </StyledForm>
    </Root>
  );
}
