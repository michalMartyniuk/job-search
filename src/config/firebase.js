import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAq-SF4ULgN-CJXM0pYtNRNzpqyt8tvZms",
  authDomain: "emp-unemp.firebaseapp.com",
  databaseURL: "https://emp-unemp.firebaseio.com",
  projectId: "emp-unemp",
  storageBucket: "",
  messagingSenderId: "654975720357",
  appId: "1:654975720357:web:d98f57ef91a4969449a64c",
  measurementId: "G-ZXZQXR09HP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;