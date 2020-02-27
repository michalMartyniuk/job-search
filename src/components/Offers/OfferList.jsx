import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Offer from "./Offer";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 50,
    flex: 1
  },
  inline: {
    display: "inline"
  },
  list: {
    padding: 0,
    flex: 1
  },
  listHeader: {
    padding: "12px 20px",
    color: "white",
    backgroundColor: "#424653",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingLeft: 50
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
        {offers.length
          ? offers.map(offer => {
              return <Offer key={offer.id} offer={offer} {...props} />;
            })
          : null}
      </List>
    </Paper>
  );
}
export default OfferList;
