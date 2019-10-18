import {types} from './authTypes';

const initialState = {
  logged_in: false,
}

export const authReducer = (state=initialState, action) => {
  switch (action.type) {
    case types.CREATE_ACCOUNT:
      return state
    case types.LOG_IN:
      return state
    case types.LOG_OUT:
      return state
    default:
      return state
  }
}