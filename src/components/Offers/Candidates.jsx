import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import {
  setSearchResults,
  setSearchIventResults,
  setNotification,
  setOffers,
  setIvents
} from "../../store/app/appActions";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px;
  width: 800px;
`;
const SearchButton = styled(Button)`
  background-color: #00bcd4;
  font-size: 1rem;
  color: white;
  border: none;
  border-radius: unset;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #008c9e;
  }
`;
const ShowAllButton = styled(SearchButton)`
  margin-left: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 27px 15px;
  height: 50px;
  font-size: 1.5rem;
  border: 2px solid #00bcd4;
  border-right: none;
`;
const UserList = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: 10px 40px;
  padding: 30px;
`;
const UserName = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    color: #00bcd4;
  }
`;
const DataField = styled.div`
  display: flex;
`;
const Label = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
`;
const Text = styled.span`
  font-size: 1.1rem;
  font-weight: 400;
  margin-left: 10px;
`;
function Candidates({ users, setNotification }) {
  const history = useHistory();

  const [searchValue, setSearchValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const handleUserDetails = id => {
    history.push(`/details/employee/${id}`);
  };
  const handleSearch = () => {
    const matchArray = users.filter(user => {
      if (!user.userKeySkills) return false;
      const match = Object.keys(user.userKeySkills).filter(
        key =>
          key.toLowerCase() === searchValue.toLowerCase() &&
          user.userKeySkills[key]
      )[0];
      return match;
    });
    setSearchResults(matchArray);
    setNotification(
      true,
      `Znaleziono ${matchArray.length} kandydatów`,
      "success"
    );
  };
  const onEnterDetected = event => {
    if (event.which == 13 || event.keyCode == 13) {
      handleSearch();
      return 1;
    }
    return 0;
  };

  const handleShowAll = () => {
    setSearchResults([]);
  };

  const handleInput = event => {
    const { value } = event.target;
    setSearchValue(value);
  };
  const candidatesSearch = (
    <Container>
      <SearchInput
        value={searchValue}
        onChange={handleInput}
        onKeyPress={onEnterDetected}
      />
      <SearchButton variant="outlined" onClick={handleSearch}>
        Szukaj
      </SearchButton>
      <ShowAllButton variant="outlined" onClick={handleShowAll}>
        Pokaż wszystkie
      </ShowAllButton>
    </Container>
  );
  const usersSearchResults = (
    <UserList>
      {searchResults.length
        ? searchResults.map(user => {
            if (user.accountType === "employer") {
              return;
            }
            const keySkillsArr =
              user.userKeySkills &&
              Object.keys(user.userKeySkills).filter(
                key => user.userKeySkills[key]
              );
            return (
              <UserContainer key={user.id}>
                <div>
                  <UserName onClick={() => handleUserDetails(user.id)}>
                    {user.name.split(" ")[0]}
                  </UserName>
                </div>
                <DataField>
                  <Label>Kluczowe umiejętności:</Label>
                  {keySkillsArr.length ? (
                    <Text>{keySkillsArr.join(", ")}</Text>
                  ) : (
                    <Text>Brak</Text>
                  )}
                </DataField>
              </UserContainer>
            );
          })
        : null}
    </UserList>
  );
  const allUsers = (
    <UserList>
      {users.length
        ? users.map(user => {
            if (user.accountType === "employer") {
              return;
            }
            const keySkillsArr =
              user.userKeySkills &&
              Object.keys(user.userKeySkills).filter(
                key => user.userKeySkills[key]
              );
            return (
              <UserContainer key={user.id}>
                <div>
                  <UserName onClick={() => handleUserDetails(user.id)}>
                    {user.name.split(" ")[0]}
                  </UserName>
                </div>
                <DataField>
                  <Label>Kluczowe umiejętności:</Label>
                  {keySkillsArr.length ? (
                    <Text>{keySkillsArr.join(", ")}</Text>
                  ) : (
                    <Text>Brak</Text>
                  )}
                </DataField>
              </UserContainer>
            );
          })
        : null}
    </UserList>
  );
  return (
    <div>
      {candidatesSearch}
      {searchResults.length ? usersSearchResults : allUsers}
    </div>
  );
}
const mapStateToProps = state => ({ ...state.auth, ...state.app });
const mapDispatchToProps = dispatch => ({
  setOffers: () => dispatch(setOffers()),
  setIvents: () => dispatch(setIvents()),
  setNotification: (state, message, variant) =>
    dispatch(setNotification(state, message, variant)),
  setSearchResults: results => dispatch(setSearchResults(results)),
  setSearchIventResults: results => dispatch(setSearchIventResults(results))
});

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);
