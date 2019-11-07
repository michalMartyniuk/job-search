import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Offer from "./Offer";

const useStyles = makeStyles(theme => ({
  root: {
    width: 1200,
    backgroundColor: theme.palette.background.paper,
    margin: "0px auto",
    marginBottom: 50
  },
  inline: {
    display: "inline"
  },
  list: {
    padding: 0
  },
  listHeader: {
    padding: "12px 20px",
    color: "white",
    backgroundColor: "#424653",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  listHeaderText: {
    fontSize: "1.6rem"
  }
}));

export default function OfferList({ offers, title }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <List className={classes.list}>
        <div className={classes.listHeader}>
          <Typography variant="body1" className={classes.listHeaderText}>
            {title}
          </Typography>
        </div>
        <Offer
          job="Zawód"
          jobType="Branża"
          country="Kraj"
          city="Miasto"
          experience="Doświadczenie"
          salary="Wynagrodzenie"
          fontSize="1.4rem"
        />
        {offers.map(offer => {
          return (
            <Offer
              key={offer.id}
              job={offer.job}
              jobType={offer.jobType}
              country={offer.country}
              city={offer.city}
              experience={offer.experience}
              salary={offer.salary}
              fontSize="1.3rem"
            />
          );
        })}
      </List>
    </Paper>
  );
}
