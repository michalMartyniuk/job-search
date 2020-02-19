import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { setSearchResults, setNotification } from "../../store/app/appActions";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0px;
  width: 600px;
`;
const InputContainer = styled.div`
  display: flex;
`;
const SearchButton = styled(Button)`
  background-color: #00bcd4;
  font-size: 1.2rem;
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
const SearchInput = styled.input`
  flex: 1;
  padding: 27px 15px;
  height: 50px;
  font-size: 1.5rem;
  border: 2px solid #00bcd4;
  border-right: none;
`;
function Search({ offers, setSearchResults, setNotification }) {
  const [searchValue, setSearchValue] = React.useState("");
  const [foundMatches, setFoundMatches] = React.useState([]);

  const isString = value => typeof value === "string";

  const checkArray = (propValue, value) => {
    const filteredArray = propValue.filter(item => {
      const lowerCaseItem = isString(item) && item.toLowerCase();
      const lowerCaseValue = isString(value) && value.toLowerCase();
      return lowerCaseItem === lowerCaseValue;
    });
    return filteredArray.length ? true : false;
  };

  const offerMatch = (offer, value) => {
    let matchArray = Object.keys(offer).map(key => {
      if (Array.isArray(offer[key])) {
        return checkArray(offer[key], value);
      }
      const lowerCaseItem = isString(offer[key]) && offer[key].toLowerCase();
      const lowerCaseValue = isString(value) && value.toLowerCase();
      return lowerCaseItem === lowerCaseValue;
    });
    matchArray = matchArray.filter(item => item);
    return matchArray.length ? true : false;
  };

  const searchState = (state, value) => {
    const matchArray = state.filter(offer => {
      return offerMatch(offer, value);
    });
    return matchArray;
  };
  const resultsNotification = num => {
    let str = "";
    if (num >= 2 && num <= 4) {
      str = "wyniki";
    } else if (num === 1) {
      str = "wynik";
    } else {
      str = "wyników";
    }
    return str;
  };
  const handleSearch = () => {
    if (!foundMatches.length) {
      setNotification(`Nie znaleziono wyników dla "${searchValue}"`);
    }
    setNotification(
      `Znaleziono ${foundMatches.length} ${resultsNotification(
        foundMatches.length
      )} dla "${searchValue}"`
    );
    setSearchResults(foundMatches);
  };
  const onEnterDetected = event => {
    if (event.which == 13 || event.keyCode == 13) {
      handleSearch();
      return 1;
    }
    return 0;
  };

  const handleInput = event => {
    if (!offers.length) {
      return;
    }
    const { value } = event.target;
    setSearchValue(value);
    const results = searchState(offers, value);
    setFoundMatches(results);
  };
  return (
    <Container>
      <SearchInput
        value={searchValue}
        onChange={handleInput}
        onKeyPress={onEnterDetected}
      />
      <SearchButton variant="outlined" onClick={handleSearch}>
        Search
      </SearchButton>
    </Container>
  );
}
const mapStateToProps = state => ({ ...state.auth, ...state.app });
const mapDispatchToProps = dispatch => ({
  setNotification: message => dispatch(setNotification(true, message, "info")),
  setSearchResults: results => dispatch(setSearchResults(results))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
