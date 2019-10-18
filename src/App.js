import React, { useEffect } from 'react';
import AppForm from './components/AppForm';
import { makeStyles } from '@material-ui/styles';
import { get_all_offers } from './store/app/appActions';
import OfferList from './components/OfferList';
import FiltersDrawer from './components/Drawer';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  app: {
    display: "flex",
    flexDirection: "column",
    margin: 70,
  }
}))

function App(props) {
  const classes = useStyles();
  const { search_results, get_all_offers } = props

  useEffect(() => {
    get_all_offers()
  }, [get_all_offers])

  return (
    <div className={classes.app}>
      <FiltersDrawer />
      {/* <AppForm />
      {search_results.length
        ? <OfferList offers={search_results} />
        : null
      } */}
    </div>
  );
}
const mapStateToProps = state => ({ ...state.app })
const mapDispatchToProps = dispatch => ({
  get_all_offers: () => dispatch(get_all_offers())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
