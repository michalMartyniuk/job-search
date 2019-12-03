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
  // const offersRef = db.collection("offers");
  const filteredInputs = removeFalsyProps(inputs);
  // const inputsKeys = Object.keys(filteredInputs);
  // const myQuery = offersRef.where(inputsKeys[0], "==", inputs[inputsKeys[0]]);

  console.log("inputs", inputs);
  console.log("filtered", filteredInputs);
  return { type: {} };
  // return dispatch => {
  //   myQuery
  //     .get()
  //     .then(snapshot => {
  //       return snapshot.docs.map(doc => {
  //         const data = doc.data();
  //         const { id } = doc;
  //         return { ...data, id };
  //       });
  //     })
  //     .then(docs => {
  //       console.log(docs);
  //       return docs.filter(doc => isDocMatching(inputs, doc));
  //     })
  //     .then(docs => {
  //       dispatch({ type: types.SEARCH, results: docs });
  //     });
  // };
};
export const addJobOffer = inputs => {
  console.log(inputs);
  return { type: {} };
  // const { job, jobTypes, countries, cities, experience, salary } = offer;
  // return dispatch => {
  //   const data = { job, jobTypes, countries, cities, experience, salary };
  //   db.collection(`users/${auth.currentUser.uid}/offers`)
  //     .add(data)
  //     .then(doc => {
  //       db.collection("offers")
  //         .doc(doc.id)
  //         .set(data)
  //         .then(() => {
  //           dispatch(
  //             setNotification(true, "Twoja oferta została dodana", "success")
  //           );
  //         });
  //     });
  // };
};
