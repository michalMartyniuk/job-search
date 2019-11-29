import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import appReducer from "./app/appReducer";
import formReducer from "./form/formReducer";

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  form: formReducer
});
