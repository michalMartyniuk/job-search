import { types } from "./appTypes";

const initialState = {
  notification: {
    state: false,
    message: "",
    variant: "success"
  },
  updateProfileActive: false,
  searchResults: [],
  searchIventResults: []
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_UPDATE_PROFILE:
      return {
        ...state,
        updateProfileActive: !state.updateProfileActive
      };
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
      };

    case types.GET_ALL_IVENTS:
      return {
        ...state,
        searchIventResults: action.results
      };
    case types.SEARCH_IVENT:
      return {
        ...state,
        searchIventResults: action.results
      };
    case types.SET_SEARCH_IVENT_RESULTS:
      return {
        ...state,
        searchIventResults: action.results
      };
    default:
      return state;
  }
}
