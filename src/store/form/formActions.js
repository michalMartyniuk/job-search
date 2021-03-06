/* eslint-disable consistent-return */
import { types } from "./formTypes";

export const resetForm = () => ({ type: types.RESET_FORM });
export const setJob = value => ({ type: types.SET_JOB, value });
export const setJobTypes = value => ({ type: types.SET_JOB_TYPES, value });
export const setName = value => ({ type: types.SET_NAME, value });
export const setExperience = value => ({ type: types.SET_EXPERIENCE, value });
export const setKeySkills = value => ({ type: types.SET_KEY_SKILLS, value });
export const setSalary = values => {
  return { type: types.SET_SALARY, values };
};
export const setDescription = value => ({ type: types.SET_DESCRIPTION, value });
export const setPlaceCount = value => {
  return { type: types.SET_PLACE_COUNT, value };
};
export const setProcessLength = value => ({
  type: types.SET_PROCESS_LENGTH,
  value
});
export const decreasePlaceCount = () => ({ type: types.DECREACE_PLACE_COUNT });
export const setCities = value => ({ type: types.SET_CITIES, value });
export const setCountries = value => ({ type: types.SET_COUNTRIES, value });
export const setEditMode = offer => {
  return { type: types.SET_EDIT_MODE, offer };
};
