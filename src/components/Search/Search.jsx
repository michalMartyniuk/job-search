import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  container: {
    display: "flex"
  },
  input: {
    height: "50px",
    width: "500px",
    fontSize: "1.5rem",
    margin: "10rem auto"
  }
});

function Search(props) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const state = [
    {
      job: "lekarz",
      countries: ["Polska", "Niemcy"],
      cities: ["Szczecinek", "Poznań"],
      salary: [4000, 7000],
      experience: 2
    },
    {
      job: "stolarz",
      countries: ["Francja", "Niemcy"],
      cities: ["Paryż", "Berlin"],
      salary: [2000, 3000],
      experience: 2
    },
    {
      job: "murarz",
      countries: ["Polska"],
      cities: ["Warszawa"],
      salary: [2000, 3000],
      experience: 2
    }
  ];
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
    if (!props.searchResults.length) {
      return;
    }
    const { value } = event.target;
    setSearchValue(value);
    const results = searchState(props.searchResults, value);
    setSearchResults(results);
  };
  console.log(searchResults);
  return (
    <div className={classes.container}>
      <h1>Search</h1>
      <input
        className={classes.input}
        value={searchValue}
        onChange={handleSearch}
      />
    </div>
  );
}
const mapStateToProps = state => ({ ...state.auth, ...state.app });
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
