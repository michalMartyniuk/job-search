import React from 'react';
import { makeStyles } from '@material-ui/styles';
import AppForm from './AppForm';
import OfferList from './OfferList';
import { get_all_offers } from '../../store/app/appActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  workSearchkContainer: {
    display: "flex",
    flexDirection: "column",
  }
}))

function WorkSearch(props) {
  const classes = useStyles()
  const { search_results, get_all_offers } = props

  return (
    <div className={classes.workSearchkContainer}>
      {!props.loggedIn && <Redirect to="/login" />}
      <AppForm />
      {search_results.length
        ? <OfferList offers={search_results} />
        : null
      }
    </div>
  )
}

const mapStateToProps = state => ({ ...state.app, ...state.auth })

const mapDispatchToProps = dispatch => ({
  get_all_offers: () => dispatch(get_all_offers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkSearch);
