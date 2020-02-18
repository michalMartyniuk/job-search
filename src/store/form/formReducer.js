import { types } from "./formTypes";

const initialState = {
  job: "",
  jobTypes: {
    Bankowość: false,
    Finanse: false,
    Consulting: false,
    Prawo: false
  },
  salary: [1000, 5000],
  experience: "",
  cities: {
    Warszawa: false,
    Poznań: false,
    Kraków: false,
    Szczecinek: false
  },
  keySkills: {
    Word: false,
    Excel: false,
    PowerPoint: false
  }
};

export default function formReducer(state = initialState, action) {
  switch (action.type) {
    case types.RESET_FORM:
      return {
        ...initialState
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
      return {
        ...state,
        countries: {
          ...state.countries,
          [action.value]: !state.countries[action.value]
        }
      };
    case types.SET_EXPERIENCE:
      return {
        ...state,
        experience: action.value
      };
    case types.SET_KEY_SKILLS:
      return {
        ...state,
        keySkills: {
          ...state.keySkills,
          [action.value]: !state.keySkills[action.value]
        }
      };
    case types.SET_SALARY:
      return {
        ...state,
        salary: action.values
      };
    case types.SET_EDIT_MODE:
      return {
        ...state
      };
    default:
      return state;
  }
}
