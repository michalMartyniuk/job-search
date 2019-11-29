import { makeStyles } from "@material-ui/styles";

export const styles = makeStyles(() => ({
  paper: {
    padding: 50,
    margin: "50px auto",
    border: "2px solid #00bcd4"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center"
  },
  heading: {
    fontSize: "2.2rem",
    textAlign: "center",
    marginBottom: 40
  }
}));
