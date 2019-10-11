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
  let { job, location, exp, salary } = values;
  exp = parseInt(exp)
  salary = parseInt(salary)
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
      if (exp) {
        results = results.filter(doc => doc.exp === exp)
      }
      if (salary) {
        results = results.filter(doc => doc.salary === salary)
      }
      return results
    })
    .then(results => dispatch({ type: types.search_for_work, results }))
    .catch(err => console.log(err))

}
export const add_job_offer = (offer, dispatch) => {
  if (!offer.job) return
  let { job, location, exp, salary } = offer;
  exp = parseInt(exp)
  salary = parseInt(salary)

  db.collection("hire")
    .add({ job, location, exp, salary })
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
export const set_experience_value = (value, dispatch) => {
  dispatch({ type: types.experience_input_value, value })
}
export const set_salary_value = (value, dispatch) => {
  dispatch({ type: types.salary_input_value, value })
}
export const set_location_value = (value, dispatch) => {
  dispatch({ type: types.location_input_value, value })
}