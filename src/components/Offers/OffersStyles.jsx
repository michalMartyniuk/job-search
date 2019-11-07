import { Grid } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/styles";

export const StyledGrid = styles => withStyles(styles)(Grid);
export const StyledListItemText = styles => withStyles(styles)(ListItemText);

export const textStyles = {
  primary: {
    fontSize: "1.3rem"
  },
  secondary: {
    fontSize: "1.3rem"
  }
};
export const gridStyles = {
  container: {
    padding: "10px 20px",
    "&:hover": {
      backgroundColor: "#ddd"
    }
  }
};
