// import { makeStyles } from "@material-ui/styles";

// const form__input = () => {
//   const form__input = {
//     width: 328
//   };
//   const input__label = {
//     fontSize: "1.5rem"
//   };
//   const input__input = {
//     fontSize: "1.5rem",
//     marginBottom: 20
//   };
//   return { form__input, input__label, input__input };
// };

// const form__filters = () => {
//   const form__filters = {
//     display: "flex",
//     flexDirection: "column",
//     width: 600,
//     backgroundColor: "#dfdfdf",
//     padding: 10
//   };
//   const filters__category = {
//     display: "flex",
//     flexDirection: "column",
//     margin: "10px 0"
//   };
//   const category__filters = {
//     display: "flex"
//   };
//   const category__filter = {
//     margin: "0 10px",
//     backgroundColor: "white",
//     border: "1px solid black",
//     "&:hover": {
//       backgroundColor: "lightgreen",
//       border: "1px solid lightblue"
//     }
//   };
//   const category__filter_active = {
//     ...category__filter,
//     backgroundColor: "lightgreen",
//     border: "1px solid lightblue"
//   };
//   return {
//     form__filters,
//     filters__category,
//     category__filters,
//     category__filter,
//     category__filter_active
//   };
// };

// const form__buttons = () => {
//   const form__buttons = {
//     display: "flex"
//   };
//   const buttons__button = {
//     color: "white",
//     backgroundColor: "#00bcd4",
//     marginTop: 40,
//     marginRight: 20,
//     height: 50,
//     fontSize: "1.2rem",
//     "&:hover": {
//       backgroundColor: "#008c9e"
//     }
//   };
//   const buttons__button_allOffers = {
//     ...buttons__button,
//     marginTop: 20
//   };
//   return {
//     form__buttons,
//     buttons__button,
//     buttons__button_allOffers
//   };
// };

// export const formStyles = makeStyles(() => ({
//   form: {
//     padding: 50,
//     margin: "50px auto",
//     border: "2px solid #00bcd4"
//   },
//   form__form: {
//     display: "flex",
//     flexDirection: "column",
//     justifyItems: "center",
//     alignItems: "center"
//   },
//   form__heading: {
//     fontSize: "2.2rem",
//     textAlign: "center",
//     marginBottom: 40
//   },
//   ...form__input(),
//   ...form__filters(),
//   ...form__buttons()
// }));
