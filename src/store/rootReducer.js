import { types } from './actionTypes';
export default function rootReducer (state, action) {
  switch(action.type) {
    case types.get_all_offers:
      return {
        ...state,
        search_results: action.results
      }
    case types.search_for_work:
      return {
        ...state,
        search_results: action.results
      };
    case types.name_input_value:
      return {
        ...state,
        name_input_value: action.value
      }
    case types.job_input_value:
      return {
        ...state,
        job_input_value: action.value
      }
    case types.location_input_value:
      return {
        ...state,
        location_input_value: action.value
      }
    case types.experience_input_value:
      return {
        ...state,
        experience_input_value: action.value
      }
    case types.salary_input_value:
      return {
        ...state,
        salary_input_value: action.value
      }
    default:
      return state
  }
}