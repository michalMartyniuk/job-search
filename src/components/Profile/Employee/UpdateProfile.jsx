import React from "react";
import { Paper, Button } from "@material-ui/core";
import styled from "styled-components";
import { connect } from "react-redux";
import Category from "../../Form/FiltersCategory";
import {
  updateProfile,
  setUserKeySkills
} from "../../../store/auth/authActions";

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
function UpdateProfile({ user, setUserKeySkills, updateProfile }) {
  const handleUpdateProfile = () => updateProfile(user.userKeySkills);
  return (
    <Root>
      <Heading>Aktualizuj profil</Heading>
      <StyledForm>
        <Filters>
          <Category
            title="Kluczowe umiejętności"
            names={user.userKeySkills}
            set={setUserKeySkills}
          />
        </Filters>
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
  updateProfile: updateData => dispatch(updateProfile(updateData))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
