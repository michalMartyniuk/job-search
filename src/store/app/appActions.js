import { types } from "./appTypes";
import firebase from "../../config/firebase";

const db = firebase.firestore();
const auth = firebase.auth();

function filterFunc(values) {
  values = Object.keys(values).map(key => {
    if (!values[key]) {
      return false;
    }
    return { [key]: values[key] };
  });
  values = values.filter(value => value);
  return values;
}

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

export const search = values => {
  if (!filterFunc(values).length) {
    return { type: {} };
  }
  const offersRef = db.collection("offers");
  const filteredValues = filterFunc(values);

  const queryKeys = filteredValues.map(value => {
    return Object.keys(value)[0];
  });
  const queryValues = filteredValues.map(value => {
    value = Object.values(value)[0];
    return value;
  });
  const myQuery = offersRef.where(queryKeys[0], "==", queryValues[0]);

  function filterResults(results) {
    queryKeys.map((key, index) => {
      results = results.filter(doc => {
        return doc[key] === queryValues[index];
      });
      return results;
    });
    return results;
  }
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
      .then(results => {
        return filterResults(results);
      })
      .then(results => {
        dispatch({ type: types.SEARCH, results });
      });
  };
};

export const addJobOffer = offer => {
  if (!filterFunc(offer).length || !offer.job) {
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
              setNotification(
                true,
                "Twoja oferta zostało pomyślnie dodana",
                "success"
              )
            );
          });
      });
  };
};

export const resetForm = () => ({ type: types.RESET_FORM });
export const setJob = value => ({ type: types.SET_JOB, value });
export const setJobType = value => ({ type: types.SET_JOB_TYPE, value });
export const setName = value => ({ type: types.SET_NAME, value });
export const setExperience = value => ({ type: types.SET_EXP_MIN, value });
export const setSalary = value => ({ type: types.SET_SALARY_MIN, value });
export const setCountry = value => ({ type: types.SET_COUNTRY, value });
export const setCity = value => ({ type: types.SET_CITY, value });
