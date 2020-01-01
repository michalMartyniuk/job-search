import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { setSearchResults } from "../../store/app/appActions";

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
function Search({ searchResults, setSearchResults }) {
  const [searchValue, setSearchValue] = React.useState("");
  const [foundMatches, setFoundMatches] = React.useState([]);
  const checkArray = (propValue, value) => {
    const filteredArray = propValue.filter(item => item === value);
    return filteredArray.length ? true : false;
  };
  const offerMatch = (offer, value) => {
    let matchArray = Object.keys(offer).map(key => {
      if (Array.isArray(offer[key])) {
        return checkArray(offer[key], value);
      }
      return offer[key] === value;
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
  const handleSearch = event => {
    if (!searchResults.length) {
      return;
    }
    const { value } = event.target;
    setSearchValue(value);
    const results = searchState(searchResults, value);
    setFoundMatches(results);
  };
  return (
    <Container>
      <SearchInput value={searchValue} onChange={handleSearch} />
      <SearchButton
        variant="outlined"
        onClick={() => setSearchResults(foundMatches)}
      >
        Search
      </SearchButton>
    </Container>
  );
}
const mapStateToProps = state => ({ ...state.auth, ...state.app });
const mapDispatchToProps = dispatch => ({
  setSearchResults: results => dispatch(setSearchResults(results))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);