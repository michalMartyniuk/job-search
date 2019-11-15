// import docs from "./mockDocs";
// import { filterFalsyProperties } from "../../utility";
const docs = require("./mockDocs");
const filterFalsyProperties = require("../../utility");

// const userInputData = {
//   job: "stolarz",
//   jobType: "",
//   cities: ["Poznań", "Kraków"],
//   countries: ["Polska", "Francja"],
//   salary: "",
//   experience: ""
// };
const userInputData = {
  job: "stolarz",
  jobType: "",
  city: ["Poznań", "Kraków", "Warszawa"],
  country: "Polska",
  salary: "",
  experience: ""
};

const filteredData = filterFalsyProperties(userInputData);

const matchWithArray = (userKey, arr, doc) => {
  const matchingArray = arr.filter(item => item === doc[userKey]);
  if (matchingArray.length) {
    return true;
  }
  return false;
};

const filterDocs = (userData, docs) => {
  let matchingDocs = docs.map(doc => {
    const matchingArray = Object.keys(userData).map(userKey => {
      if (Array.isArray(userData[userKey])) {
        return matchWithArray(userKey, userData[userKey], doc);
      }
      return userData[userKey] === doc[userKey];
    });
    const everyInArrayMatching = matchingArray.every(item => item);
    if (everyInArrayMatching) {
      return doc;
    }
  });
  matchingDocs = matchingDocs.filter(doc => doc);
  return matchingDocs;
};

// filterDocs(filteredData, docs);
