import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  offerList: {

  },
  offer: {
    backgroundColor: "grey"
  }
}))

const Offer = ({ job, location, exp, salary }) => {
  const classes = useStyles();
  return (
    <div className={classes.offer}>
      <Typography variant="subtitle1">Job: {job}</Typography>
      <Typography variant="subtitle1">Location: {location}</Typography>
      <Typography variant="subtitle1">Experience: {exp}</Typography>
      <Typography variant="subtitle1">Salary: {salary}</Typography>
    </div>
  )
}

export default function OfferList({offers}) {
  const classes = useStyles();
  return <div className={classes.offerList}>
    {offers.map(offer => {
      <Offer
        job="job"
        location="location"
        exp="exp"
        salary="salary"
      />
    })}
  </div>
}