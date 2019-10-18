import { types } from './appTypes';

const initialState = {
  search_results: [],
  job_value: "",
  job_type: "",
  exp_value_min: "",
  exp_value_max: "",
  salary_value_min: "",
  salary_value_max: "",
  country: "",
  city: "",
}

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_OFFERS:
      return {
        ...state,
        search_results: action.results
      }
    case types.SEARCH:
      return {
        ...state,
        search_results: action.results
      };
    case types.ADD_JOB:
      return state
    case types.SET_CITY:
      return {
        ...state,
        city_value: action.value
      }
    case types.SET_JOB:
      return {
        ...state,
        job_value: action.value
      }
    case types.SET_LOCATION:
      return {
        ...state,
        country: action.value
      }
    case types.SET_EXP_MIN:
      return {
        ...state,
        exp_value_min: action.value
      }
    case types.SET_EXP_MAX:
      return {
        ...state,
        exp_value_max: action.value
      }
    case types.SET_SALARY_MIN:
      return {
        ...state,
        salary_value_min: action.value
      }
    case types.SET_SALARY_MAX:
      return {
        ...state,
        salary_value_max: action.value
      }
    case types.SELECT_JOB_TYPE:
      return {
        ...state,
        job_type: action.value
      }
    case types.SELECT_COUNTRY:
      return {
        ...state,
        country: action.value
      }

    case types.SELECT_CITY:
      return {
        ...state,
        city: action.value
      }

    case types.SELECT_EXP_MIN:
      return {
        ...state,
        exp_value_min: action.value
      }

    case types.SELECT_EXP_MAX:
      return {
        ...state,
        exp_value_max: action.value
      }

    case types.SELECT_SALARY_MIN:
      return {
        ...state,
        salary_value_min: action.value
      }

    case types.SELECT_SALARY_MAX:
      return {
        ...state,
        salary_value_max: action.value
      }
    default:
      return state
  }
}