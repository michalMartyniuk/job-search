import { types } from './appTypes';
import firebase from '../../config/firebase';

const db = firebase.firestore();
const auth = firebase.auth();

function filterFunc(values) {
  values = Object.keys(values).map(key => {
    if (!values[key]) {
      return
    }
    return { [key]: values[key] }
  })
  values = values.filter(value => value)
  return values
}

export const set_notification = (state, message="", variant="") => {
  return ({
    type: types.SET_NOTIFICATION,
    state,
    message,
    variant
  })
}

export const get_all_offers = () => {
  return dispatch => {
    db.collection("offers").get()
      .then(snapshot => {
        return snapshot.docs.map(doc => {
          let data = doc.data()
          let id = doc.id
          return { ...data, id }
        })
      })
      .then(results => {
        dispatch({
          type: types.GET_ALL_OFFERS,
          results
        })
      })
  }
}

export const search = values => {
  if (!filterFunc(values).length) {
    return { type: {} }
  }
  const offersRef = db.collection("offers")
  const filteredValues = filterFunc(values)

  const queryKeys = filteredValues.map(value => {
    return Object.keys(value)[0]
  })
  const queryValues = filteredValues.map(value => {
    value = Object.values(value)[0];
    return value
  })
  const myQuery = offersRef.where(queryKeys[0], "==", queryValues[0])

  function filterResults(results) {
    queryKeys.map((key, index) => {
      results = results.filter(doc => {
        return doc[key] == queryValues[index]
      })
      return results
    })
    return results
  }
  return dispatch => {
    myQuery.get()
      .then(snapshot => {
        return snapshot.docs.map(doc => {
          let data = doc.data()
          let id = doc.id
          return { ...data, id }
        })
      })
      .then(results => {
        console.log(filterResults(results))
      })
  }
}

export const add_job_offer = offer => {
  if (!filterFunc(offer).length || !offer.job) {
    return { type: {} }
  }
  let { job, job_type, country, city, experience, salary } = offer;

  return dispatch => {
    db.collection("offers")
      .add({ job, job_type, country, city, experience, salary })
      .then(doc => {
        dispatch(get_all_offers())
      })
  }
}

export const set_job = value => ({ type: types.SET_JOB, value })
export const set_job_type = value => ({ type: types.SET_JOB_TYPE, value })
export const set_name = value => ({ type: types.SET_NAME, value })
export const set_experience = value => ({ type: types.SET_EXP_MIN, value })
export const set_salary = value => ({ type: types.SET_SALARY_MIN, value })
export const set_country = value => ({ type: types.SET_COUNTRY, value })
export const set_city = value => ({ type: types.SET_CITY, value })
