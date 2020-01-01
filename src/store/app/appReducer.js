import { types } from "./appTypes";

const initialState = {
  notification: {
    state: false,
    message: "",
    variant: "success"
  },
  searchResults: []
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_NOTIFICATION:
      return {
        ...state,
        notification: {
          state: action.state,
          message: action.message,
          variant: action.variant
        }
      };
    case types.ADD_JOB:
      return state;
    case types.GET_ALL_OFFERS:
      return {
        ...state,
        searchResults: action.results
      };
    case types.SEARCH:
      return {
        ...state,
        searchResults: action.results
      };
    case types.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.results
      }
    default:
      return state;
  }
}
