import { types } from "./formTypes";

const initialState = {
  job: "",
  jobTypes: {
    Medycyna: false,
    IT: false,
    Edukacja: false,
    Rolnictwo: false
  },
  salary: [1000, 5000],
  experience: null,
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
    case types.SET_SALARY:
      return {
        ...state,
        salary: action.values
      };
    default:
      return state;
  }
}
