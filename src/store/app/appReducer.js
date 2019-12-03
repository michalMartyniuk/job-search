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
        searchResults: action.results,
        job: "",
        jobTypes: "",
        countries: "",
        cities: "",
        salary_min: "",
        salary_max: "",
        exp_min: "",
        exp_max: ""
      };
    case types.SEARCH:
      return {
        ...state,
        searchResults: action.results,
        job: "",
        jobTypes: "",
        countries: "",
        cities: "",
        salary_min: "",
        salary_max: "",
        exp_min: "",
        exp_max: ""
      };
    default:
      return state;
  }
}
