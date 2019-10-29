import { types } from "./authTypes";
import { types as appTypes } from '../app/appTypes';
import firebase from '../../config/firebase';
import { set_notification } from "../app/appActions";

const db = firebase.firestore();
const auth = firebase.auth();

export const set_signUp_name = name => ({ type: types.SET_SIGNUP_NAME, name })
export const set_signUp_email = email => ({ type: types.SET_SIGNUP_EMAIL, email })
export const set_signUp_password = password => ({ type: types.SET_SIGNUP_PASSWORD, password })
export const set_logIn_name = name => ({ type: types.SET_LOGIN_NAME, name })
export const set_logIn_email = email => ({ type: types.SET_LOGIN_EMAIL, email })
export const set_logIn_password = password => ({ type: types.SET_LOGIN_PASSWORD, password })
export const set_signUp_state = state => ({ type: types.SET_SIGNUP_STATE, state })
export const set_logIn_state = state => ({ type: types.SET_LOGIN_STATE, state })

export const auth_sign_up = (email, password, account_type) => {
  return dispatch => {
    auth.createUserWithEmailAndPassword(email, password).then(user => {
      dispatch({
        type: types.SIGNUP,
        user
      })
      dispatch({ type: types.LOGIN_ERROR_RESET })
    }).catch(error => {
      dispatch(signUp_error(error.message))
    })
  }
}
export const auth_log_in = (email, password) => {
  return dispatch => {
    auth.signInWithEmailAndPassword(email, password).then(user => {
      dispatch({ type: types.LOGIN, user })
      dispatch({ type: types.LOGIN_ERROR_RESET })
    }).catch(error => {
      dispatch(logIn_error(error.message))
    })
  }
}
export const auth_log_out = () => {
  return dispatch => {
    auth.signOut().then(() => {
      dispatch({ type: types.auth.LOGOUT })
    })
  }
}

export const signUp_error = (error) => {
  return { type: types.SIGNUP_ERROR, error }
}
export const signUp_error_reset = () => {
  return { type: types.SIGNUP_ERROR_RESET }
}
export const logIn_error = (error) => {
  return { type: types.LOGIN_ERROR, error }
}
export const logIn_error_reset = () => {
  return { type: types.LOGIN_ERROR_RESET }
}
export const set_work_giver = () => {
  console.log("work giver action")
  return { type: types.SET_WORK_GIVER }
}
export const set_work_taker = () => {
  console.log("work taker action")
  return { type: types.SET_WORK_TAKER }
}