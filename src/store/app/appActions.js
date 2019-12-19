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
function createTimestamp() {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const seconds = date.getSeconds().toString();
  return { year, month, day, hours, minutes, seconds };
}
export const addJobOffer = inputs => {
  const {
    job,
    jobTypes,
    countries,
    cities,
    experience,
    salary,
    owner
  } = inputs;
  const date = createTimestamp();
  const data = {
    job,
    jobTypes,
    countries,
    cities,
    experience,
    salary,
    date,
    owner
  };
  return dispatch => {
    db.collection(`users/${auth.currentUser.uid}/offers`)
      .add(data)
      .then(doc => {
        db.collection("offers")
          .doc(doc.id)
          .set({ id: doc.id, ...data })
          .then(() => {
            dispatch(
              setNotification(true, "Twoja oferta została dodana", "success")
            );
          });
      });
  };
};

export const applyToOffer = offerId => {
  db.collection("offers")
    .doc(offerId)
    .get()
    .then(doc => {
      const offer = doc.data();
      db.collection("users")
        .doc(auth.currentUser.uid)
        .update({
          appliedOffers: firebase.firestore.FieldValue.arrayUnion(offer)
        })
        .then(() => {
          return { type: types.APPLY_TO_OFFER };
        });
    });
};
export const saveOffer = offerId => {
  db.collection("offers")
    .doc(offerId)
    .get()
    .then(doc => {
      const offer = doc.data();
      db.collection("users")
        .doc(auth.currentUser.uid)
        .update({
          savedOffers: firebase.firestore.FieldValue.arrayUnion(offer)
        })
        .then(() => {
          return { type: types.SAVE_OFFER };
        });
    });
};
export const editOffer = (offer, offerId) => {
  const updatedOffer = { id: offerId, ...offer };
  db.collection("offers")
    .doc(offerId)
    .set(updatedOffer)
    .then(() => {
      db.collection(`users/${auth.currentUser.uid}/offers`)
        .doc(offerId)
        .set(updatedOffer)
        .then(() => {
          return { type: types.EDIT_OFFER };
        });
    });
};
export const closeOffer = offerId => {
  // Add offer to closedOffers array
  db.collection("offers")
    .doc(offerId)
    .get()
    .then(doc => {
      const offer = { id: offerId, ...doc.data() };
      db.collection("users")
        .doc(auth.currentUser.uid)
        .update({
          closedOffers: firebase.firestore.FieldValue.arrayUnion(offer)
        })
        .then(() => {
          // Delete offer from offers
          db.collection("offers")
            .doc(offerId)
            .delete()
            .then(() => {
              // Delete offer from user/offers
              db.collection(`users/${auth.currentUser.uid}/offers`)
                .doc(offerId)
                .delete()
                .then(() => {
                  return { type: types.EDIT_OFFER };
                });
            });
        });
    });

  // Remove offer from offers collection
  // Remove offer from user/offers collection
  // Add offer to user/closedOffers collection
  console.log("Close offer", offerId);
  return { type: types.CLOSE_OFFER };
};
