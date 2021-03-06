import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

export default createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
    myColor: "#efa"
  },
  status: {
    danger: "orange",
    success: "lightgreen"
  }
});
