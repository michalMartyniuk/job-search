import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Offer from "./Offer";

const useStyles = makeStyles(theme => ({
  root: {
    width: 1200,
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

function OfferList({ offers, title, ...props }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <List className={classes.list}>
        <div className={classes.listHeader}>
          <Typography variant="body1" className={classes.listHeaderText}>
            {title}
          </Typography>
        </div>
        {offers.map(offer => {
          return <Offer key={offer.id} offer={offer} {...props} />;
        })}
      </List>
    </Paper>
  );
}
export default OfferList;
