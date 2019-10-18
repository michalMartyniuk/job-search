import { authReducer } from './auth/authReducer';
import { appReducer } from './app/appReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
})