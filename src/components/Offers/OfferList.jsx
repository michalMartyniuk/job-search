import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Offer from "./Offer";
import {
  applyToOffer,
  saveOffer,
  editOffer,
  closeOffer
} from "../../store/app/appActions";

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

function OfferList({
  offers,
  title,
  loggedIn = false,
  accountType,
  applyToOffer,
  saveOffer,
  editOffer,
  closeOffer
}) {
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
          return (
            <Offer
              key={offer.id}
              id={offer.id}
              job={offer.job}
              jobTypes={offer.jobTypes}
              countries={offer.countries}
              cities={offer.cities}
              experience={offer.experience}
              salary={offer.salary}
              date={offer.date}
              owner={offer.owner}
              loggedIn={loggedIn}
              accountType={accountType}
              apply={() => applyToOffer(offer.id)}
              save={() => saveOffer(offer.id)}
              edit={() => editOffer(offer.id)}
              close={() => closeOffer(offer.id)}
            />
          );
        })}
      </List>
    </Paper>
  );
}

const mapStateToProps = state => ({ ...state.auth, ...state.app });
const mapDispatchToProps = dispatch => ({
  applyToOffer: offerId => dispatch(applyToOffer(offerId)),
  saveOffer: offerId => dispatch(saveOffer(offerId)),
  editOffer: offerId => dispatch(editOffer(offerId)),
  closeOffer: offerId => dispatch(closeOffer(offerId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferList);
