import { types } from "./appTypes";
import firebase from "../../config/firebase";
import { isDocMatching, removeFalsyProps } from "../../utility";

const db = firebase.firestore();
const auth = firebase.auth();

export const setNotification = (state = false, message = "", variant = "") => {
  return {
    type: types.SET_NOTIFICATION,
    state,
    message,
    variant
  };
};
export const toggleUpdateProfile = () => ({
  type: types.TOGGLE_UPDATE_PROFILE
});
export const getAllOffers = () => {
  return dispatch => {
    db.collection("offers")
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => {
          const data = doc.data();
          const { id } = doc;
          return { ...data, id };
        });
      })
      .then(results => {
        dispatch({
          type: types.GET_ALL_OFFERS,
          results
        });
      });
  };
};

export const search = inputs => {
  const offersRef = db.collection("offers");
  const filteredInputs = removeFalsyProps(inputs);
  const inputsKeys = Object.keys(filteredInputs);
  const myQuery = offersRef.where(inputsKeys[0], "==", inputs[inputsKeys[0]]);

  return dispatch => {
    myQuery
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => {
          const data = doc.data();
          const { id } = doc;
          return { ...data, id };
        });
      })
      .then(docs => {
        return docs.filter(doc => isDocMatching(inputs, doc));
      })
      .then(docs => {
        dispatch(
          setNotification(true, `Znaleziono ${docs.length} ofert`, "success")
        );
        dispatch({ type: types.SEARCH, results: docs });
      });
  };
};

export const setSearchResults = results => {
  return { type: types.SET_SEARCH_RESULTS, results };
};

export const getAllIvents = () => {
  return dispatch => {
    db.collection("events")
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => {
          const data = doc.data();
          const { id } = doc;
          return { ...data, id };
        });
      })
      .then(results => {
        dispatch({
          type: types.GET_ALL_IVENTS,
          results
        });
      });
  };
};

export const searchIvent = inputs => {
  const iventsRef = db.collection("events");
  const filteredInputs = removeFalsyProps(inputs);
  const inputsKeys = Object.keys(filteredInputs);
  const myQuery = iventsRef.where(inputsKeys[0], "==", inputs[inputsKeys[0]]);

  return dispatch => {
    myQuery
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => {
          const data = doc.data();
          const { id } = doc;
          return { ...data, id };
        });
      })
      .then(docs => {
        return docs.filter(doc => isDocMatching(inputs, doc));
      })
      .then(docs => {
        dispatch(
          setNotification(true, `Znaleziono ${docs.length} wydarzeń`, "success")
        );
        dispatch({ type: types.SEARCH_IVENT, results: docs });
      });
  };
};

export const setSearchIventResults = results => {
  return { type: types.SET_SEARCH_IVENT_RESULTS, results };
};
