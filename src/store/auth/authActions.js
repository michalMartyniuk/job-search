import types from "./authTypes";
import firebase from "../../config/firebase";
import { setNotification } from "../app/appActions";

const db = firebase.firestore();
const auth = firebase.auth();

export const setSignUpName = name => ({ type: types.setSignUpName, name });
export const setSignUpsurname = surname => ({
  type: types.setSignUpsurname,
  surname
});
export const setSignUpEmail = email => ({
  type: types.setSignUpEmail,
  email
});
export const setSignUpPassword = password => ({
  type: types.setSignUpPassword,
  password
});
export const set_logIn_name = name => ({ type: types.SET_LOGIN_NAME, name });
export const setLogInEmail = email => ({
  type: types.setLogInEmail,
  email
});
export const setLogInPassword = password => ({
  type: types.setLogInPassword,
  password
});
export const setSignUpState = state => ({
  type: types.setSignUpState,
  state
});
export const setLogInState = state => ({
  type: types.setLogInState,
  state
});
export const signUpError = error => {
  return { type: types.signUpError, error };
};
export const signUpErrorReset = () => {
  return { type: types.signUpErrorReset };
};
export const logInError = error => {
  return { type: types.logInError, error };
};
export const logInErrorReset = () => {
  return { type: types.logInErrorReset };
};
export const setWorkGiver = () => {
  console.log("work giver action");
  return { type: types.setWorkGiver };
};
export const setWorkTaker = () => {
  console.log("work taker action");
  return { type: types.setWorkTaker };
};
export const setLogIn = user => {
  return dispatch => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(doc => {
        dispatch({
          type: types.LOGIN,
          user: doc.data()
        });
        dispatch({ type: types.signUpErrorReset });
        dispatch({ type: types.logInErrorReset });
      });
  };
};
export const authSignUp = (name, surname, email, password) => {
  return dispatch => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        db.collection("users")
          .doc(user.user.uid)
          .set({
            name,
            surname,
            email
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
