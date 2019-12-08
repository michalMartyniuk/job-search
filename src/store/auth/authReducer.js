import types from "./authTypes";

const initialState = {
  signUpName: "",
  signUpSurname: "",
  signUpEmail: "",
  signUpPassword: "",
  logInName: "",
  logInEmail: "",
  logInPassword: "",
  user: {
    name: "",
    email: "",
    offers: null,
    employer: false,
    employee: false
  },
  loggedIn: false,
  logInError: false,
  signUpError: false,
  accountType: ""
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_SIGNUP_STATE:
      return {
        ...state,
        signUp_state: action.state
      };
    case types.SIGNUP_ERROR:
      return {
        ...state,
        signUpError: action.error
      };
    case types.SIGNUP_ERROR_RESET:
      return {
        ...state,
        signUpError: false
      };
    case types.SET_LOGIN_STATE:
      return {
        ...state,
        logInState: action.state
      };
    case types.LOG_IN_ERROR:
      return {
        ...state,
        logInError: action.error
      };
    case types.LOG_IN_ERROR_RESET:
      return {
        ...state,
        logInError: false
      };
    case types.SET_SIGNUP_NAME:
      return {
        ...state,
        signUpName: action.name
      };
    case types.SET_SIGNUP_SURNAME:
      return {
        ...state,
        signUpSurname: action.surname
      };
    case types.SET_SIGNUP_EMAIL:
      return {
        ...state,
        signUpEmail: action.email
      };
    case types.SET_SIGNUP_PASSWORD:
      return {
        ...state,
        signUpPassword: action.password
      };
    case types.SET_LOGIN_NAME:
      return {
        ...state,
        logInName: action.name
      };
    case types.SET_LOGIN_EMAIL:
      return {
        ...state,
        logInEmail: action.email
      };
    case types.SET_LOGIN_PASSWORD:
      return {
        ...state,
        logInPassword: action.password
      };
    case types.LOGIN:
      return {
        ...state,
        loggedIn: true,
        user: action.user,
        signUpName: "",
        signUpSurname: "",
        signUpEmail: "",
        signUpPassword: "",
        logInName: "",
        logInEmail: "",
        logInPassword: ""
      };
    case types.SET_ACCOUNT_TYPE:
      return {
        ...state,
        accountType: action.accountType
      };
    case types.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        employer: false,
        employee: false,
        user: null
      };
    default:
      return state;
  }
}
