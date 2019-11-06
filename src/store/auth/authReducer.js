import types from "./authTypes";

const initialState = {
  signUp_name: "",
  signUp_surname: "",
  signUp_email: "",
  signUp_password: "",
  logIn_name: "",
  logIn_email: "",
  logIn_password: "",
  user: {
    name: "",
    email: ""
  },
  loggedIn: false,
  logInError: false,
  signUpError: false,
  work_giver: false,
  work_taker: false
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.setSignUpState:
      return {
        ...state,
        signUp_state: action.state
      };
    case types.signUpError:
      return {
        ...state,
        signUpError: action.error
      };
    case types.signUpErrorReset:
      return {
        ...state,
        signUpError: false
      };
    case types.setLogInState:
      return {
        ...state,
        logInState: action.state
      };
    case types.logInError:
      return {
        ...state,
        logInError: action.error
      };
    case types.logInErrorReset:
      return {
        ...state,
        logInError: false
      };
    case types.setSignUpName:
      return {
        ...state,
        signUp_name: action.name
      };
    case types.setSignUpsurname:
      return {
        ...state,
        signUp_surname: action.surname
      };
    case types.setSignUpEmail:
      return {
        ...state,
        signUp_email: action.email
      };
    case types.setSignUpPassword:
      return {
        ...state,
        signUp_password: action.password
      };
    case types.setLogInName:
      return {
        ...state,
        logIn_name: action.name
      };
    case types.setLogInEmail:
      return {
        ...state,
        logIn_email: action.email
      };
    case types.setLogInPassword:
      return {
        ...state,
        logIn_password: action.password
      };
    case types.LOGIN:
      return {
        ...state,
        loggedIn: true,
        user: action.user,
        signUp_name: "",
        signUp_surname: "",
        signUp_email: "",
        signUp_password: "",
        logIn_name: "",
        logIn_email: "",
        logIn_password: ""
      };
    case types.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        work_giver: false,
        work_taker: false,
        user: null
      };
    case types.setWorkGiver:
      return {
        ...state,
        work_giver: true
      };
    case types.setWorkTaker:
      return {
        ...state,
        work_taker: true
      };
    default:
      return state;
  }
}
