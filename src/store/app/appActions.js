import { types } from "./appTypes";
import firebase from "../../config/firebase";
import { filterFalsyProperties, filterDocs } from "../../utility";

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
  const inputsKeys = Object.keys(inputs);
  const inputsValues = Object.values(inputs);
  const myQuery = offersRef.where(inputsKeys[0], "==", inputsValues[0]);

  const searchFilters = {
    cities: ["Warszawa", "Kraków"],
    countries: ["Polska", "Niemcy"],
    salary: [4000, 6000],
    experience: [2, 5]
  };

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
        console.log(docs);
        return filterDocs(inputs, docs);
      })
      .then(docs => {
        dispatch({ type: "" });
      });
  };
};
export const addJobOffer = offer => {
  if (!filterFalsyProperties(offer).length || !offer.job) {
    return { type: {} };
  }
  const { job, jobType, country, city, experience, salary } = offer;

  return dispatch => {
    const data = { job, jobType, country, city, experience, salary };
    db.collection(`users/${auth.currentUser.uid}/offers`)
      .add(data)
      .then(doc => {
        db.collection("offers")
          .doc(doc.id)
          .set(data)
          .then(() => {
            dispatch(
              setNotification(true, "Twoja oferta została dodana", "success")
            );
          });
      });
  };
};

export const resetForm = () => ({ type: types.RESET_FORM });
export const setJob = value => ({ type: types.SET_JOB, value });
export const setJobTypes = value => ({ type: types.SET_JOB_TYPES, value });
export const setName = value => ({ type: types.SET_NAME, value });
export const setExpMin = value => ({ type: types.SET_EXP_MIN, value });
export const setExpMax = value => ({ type: types.SET_EXP_MAX, value });
export const setSalaryMin = value => ({ type: types.SET_SALARY_MIN, value });
export const setSalaryMax = value => ({ type: types.SET_SALARY_MIN, value });
export const setCities = value => ({ type: types.SET_CITIES, value });
export const setCountries = value => ({ type: types.SET_COUNTRIES, value });
