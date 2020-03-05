import React from "react";
import TextField from "@material-ui/core/TextField";
import { Paper, Button } from "@material-ui/core";
import styled from "styled-components";
import { connect } from "react-redux";
import Category from "../../Form/FiltersCategory";
import {
  updateProfile,
  setUserKeySkills,
  setUserDescription,
  setMinPrefSalary
} from "../../../store/auth/authActions";
import { MinSalaryInput } from "../../Form/Input";

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
const InputWrapper = styled.div`
  display: flex;
  margin: 20px 0px;
`;
const InputTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
  margin: auto auto auto 0;
`;
function UpdateProfile({
  user,
  setUserKeySkills,
  setUserDescription,
  updateProfile,
  setMinPrefSalary
}) {
  const handleUpdateProfile = () => {
    updateProfile({
      userKeySkills: user.userKeySkills,
      description: user.description,
      minPrefSalary: user.minPrefSalary || ""
    });
  };
  const handleDescription = event => {
    setUserDescription(event.target.value);
  };
  return (
    <Root>
      <Heading>Aktualizuj profil</Heading>
      <StyledForm>
        {user.accountType === "employee" ? (
          <>
            <Filters>
              <Category
                title="Kluczowe umiejętności"
                names={user.userKeySkills}
                set={setUserKeySkills}
              />
            </Filters>
            <InputWrapper>
              <InputTitle>Minimalne preferowane wynagrodzenie:</InputTitle>
              <MinSalaryInput
                value={user.minPrefSalary}
                onChange={event => {
                  setMinPrefSalary(event.target.value);
                }}
              />
            </InputWrapper>
          </>
        ) : null}
        <TextField
          id="outlined-multiline-static"
          label="Opis"
          multiline
          rows="7"
          defaultValue={user.description}
          onChange={handleDescription}
          variant="outlined"
        />
        <Buttons>
          <Btn onClick={handleUpdateProfile}>Aktualizuj</Btn>
        </Buttons>
      </StyledForm>
    </Root>
  );
}

const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => ({
  setUserKeySkills: value => dispatch(setUserKeySkills(value)),
  updateProfile: updateData => dispatch(updateProfile(updateData)),
  setUserDescription: description => dispatch(setUserDescription(description)),
  setMinPrefSalary: value => dispatch(setMinPrefSalary(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
