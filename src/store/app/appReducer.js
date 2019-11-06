import { types } from "./appTypes";

const initialState = {
  notification: {
    state: false,
    message: "",
    variant: "success"
  },
  searchResults: [],
  job: "",
  jobType: "",
  experience: "",
  salary: "",
  country: "",
  city: "",
  selectedJobType: "",
  selectedExperience: "",
  selectedSalary: "",
  selectedCountry: "",
  selectedCity: ""
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
    case types.RESET_FORM:
      return {
        ...state,
        job: "",
        jobType: "",
        country: "",
        city: "",
        salary: "",
        experience: ""
      };
    case types.GET_ALL_OFFERS:
      return {
        ...state,
        searchResults: action.results,
        job: "",
        jobType: "",
        country: "",
        city: "",
        salary: "",
        experience: ""
      };
    case types.SEARCH:
      return {
        ...state,
        searchResults: action.results,
        job: "",
        jobType: "",
        country: "",
        city: "",
        salary: "",
        experience: ""
      };
    case types.ADD_JOB:
      return state;
    case types.SET_CITY:
      return {
        ...state,
        city: action.value
      };
    case types.SET_JOB:
      return {
        ...state,
        job: action.value
      };
    case types.SET_JOB_TYPE:
      return {
        ...state,
        jobType: action.value
      };
    case types.setJob:
      return {
        ...state,
        job: action.value
      };
    case types.setJobType:
      return {
        ...state,
        jobType: action.value
      };
    case types.SET_COUNTRY:
      return {
        ...state,
        country: action.value
      };
    case types.SET_EXP_MIN:
      return {
        ...state,
        experience: action.value
      };
    case types.SET_EXP_MAX:
      return {
        ...state,
        exp_value_max: action.value
      };
    case types.SET_SALARY_MIN:
      return {
        ...state,
        salary: action.value
      };
    case types.SET_SALARY_MAX:
      return {
        ...state,
        salary_value_max: action.value
      };
    case types.SELECT_jobType:
      return {
        ...state,
        selectedJobType: action.value
      };
    case types.SELECT_COUNTRY:
      return {
        ...state,
        selectedCountry: action.value
      };

    case types.SELECT_CITY:
      return {
        ...state,
        selectedCity: action.value
      };

    case types.SELECT_EXP_MIN:
      return {
        ...state,
        selectedExperience: action.value
      };

    case types.SELECT_EXP_MAX:
      return {
        ...state,
        selected_exp_value_max: action.value
      };

    case types.SELECT_SALARY_MIN:
      return {
        ...state,
        selectedSalary: action.value
      };

    case types.SELECT_SALARY_MAX:
      return {
        ...state,
        selectedSalary_value_max: action.value
      };
    default:
      return state;
  }
}
