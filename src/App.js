import React, { useReducer, createContext } from 'react';
import AppForm from './components/AppForm';
import { makeStyles } from '@material-ui/styles';
import rootReducer from './store/rootReducer';
import { add_job_offer, add_job_request } from './store/actions';

const useStyles = makeStyles(theme => ({
  app: {
    display: "flex",
    justifyContent: "center",
    margin: 70,
  }
}))

const initialState = {
  search_results: [],
  job_input_value: "",
  name_input_value: "",
  experience_input_value: "",
  salary_input_value: "",
  location_input_value: ""
}
export const StateContext = createContext()

function App() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(rootReducer, initialState)
  return (
    <div className={classes.app}>
      <StateContext.Provider value={[state, dispatch]}>
        <AppForm />
      </StateContext.Provider>
    </div>
  );
}

export default App;
