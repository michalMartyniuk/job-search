import React from 'react';
import FormSelect from '../WorkSearch/FormSelect';
import FiltersDrawer from './Drawer';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  select_job_type, select_country, select_city, select_experience,
  select_salary, set_experience, set_salary, set_country, set_city,
  set_job_type
} from '../../store/app/appActions';

const useStyles = makeStyles(theme => ({
  selectContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 15
  },
  button: {
    marginTop: 40,
    marginRight: 20,
    height: 50,
    fontSize: "1.2rem",
  },
}))
function Filters(props) {
  const classes = useStyles()
 

  return (
     
  )
}
const mapStateToProps = state => ({ ...state.app })
const mapDispatchToProps = dispatch => ({
  select_job_type: event => {
    dispatch(select_job_type(event.target.value))
    dispatch(set_job_type(event.target.value))
  },
  select_country: event => {
    dispatch(select_country(event.target.value))
    dispatch(set_country(event.target.value))
  },
  select_city: event => {
    dispatch(select_city(event.target.value))
    dispatch(set_city(event.target.value))
  },
  select_experience: event => {
    dispatch(select_experience(event.target.value))
    dispatch(set_experience(event.target.value))
  },
  select_salary: event => {
    dispatch(select_salary(event.target.value))
    dispatch(set_salary(event.target.value))
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(Filters)