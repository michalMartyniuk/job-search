<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@fortawesome/fontawesome-free/css/all.min.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { rootReducer } from './store/rootReducer';
=======
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./store/rootReducer";
>>>>>>> 40fdedf823d3a2ccc898fdce1f189dbbfbd74221

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
<<<<<<< HEAD
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
=======
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
>>>>>>> 40fdedf823d3a2ccc898fdce1f189dbbfbd74221
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
