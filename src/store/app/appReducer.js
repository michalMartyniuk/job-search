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
    case types.APPLY_TO_OFFER:
      return {
        ...state
      };
    case types.SAVE_OFFER:
      return {
        ...state
      };
    case types.EDIT_OFFER:
      return {
        ...state
      };
    case types.CLOSE_OFFER:
      return {
        ...state
      };
    default:
      return state;
  }
}
