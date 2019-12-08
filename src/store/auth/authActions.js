import types from "./authTypes";
import firebase from "../../config/firebase";
import { setNotification } from "../app/appActions";

const db = firebase.firestore();
const auth = firebase.auth();

export const setSignUpName = name => ({ type: types.SET_SIGNUP_NAME, name });
export const setSignUpsurname = surname => ({
  type: types.SET_SIGNUP_SURNAME,
  surname
});
export const setSignUpEmail = email => ({
  type: types.SET_SIGNUP_EMAIL,
  email
});
export const setSignUpPassword = password => ({
  type: types.SET_SIGNUP_PASSWORD,
  password
});
export const set_logInName = name => ({ type: types.SET_LOGIN_NAME, name });
export const setLogInEmail = email => ({
  type: types.SET_LOGIN_EMAIL,
  email
});
export const setLogInPassword = password => ({
  type: types.SET_LOGIN_PASSWORD,
  password
});
export const setSignUpState = state => ({
  type: types.SET_SIGNUP_STATE,
  state
});
export const setLogInState = state => ({
  type: types.SET_LOGIN_STATE,
  state
});
export const signUpError = error => {
  return { type: types.SIGNUP_ERROR, error };
};
export const signUpErrorReset = () => {
  return { type: types.SIGNUP_ERROR_RESET };
};
export const logInError = error => {
  return { type: types.LOG_IN_ERROR, error };
};
export const logInErrorReset = () => {
  return { type: types.LOG_IN_ERROR_RESET };
};
export const setAccountType = accountType => {
  console.log(accountType);
  return { type: types.SET_ACCOUNT_TYPE, accountType };
};
export const setLogIn = user => {
  return dispatch => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(doc => {
        const offers = [];
        db.collection(`users/${auth.currentUser.uid}/offers`)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(offer =>
              offers.push({ id: offer.id, ...offer.data() })
            );
            dispatch({
              type: types.LOGIN,
              user: { ...doc.data(), offers }
            });
            dispatch({ type: types.SIGNUP_ERROR_RESET });
            dispatch({ type: types.LOG_IN_ERROR_RESET });
          });
      });
  };
};
export const authSignUp = (name, surname, email, password, accountType) => {
  return dispatch => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        db.collection("users")
          .doc(user.user.uid)
          .set({
            name,
            surname,
            email,
            accountType
          })
          .then(() => {
            dispatch(
              setNotification(true, "Zostałeś pomyślnie zalogowany", "success")
            );
            dispatch(setLogIn(user.user));
          });
      })
      .catch(error => {
        dispatch(signUpError(error.message));
      });
  };
};

export const authLogIn = (email, password) => {
  return dispatch => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          dispatch(
            setNotification(true, "Zostałeś pomyślnie zalogowany", "success")
          );
          dispatch(setLogIn(user.user));
        } else {
          dispatch(logInError("User not found"));
        }
      })
      .catch(error => {
        dispatch(logInError(error.message));
      });
  };
};
export const authLogOut = () => {
  return dispatch => {
    auth.signOut().then(() => {
      dispatch({ type: types.LOGOUT });
    });
  };
};
