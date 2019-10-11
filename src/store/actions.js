import { types } from './actionTypes';
import firebase from '../config/firebase';

const db = firebase.firestore();
const auth = firebase.auth();

export const search_for_work = (values, dispatch) => {
  const hireRef = db.collection("hire");
  const jobQuery = hireRef.where("job", "==", values.job)

  jobQuery.get()
    .then(snapshot => {
      return snapshot.docs.map(doc => doc.data())
    })
    .then(results => {
      if (values.location) {
        results = results.filter(doc => doc.location === values.location)
      }
      if (values.exp) {
        results = results.filter(doc => doc.exp === values.exp)
      }
      if (values.salary) {
        results = results.filter(doc => doc.salary === values.salary)
      }
      return results
    })
    .then( results => dispatch({ type: types.search_for_work, results }))
    .catch(err => console.log(err))

}
export const add_job_offer = (offer, dispatch) => {
  db.collection("hire").add({
    job: offer.job,
    location: offer.location,
    exp: offer.exp,
    salary: offer.salary
  }).then(doc => console.log(doc))
  dispatch({ type: types.add_job_offer, offer })
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