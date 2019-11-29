import { makeStyles } from "@material-ui/styles";

export const styles = makeStyles(() => ({
  buttonsContainer: {
    display: "flex"
  },
  button: {
    color: "white",
    backgroundColor: "#00bcd4",
    marginTop: 40,
    marginRight: 20,
    height: 50,
    fontSize: "1.2rem",
    "&:hover": {
      backgroundColor: "#008c9e"
    }
  },
  buttonAllOffers: {
    marginTop: 20,
    height: 50,
    fontSize: "1.2rem",
    color: "white",
    backgroundColor: "#00bcd4",
    "&:hover": {
      backgroundColor: "#008c9e"
    }
  },
}));