import { types } from "./appTypes";

const initialState = {
  notification: {
    state: false,
    message: "",
    variant: "success"
  },
  updateProfileActive: false,
  offers: [],
  ivents: [],
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

    case types.SET_OFFERS:
      return {
        ...state,
        offers: action.offers
      };
    case types.SET_IVENTS:
      return {
        ...state,
        ivents: action.ivents
      };
    case types.SET_SEARCH_RESULTS:
      return {
        ...state,
        offers: action.offers,
        searchResults: action.results
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
