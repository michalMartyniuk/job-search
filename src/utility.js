const getObjArrayKeys = obj => {
  /* Filter object keys which values are arrays and return array of them (keys) */
  return Object.keys(obj).filter(key => Array.isArray(obj[key]));
};
const arrayInObject = (dataObj, callback) => {
  // Map userData, if property is an Array, call function on it and
  // return resulting array. Then, falsy values in array are filtered.
  const results = Object.keys(dataObj).map(key => {
    const value = dataObj[key];
    if (Array.isArray(value)) {
      return callback(key, value);
    }
  });
  return results.filter(item => item);
};

const filterKeys = (obj, callback) => {
  /* Returns array of obj keys which are passing callback function 
    or false if none are matching */
  const resultKeys = Object.keys(obj).filter(key => {
    return callback(key);
  });
  return resultKeys.length ? resultKeys : false;
};

const testObjProps = obj => {
  /* Test object's properties for falsy values or empty array value, 
    returns array of bool values. */
  return Object.keys(obj).map(key => {
    if (Array.isArray(obj[key])) {
      return !!obj[key].length;
    }
    return obj[key];
  });
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
