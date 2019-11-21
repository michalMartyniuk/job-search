export const filterFalsyProperties = obj => {
  const filteredObject = {};
  Object.keys(obj).map(key => {
    if (obj[key]) filteredObject[key] = obj[key];
  });
  return filteredObject;
};

export const filterDocs = (userData, docs) => {
  const matchWithArray = (userKey, arr, doc) => {
    const matchingArray = arr.filter(item => item === doc[userKey]);
    if (matchingArray.length) return true;
    return false;
  };
  let matchingDocs = docs.map(doc => {
    const matchingArray = Object.keys(userData).map(userKey => {
      if (Array.isArray(userData[userKey])) {
        return matchWithArray(userKey, userData[userKey], doc);
      }
      return userData[userKey] === doc[userKey];
    });
    if (matchingArray.every(item => item)) return doc;
  });
  matchingDocs = matchingDocs.filter(doc => doc);
  return matchingDocs;
};
