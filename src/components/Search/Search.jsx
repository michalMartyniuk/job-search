import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
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
  margin: 50px 0px;
  // width: 600px;
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
function Search({
  offers,
  ivents,
  setOffers,
  setIvents,
  setSearchResults,
  setSearchIventResults,
  setNotification,
  searchType
}) {
  const [searchValue, setSearchValue] = React.useState("");
  const [foundOffers, setFoundOffers] = React.useState([]);
  const [foundIvents, setFoundIvents] = React.useState([]);

  const isString = value => typeof value === "string";

  const checkArray = (propValue, value) => {
    const filteredArray = propValue.filter(item => {
      const lowerCaseItem = isString(item) && item.toLowerCase();
      const lowerCaseValue = isString(value) && value.toLowerCase();
      return lowerCaseItem === lowerCaseValue;
    });
    return !!filteredArray.length;
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
    return !!matchArray.length;
  };

  const searchState = (state, value) => {
    const matchArray = state.filter(offer => {
      return offerMatch(offer, value);
    });
    return matchArray;
  };
  const resultsNotification = num => {
    let offer = "";
    let ivent = "";
    if (num >= 2 && num <= 4) {
      offer = "oferty";
      ivent = "wydarzenia";
    } else if (num === 1) {
      offer = "ofertę";
      ivent = "wydarzenie";
    } else {
      offer = "ofert";
      ivent = "wydarzeń";
    }
    return { offer, ivent };
  };
  const handleSearch = () => {
    switch (searchType) {
      case "offers":
        setNotification(
          `Znaleziono ${foundOffers.length} ${
            resultsNotification(foundOffers.length).offer
          } dla "${searchValue}"`
        );
        break;
      case "events":
        setNotification(
          `Znaleziono ${foundIvents.length} ${
            resultsNotification(foundIvents.length).ivent
          } dla "${searchValue}"`
        );
        break;
      default:
        setNotification(
          `Znaleziono ${foundOffers.length} ${
            resultsNotification(foundOffers.length).offer
          } i  ${foundIvents.length} ${
            resultsNotification(foundIvents.length).ivent
          } dla "${searchValue}"`
        );
        break;
    }
    setSearchResults(foundOffers);
    setSearchIventResults(foundIvents);
  };
  const onEnterDetected = event => {
    if (event.which == 13 || event.keyCode == 13) {
      handleSearch();
      return 1;
    }
    return 0;
  };

  function search(value, items) {
    if (!items.length) {
      return false;
    }
    setSearchValue(value);
    const results = searchState(items, value);
    return results;
  }

  const handleInput = event => {
    const { value } = event.target;
    const offersFound = search(value, offers);
    const iventsFound = search(value, ivents);
    setFoundOffers(offersFound);
    setFoundIvents(iventsFound);
  };
  const handleShowAll = () => {
    setOffers();
    setIvents();
  };
  return (
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
}
const mapStateToProps = state => ({ ...state.auth, ...state.app });
const mapDispatchToProps = dispatch => ({
  setOffers: () => dispatch(setOffers()),
  setIvents: () => dispatch(setIvents()),
  setNotification: message => dispatch(setNotification(true, message, "info")),
  setSearchResults: results => dispatch(setSearchResults(results)),
  setSearchIventResults: results => dispatch(setSearchIventResults(results))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
