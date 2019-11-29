import { makeStyles } from "@material-ui/styles";

export const filtersStyles = makeStyles({
  container: {
    display: "flex",
    width: 600,
    margin: "10px auto",
    backgroundColor: "#dfdfdf",
    padding: 10
  }
});

export const filterStyles = makeStyles({
  filter: {
    margin: "0 10px",
    backgroundColor: "white",
    border: "1px solid black",
    "&:hover": {
      backgroundColor: "lightgreen",
      border: "1px solid lightblue"
    }
  },
  active: {
    margin: "0 10px",
    backgroundColor: "lightgreen",
    border: "1px solid lightblue",
    "&:hover": {
      backgroundColor: "lightgreen",
      border: "1px solid lightblue"
    }
  }
});
