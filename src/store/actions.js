import { types } from './actionTypes';
import firebase from '../config/firebase';

const db = firebase.firestore();
const auth = firebase.auth();

export const get_all_offers = (dispatch) => {
  db.collection("hire").get()
    .then(snapshot => {
      return snapshot.docs.map(doc => {
        let data = doc.data()
        let id = doc.id
        return { ...data, id }
      })
    })
    .then(results => {
      return dispatch({
        type: types.get_all_offers,
        results
      })
    })
}
export const search_for_work = (values, dispatch) => {
  let { job, location, exp_min, exp_max, salary_min, salary_max } = values;
  exp_min = parseInt(exp_min)
  exp_max = parseInt(exp_max)
  salary_min = parseInt(salary_min)
  salary_max = parseInt(salary_max)

  const hireRef = db.collection("hire");
  const jobQuery = hireRef.where("job", "==", job)

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
    .then(results => dispatch({ type: types.search_for_work, results }))
    .catch(err => console.log(err))

}
export const add_job_offer = (offer, dispatch) => {
  if (!offer.job) return
  let { job, location, exp_min, exp_max, salary_min, salary_max } = offer;
  exp_min = parseInt(exp_min)
  exp_max = parseInt(exp_max)
  salary_min = parseInt(salary_min)
  salary_max = parseInt(salary_max)

  db.collection("hire")
    .add({ job, location, exp_min, exp_max, salary_min, salary_max })
    .then(doc => {
      dispatch({ type: types.add_job_offer, offer })
      get_all_offers(dispatch)
    })
}
export const add_job_request = (request, dispatch) => {
  console.log("add job request action")
  // dispatch({ type: types.add_job_request, request })
}
export const set_job_value = (value, dispatch) => {
  dispatch({ type: types.job_input_value, value })
}
export const set_name_value = (value, dispatch) => {
  dispatch({ type: types.name_input_value, value })
}
export const set_experience_value_min = (value, dispatch) => {
  dispatch({ type: types.experience_input_value_min, value })
}
export const set_experience_value_max = (value, dispatch) => {
  dispatch({ type: types.experience_input_value_max, value })
}
export const set_salary_value_min = (value, dispatch) => {
  dispatch({ type: types.salary_input_value_min, value })
}
export const set_salary_value_max = (value, dispatch) => {
  dispatch({ type: types.salary_input_value_max, value })
}
export const set_location_value = (value, dispatch) => {
  dispatch({ type: types.location_input_value, value })
}