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

const Offer = ({ job, country, city, experience, exp_max, salary, salary_max }) => {
  const classes = useStyles();
  let countryElem = country
    ? <div className={classes.offerText}>Kraj: {country}</div>
    : null
  let cityElem = city
    ? <div className={classes.offerText}>Miasto: {city}</div>
    : null
  let expElem = experience || exp_max
    ? <div className={classes.offerText}>Doświadczenie: {experience ? experience : 0}{exp_max ? ` - ${exp_max}` : null} {(exp_max || experience) > 4 ? "lat" : "lata"}</div>
    : null
  let salaryElem = salary || salary_max
    ? <div className={classes.offerText}>Zarobki: {salary ? salary : 0}{salary_max ? ` - ${salary_max}` : null} PLN</div>
    : null
  return (
    <div className={classes.offer}>
      <div className={classes.offerText}>Zawód: {job}</div>
      {countryElem}
      {cityElem}
      {expElem}
      {salaryElem}
    </div>
  )
}

function OfferList({ offers }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h3 className={classes.header}>{offers.length} znalezionych ofert pracy</h3>
      <div className={classes.offerList}>
        {offers.map(offer => {
          return <Offer
            key={offer.id}
            job={offer.job}
            country={offer.country}
            city={offer.city}
            experience={offer.experience}
            exp_max={offer.exp_max}
            salary={offer.salary}
            salary_max={offer.salary_max}
          />
        })}
      </div>
    </div>
  )
}

export default OfferList;