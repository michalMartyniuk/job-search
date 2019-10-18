import { types } from './appTypes';
import firebase from '../../config/firebase';

const db = firebase.firestore();
const auth = firebase.auth();

export const get_all_offers = () => {
  return dispatch => {
    db.collection("hire").get()
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
  let { job, location, city, exp_min, exp_max, salary_min, salary_max } = values;
  exp_min = parseInt(exp_min)
  exp_max = parseInt(exp_max)
  salary_min = parseInt(salary_min)
  salary_max = parseInt(salary_max)

  const hireRef = db.collection("hire");
  const jobQuery = hireRef.where("job", "==", job)

  return dispatch => {
    jobQuery.get()
      .then(snapshot => {
        return snapshot.docs.map(doc => {
          let data = doc.data()
          let id = doc.id
          return { ...data, id }
        })
      })
      .then(results => {
        if (location) {
          results = results.filter(doc => doc.location === location)
        }
        if (city) {
          results = results.filter(doc => doc.city === city)
        }
        if (exp_min) {
          results = results.filter(doc => {
            if (!doc.exp_max) return exp_min <= doc.exp_min
            return exp_min <= doc.exp_max
          })
        }
        if (exp_max) {
          results = results.filter(doc => {
            if (!doc.exp_min) return exp_max >= doc.exp_min
            return exp_max >= doc.exp_min
          })
        }
        if (salary_min) {
          results = results.filter(doc => {
            if (!doc.salary_max) return salary_min <= doc.salary_min
            return salary_min <= doc.salary_max
          })
        }
        if (salary_max) {
          results = results.filter(doc => {
            if (!doc.salary_min) return salary_max >= doc.salary_min
            return salary_max >= doc.salary_min
          })
        }
        return results
      })
      .then(results => dispatch({ type: types.SEARCH, results }))
      .catch(err => console.log(err))
  }

}
export const add_job_offer = offer => {
  if (!offer.job) return
  let { job, location, city, exp_min, exp_max, salary_min, salary_max } = offer;
  exp_min = parseInt(exp_min)
  exp_max = parseInt(exp_max)
  salary_min = parseInt(salary_min)
  salary_max = parseInt(salary_max)

  return dispatch => {
    db.collection("hire")
      .add({ job, location, city, exp_min, exp_max, salary_min, salary_max })
      .then(doc => {
        dispatch(get_all_offers())
      })
  }
}

export const set_job = value => ({ type: types.SET_JOB, value })
export const set_name = value => ({ type: types.SET_NAME, value })
export const set_exp_min = value => ({ type: types.SET_EXP_MIN, value })
export const set_exp_max = value => ({ type: types.SET_EXP_MAX, value })
export const set_salary_min = value => ({ type: types.SET_SALARY_MIN, value })
export const set_salary_max = value => ({ type: types.SET_SALARY_MAX, value })
export const set_country = value => ({ type: types.SET_LOCATION, value })
export const set_city = value => ({ type: types.SET_CITY, value })
export const select_country = value => ({ type: types.SELECT_COUNTRY, value })
export const select_city = value => ({ type: types.SELECT_CITY, value })
export const select_job_type = value => ({ type: types.SELECT_JOB_TYPE, value })
export const select_exp_min = value => ({ type: types.SELECT_EXP_MIN, value })
export const select_exp_max = value => ({ type: types.SELECT_EXP_MAX, value })
export const select_salary_min = value => ({ type: types.SELECT_SALARY_MIN, value })
export const select_salary_max = value => ({ type: types.SELECT_SALARY_MAX, value })
