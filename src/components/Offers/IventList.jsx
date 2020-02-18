import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Ivent from "./Ivent";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // margin: "0px auto",
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
    borderTopRightRadius: 4,
    paddingLeft: 50,
    minWidth: 400
  },
  listHeaderText: {
    fontSize: "1.6rem"
  }
}));

function IventList({ ivents, title, ...props }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <List className={classes.list}>
        <div className={classes.listHeader}>
          <Typography variant="body1" className={classes.listHeaderText}>
            {title}
          </Typography>
        </div>
        {ivents.map(ivent => {
          return <Ivent key={ivent.id} ivent={ivent} {...props} />;
        })}
      </List>
    </Paper>
  );
}
export default IventList;
