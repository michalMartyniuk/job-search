import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Paper, Grid } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 1200,
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
    marginTop: 100
  },
  inline: {
    display: "inline"
  },
  list: {
    padding: 0
  },
  listHeader: {
    padding: "20px 20px",
    color: "white",
    backgroundColor: "#424653",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  listHeaderText: {
    fontSize: "2rem"
  }
}));

const StyledDivider = withStyles(() => ({
  root: {}
}))(Divider);
const StyledListItemText = withStyles(() => ({
  primary: {
    fontSize: "1.5rem"
  },
  secondary: {
    fontSize: "1.3rem"
  }
}))(ListItemText);

const Offer = props => {
  const StyledGridContainer = withStyles(() => ({
    container: {
      padding: 8,
      "&:hover": {
        backgroundColor: "#ddd"
      }
    }
  }))(Grid);
  return (
    <>
      <StyledGridContainer container>
        {Object.entries(props).map(prop => {
          const [key, value] = prop;
          return (
            <Grid item xs={2}>
              <StyledListItemText primary={value} />
            </Grid>
          );
        })}
      </StyledGridContainer>
      <StyledDivider component="li" />
    </>
  );
};
export default function OfferList({ offers }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <List className={classes.list}>
        <div className={classes.listHeader}>
          <Typography variant="body1" className={classes.listHeaderText}>
            Oferty pracy
          </Typography>
        </div>
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
            />
          );
        })}
      </List>
    </Paper>
  );
}
