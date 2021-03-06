import { types } from "./appTypes";
import firebase from "../../config/firebase";
import { isDocMatching, removeFalsyProps } from "../../utility";

const db = firebase.firestore();
const auth = firebase.auth();

function createDocWithId(doc) {
  const data = doc.data();
  const { id } = doc;
  return { ...data, id };
}

export const setSearchActive = boolean => ({
  type: types.SET_SEARCH_ACTIVE,
  boolean
});
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
export const getAllOffers = async () => {
  const snapshot = await db.collection("offers").get();
  const offers = snapshot.docs.map(createDocWithId);
  return offers;
};
export const getAllUsers = async () => {
  const snapshot = await db.collection("users").get();
  const users = snapshot.docs.map(createDocWithId);
  return users;
};
export const setUsers = () => {
  return dispatch => {
    getAllUsers().then(users => {
      dispatch({ type: types.SET_USERS, users });
    });
  };
};
export const setOffers = () => {
  return dispatch => {
    getAllOffers().then(offers => {
      dispatch(setSearchActive(false));
      dispatch({ type: types.SET_OFFERS, offers });
    });
  };
};
export const setSearchResults = results => {
  return dispatch => {
    getAllOffers().then(offers => {
      dispatch(setSearchActive(true));
      dispatch({ type: types.SET_SEARCH_RESULTS, results, offers });
    });
  };
};

export const getAllIvents = async () => {
  const snapshot = await db.collection("events").get();
  const offers = snapshot.docs.map(createDocWithId);
  return offers;
};

export const setIvents = () => {
  return dispatch => {
    getAllIvents().then(ivents => {
      dispatch(setSearchActive(false));
      dispatch({ type: types.SET_IVENTS, ivents });
    });
  };
};
export const setSearchIventResults = results => {
  return dispatch => {
    getAllIvents().then(ivents => {
      dispatch(setSearchActive(true));
      dispatch({ type: types.SET_SEARCH_IVENT_RESULTS, results, ivents });
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
          setNotification(true, `Znaleziono ${docs.length} wydarzeń`, "success")
        );
        dispatch(setSearchResults(docs));
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
        dispatch(setSearchIventResults(docs));
      });
  };
};
