import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import appReducer from "./app/appReducer";

export default combineReducers({
  app: appReducer,
  auth: authReducer
});
// export default function rootReducer() {
//   return combineReducers({
//     app: appReducer,
//     auth: authReducer
//   });
// }
