import { makeStyles } from "@material-ui/styles";

export const formStyles = makeStyles(() => ({
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

export const filtersStyles = makeStyles({
  container: {
    display: "flex"
  }
});

export const inputStyles = makeStyles(() => ({
  formControl: {
    width: 328
  },
  input: {
    fontSize: "1.5rem",
    marginBottom: 20
  },
  inputLabel: {
    fontSize: "1.5rem"
  }
}));

export const buttonStyles = makeStyles(() => ({
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
  }
}));
