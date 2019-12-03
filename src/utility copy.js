const docs = [
  {
    job: "lekarz",
    experience: 5,
    jobTypes: ["Medycyna"],
    countries: ["Niemcy", "Polska", "Wielka Brytania"],
    cities: ["Poznań", "Warszawa"]
  },
  {
    job: "stolarz",
    experience: 2,
    jobTypes: ["Rzemiosło"],
    countries: ["Polska"],
    cities: ["Szczecinek"]
  },
  {
    job: "farmer",
    experience: 7,
    jobTypes: ["Rolnictwo"],
    countries: ["Polska", "Niemcy"],
    cities: ["Poznań", "Warszawa", "Kraków"]
  }
];

const inputs = {
  job: "lekarz",
  experience: 7,
  jobTypes: ["Medycyna", "Rolnictwo"],
  countries: ["Polska"],
  cities: ["Warszawa", "Szczecin"]
};

const compareProps = (propOne, propTwo) => propOne === propTwo;
const compareArrays = (arrayOne, arrayTwo) => {
  /* Compare items between arrays and returns true or false 
  if there aren't any matches. */
  const matches = arrayOne.filter(item => arrayTwo.includes(item));
  return !!matches.length;
};

const isDocMatching = (inputObj, docObj) => {
  const matches = Object.keys(inputObj).map(key => {
    if (Array.isArray(inputObj[key])) {
      return compareArrays(inputObj[key], docObj[key]);
    }
    // Match min max range of salaryMin-salaryMax
    // Match min max range of expMin-expMax
    return compareProps(inputObj[key], docObj[key]);
  });
  const falsyFilteredMatches = matches.filter(value => value);
  return matches.length === falsyFilteredMatches.length;
};

console.log(isDocMatching(inputs, docs[0]));
