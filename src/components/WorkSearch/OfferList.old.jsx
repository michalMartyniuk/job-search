import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 20,
  },
  header: {
    textAlign: "center",
    fontSize: "1.7rem",
  },
  offerList: {
    display: "flex",
    flexWrap: "wrap",
  },
  offer: {
    minWidth: 200,
    border: "2px solid black",
    margin: 20,
    padding: 20,
    fontSize: "1.2rem"
  },
  offerText: {
    fontSize: "1.5rem",
    marginBottom: 5
  }
}))

function OfferList({ offers }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h3 className={classes.header}>{offers.length} znalezionych ofert pracy</h3>
      <div className={classes.offerList}>
        
      </div>
    </div>
  )
}

export default OfferList;