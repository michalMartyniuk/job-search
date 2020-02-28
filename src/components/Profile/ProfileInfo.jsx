import Button from "@material-ui/core/Button";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { authLogOut } from "../../store/auth/authActions";
import UpdateProfile from "./Employee/UpdateProfile";
import { toggleUpdateProfile } from "../../store/app/appActions";

const Container = styled.div`
  display: flex;
`;
const StyledProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const InfoHeader = styled.h2`
  font-size: 2rem;
  font-weight: 500;
`;
const InfoName = styled.span`
  font-weight: 500;
`;
const InfoValue = styled.span``;

const InfoItem = styled(({ name, value, className, ...other }) => (
  <div className={className} {...other}>
    <InfoName>{name}</InfoName>
    <InfoValue>{value}</InfoValue>
  </div>
))`
  font-size: 1.3rem;
`;

const Actions = styled.div`
  display: flex;
  margin: 30px 0;
`;
const ActionButton = styled(Button)`
  height: 50px;
  margin-right: 10px;
`;
const KeySkillsContainer = styled.div`
  margin: 30px 0;
`;
const KeySkill = styled.div`
  font-size: 1.3rem;
`;
const KeySkillsHeader = styled.h2`
  font-size: 1.4rem;
  font-weight: 500;
`;

function ProfileInfo({ user, toggleUpdateProfile, updateProfileActive }) {
  let accountType;
  if (user) {
    if (user.accountType === "employer") {
      accountType = "klient";
    } else if (user.accountType === "employee") {
      accountType = "użytkownik";
    } else {
      accountType = null;
    }
  }
  const handlePasswordReset = () => {
    return null;
  };
  const handleChangeInfo = () => {
    toggleUpdateProfile();
  };
  const updateProfile = (
    <StyledProfileInfo>
      <UpdateProfile />
    </StyledProfileInfo>
  );
  const keySkillsArr =
    user.userKeySkills &&
    Object.keys(user.userKeySkills).filter(key => user.userKeySkills[key]);
  return (
    <Container>
      {!updateProfileActive ? (
        <StyledProfileInfo>
          <InfoHeader>{user.name}</InfoHeader>
          <InfoItem name="Imię: " value={user.name} />
          <InfoItem name="Email: " value={user.email} />
          <InfoItem name="Rodzaj konta: " value={accountType} />
          <InfoItem name="Opis: " value={user.description || "Brak"} />
          {accountType === "użytkownik" ? (
            <KeySkillsContainer>
              <KeySkillsHeader>Kluczowe umiejętności:</KeySkillsHeader>
              {keySkillsArr.length
                ? keySkillsArr.map(skill => (
                    <KeySkill key={skill}>{skill}</KeySkill>
                  ))
                : "Brak"}
            </KeySkillsContainer>
          ) : null}
          <Actions>
            <ActionButton variant="outlined" onClick={handleChangeInfo}>
              Uzupełnij profil
            </ActionButton>
            <ActionButton variant="outlined" onClick={handlePasswordReset}>
              Zresetuj hasło
            </ActionButton>
          </Actions>
        </StyledProfileInfo>
      ) : (
        updateProfile
      )}
    </Container>
  );
}

const mapStateToProps = state => ({ ...state.auth, ...state.app });
const mapDispatchToProps = dispatch => ({
  log_out: () => dispatch(authLogOut()),
  toggleUpdateProfile: () => dispatch(toggleUpdateProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);
