import React, { useReducer, createContext, useEffect } from 'react';
import AppForm from './components/AppForm';
import { makeStyles } from '@material-ui/styles';
import rootReducer from './store/rootReducer';
import { add_job_offer, add_job_request, get_all_offers } from './store/actions';
import OfferList from './components/OfferList';

const useStyles = makeStyles(theme => ({
  app: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
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

  useEffect(() => {
    get_all_offers(dispatch)
  }, [get_all_offers])
  return (
    <div className={classes.app}>
      <StateContext.Provider value={[state, dispatch]}>
        <AppForm />
        {state.search_results.length
          ? <OfferList offers={state.search_results} />
          : null
        }
      </StateContext.Provider>
    </div>
  );
}

export default App;
