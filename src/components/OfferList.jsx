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
    justifyContent: "center",
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

const Offer = ({ job, location, exp, salary }) => {
  const classes = useStyles();
  let locationElem = location
    ? <div className={classes.offerText}>Location: {location}</div>
    : null
  let expElem = exp
    ? <div className={classes.offerText}>Experience: {exp} {exp > 4 ? "lat" : "lata"}</div>
    : null
  let salaryElem = exp
    ? <div className={classes.offerText}>Salary: {salary} PLN</div>
    : null
  return (
    <div className={classes.offer}>
      <div className={classes.offerText}>Job: {job}</div>
      {locationElem}
      {expElem}
      {salaryElem}
    </div>
  )
}

export default function OfferList({ offers }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h3 className={classes.header}>{offers.length} job offers found</h3>
      <div className={classes.offerList}>
        {offers.map(offer => {
          return <Offer
            key={offer.id}
            job={offer.job}
            location={offer.location}
            exp={offer.exp}
            salary={offer.salary}
          />
        })}
      </div>
    </div>
  )
}