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
      if (Array.isArray(obj[key]) && !obj[key].length) {
        return;
      }
      filteredObj = { ...filteredObj, [key]: obj[key] };
    }
  });
  return filteredObj;
};
export const getItemWithId = (id, collection) => {
  // console.log(collection);
  return collection.filter(item => item.id === id)[0];
}
export const isDocMatching = (inputObj, docObj) => {
  const inputs = removeFalsyProps(inputObj);
  const matches = Object.keys(inputs).map(key => {
    if (typeof docObj[key] === "undefined") {
      return true;
    }
    if (key === "salary") {
      return matchesRange(inputs[key], docObj[key]);
    }
    if (Array.isArray(inputs[key])) {
      return compareArrays(inputs[key], docObj[key]);
    }
    return compareProps(inputs[key], docObj[key]);
  });
  const falsyFilteredMatches = matches.filter(value => value);
  return matches.length === falsyFilteredMatches.length;
};
