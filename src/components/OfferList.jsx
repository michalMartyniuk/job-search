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

const Offer = ({ job, location, city, exp_min, exp_max, salary_min, salary_max }) => {
  const classes = useStyles();
  let locationElem = location
    ? <div className={classes.offerText}>Kraj: {location}</div>
    : null
  let cityElem = city
    ? <div className={classes.offerText}>Miasto: {city}</div>
    : null
  let expElem = exp_min || exp_max
    ? <div className={classes.offerText}>Doświadczenie: {exp_min ? exp_min : 0}{exp_max ? ` - ${exp_max}` : null} {(exp_max || exp_min) > 4 ? "lat" : "lata"}</div>
    : null
  let salaryElem = salary_min || salary_max
    ? <div className={classes.offerText}>Zarobki: {salary_min ? salary_min : 0}{salary_max ? ` - ${salary_max}` : null} PLN</div>
    : null
  return (
    <div className={classes.offer}>
      <div className={classes.offerText}>Zawód: {job}</div>
      {locationElem}
      {cityElem}
      {expElem}
      {salaryElem}
    </div>
  )
}

export default function OfferList({ offers }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h3 className={classes.header}>{offers.length} znalezionych ofert pracy</h3>
      <div className={classes.offerList}>
        {offers.map(offer => {
          return <Offer
            key={offer.id}
            job={offer.job}
            location={offer.location}
            city={offer.city}
            exp_min={offer.exp_min}
            exp_max={offer.exp_max}
            salary_min={offer.salary_min}
            salary_max={offer.salary_max}
          />
        })}
      </div>
    </div>
  )
}