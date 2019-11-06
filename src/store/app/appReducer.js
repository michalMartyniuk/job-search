import { types } from "./appTypes";

const initialState = {
  notification: {
    state: true,
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
  selected_jobType: "",
  selected_experience: "",
  selected_salary: "",
  selected_country: "",
  selected_city: ""
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
        selected_jobType: action.value
      };
    case types.SELECT_COUNTRY:
      return {
        ...state,
        selected_country: action.value
      };

    case types.SELECT_CITY:
      return {
        ...state,
        selected_city: action.value
      };

    case types.SELECT_EXP_MIN:
      return {
        ...state,
        selected_experience: action.value
      };

    case types.SELECT_EXP_MAX:
      return {
        ...state,
        selected_exp_value_max: action.value
      };

    case types.SELECT_SALARY_MIN:
      return {
        ...state,
        selected_salary: action.value
      };

    case types.SELECT_SALARY_MAX:
      return {
        ...state,
        selected_salary_value_max: action.value
      };
    default:
      return state;
  }
}
