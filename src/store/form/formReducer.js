import { types } from "./formTypes";

const initialState = {
  job: "",
  jobTypes: {
    Medycyna: false,
    IT: false,
    Edukacja: false,
    Rolnictwo: false
  },
  salary_min: "",
  salary_max: "",
  exp_min: "",
  exp_max: "",
  countries: {
    Polska: false,
    Niemcy: false,
    Francja: false,
    "Wielka Brytania": false
  },
  cities: {
    Warszawa: false,
    Poznań: false,
    Kraków: false,
    Szczecinek: false
  },
};

export default function formReducer(state = initialState, action) {
  switch (action.type) {
    case types.RESET_FORM:
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
    case types.SET_JOB:
      return {
        ...state,
        job: action.value
      };
    case types.SET_JOB_TYPES:
      return {
        ...state,
        jobTypes: {
          ...state.jobTypes,
          [action.value]: !state.jobTypes[action.value]
        }
      };
    case types.setJob:
      return {
        ...state,
        job: action.value
      };
    case types.SET_CITIES:
      return {
        ...state,
        cities: {
          ...state.cities,
          [action.value]: !state.cities[action.value]
        }
      };
    case types.SET_COUNTRIES:
      console.log("siema", action.value)
      return {
        ...state,
        countries: {
          ...state.countries,
          [action.value]: !state.countries[action.value]
        }
      };
    case types.SET_EXP_MIN:
      return {
        ...state,
        exp_min: action.value
      };
    case types.SET_EXP_MAX:
      return {
        ...state,
        exp_max: action.value
      };
    case types.SET_SALARY_MIN:
      return {
        ...state,
        salary_min: action.value
      };
    case types.SET_SALARY_MAX:
      return {
        ...state,
        salary_max: action.value
      };
    default:
      return state;
  }
}
