const docs = [
  {
    job: "lekarz",
    salary: [4000, 7000],
    experience: [5],
    jobTypes: ["Medycyna"],
    countries: ["Niemcy", "Polska", "Wielka Brytania"],
    cities: ["Poznań", "Warszawa"]
  },
  {
    job: "stolarz",
    salary: [1000, 1900],
    jobTypes: ["Rzemiosło"],
    countries: ["Polska"],
    cities: ["Szczecinek"]
  },
  {
    job: "lekarz",
    experience: 5,
    salary: [5000, 11000],
    jobTypes: ["Rolnictwo"],
    countries: ["Polska", "Niemcy"],
    cities: ["Poznań", "Warszawa", "Kraków"]
  }
];

const compareProps = (propOne, propTwo) => propOne === propTwo;
const compareArrays = (arrayOne, arrayTwo) => {
  /* Compare items between arrays and returns true or false 
  if there aren't any matches. */
  const matches = arrayOne.filter(item => arrayTwo.includes(item));
  return !!matches.length;
};
const isInRange = (value, min, max) => {
  return value <= min && value < max;
};
const matchesRange = (rangeOne, rangeTwo) => {
  const minOne = rangeOne[0] || 0;
  const maxOne = rangeOne[1] || Infinity;
  const minTwo = rangeTwo[0] || 0;
  const maxTwo = rangeTwo[1] || Infinity;
  return minOne <= maxTwo && maxOne >= minTwo;
};
export const removeFalsyProps = obj => {
  let filteredObj = {};
  Object.keys(obj).map(key => {
    if (obj[key]) {
      filteredObj = { ...filteredObj, [key]: obj[key] };
    }
  });
  return filteredObj;
};
export const isDocMatching = (inputObj, docObj) => {
  const matches = Object.keys(inputObj).map(key => {
    if (typeof docObj[key] === "undefined") {
      return true;
    }
    if (key === "salary") {
      console.log(key, matchesRange(inputObj[key], docObj[key]));
      return matchesRange(inputObj[key], docObj[key]);
    }
    if (Array.isArray(inputObj[key])) {
      console.log(key, compareArrays(inputObj[key], docObj[key]));
      return compareArrays(inputObj[key], docObj[key]);
    }
    console.log(key, compareProps(inputObj[key], docObj[key]));
    return compareProps(inputObj[key], docObj[key]);
  });
  const falsyFilteredMatches = matches.filter(value => value);
  return matches.length === falsyFilteredMatches.length;
};
