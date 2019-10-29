import { types } from './authTypes';

const initialState = {
  signUp_name: "",
  signUp_email: "",
  signUp_password: "",
  logIn_name: "",
  logIn_email: "",
  logIn_password: "",
  user: {
    name: "",
    email: "",
  },
  loggedIn: false,
  logIn_error: false,
  signUp_error: false,
  work_giver: false,
  work_taker: false
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SIGNUP_STATE:
      return {
        ...state,
        signUp_state: action.state
      }
    case types.SIGNUP_ERROR:
      return {
        ...state,
        signUp_error: action.error
      }
    case types.SIGNUP_ERROR_RESET:
      return {
        ...state,
        signUp_error: false
      }
    case types.SET_LOGIN_STATE:
      return {
        ...state,
        logIn_state: action.state
      }
    case types.LOGIN_ERROR:
      return {
        ...state,
        logIn_error: action.error
      }
    case types.LOGIN_ERROR_RESET:
      return {
        ...state,
        logIn_error: false
      }
    case types.SET_SIGNUP_NAME:
      return {
        ...state,
        signUp_name: action.name
      }
    case types.SET_SIGNUP_EMAIL:
      return {
        ...state,
        signUp_email: action.email
      }
    case types.SET_SIGNUP_PASSWORD:
      return {
        ...state,
        signUp_password: action.password
      }
    case types.SET_LOGIN_NAME:
      return {
        ...state,
        logIn_name: action.name
      }
    case types.SET_LOGIN_EMAIL:
      return {
        ...state,
        logIn_email: action.email
      }
    case types.SET_LOGIN_PASSWORD:
      return {
        ...state,
        logIn_password: action.password
      }
    case types.SIGNUP:
      return {
        ...state,
        user: action.user,
        loggedIn: true
      }
    case types.LOGIN:
      return {
        ...state,
        user: action.user,
        loggedIn: true
      }
    case types.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        work_giver: false,
        work_taker: false
      }
    case types.SET_WORK_GIVER:
      console.log("giver reducer")
      return {
        ...state,
        work_giver: true
      }
    case types.SET_WORK_TAKER:
      return {
        ...state,
        work_taker: true
      }
    default:
      return state
  }
}