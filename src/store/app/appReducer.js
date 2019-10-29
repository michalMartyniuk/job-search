import { types } from './appTypes';

const initialState = {
  notification: {
    state: false,
    message: "",
    variant: ""
  },
  search_results: [],
  job: "",
  job_type: "",
  experience: "",
  salary: "",
  country: "",
  city: "",
  selected_job_type: "",
  selected_experience: "",
  selected_salary: "",
  selected_country: "",
  selected_city: ""
}

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_NOTIFICATION:
      console.log(action)
      return {
        ...state,
        notification: {
          state: action.state,
          message: action.message,
          variant: action.variant
        }
      }
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
        city: action.value
      }
    case types.SET_JOB:
      return {
        ...state,
        job: action.value
      }
    case types.SET_JOB_TYPE:
      return {
        ...state,
        job_type: action.value
      }
    case types.SET_COUNTRY:
      return {
        ...state,
        country: action.value
      }
    case types.SET_EXP_MIN:
      return {
        ...state,
        experience: action.value
      }
    case types.SET_EXP_MAX:
      return {
        ...state,
        exp_value_max: action.value
      }
    case types.SET_SALARY_MIN:
      return {
        ...state,
        salary: action.value
      }
    case types.SET_SALARY_MAX:
      return {
        ...state,
        salary_value_max: action.value
      }
    case types.SELECT_JOB_TYPE:
      return {
        ...state,
        selected_job_type: action.value
      }
    case types.SELECT_COUNTRY:
      return {
        ...state,
        selected_country: action.value
      }

    case types.SELECT_CITY:
      return {
        ...state,
        selected_city: action.value
      }

    case types.SELECT_EXP_MIN:
      return {
        ...state,
        selected_experience: action.value
      }

    case types.SELECT_EXP_MAX:
      return {
        ...state,
        selected_exp_value_max: action.value
      }

    case types.SELECT_SALARY_MIN:
      return {
        ...state,
        selected_salary: action.value
      }

    case types.SELECT_SALARY_MAX:
      return {
        ...state,
        selected_salary_value_max: action.value
      }
    default:
      return state
  }
}