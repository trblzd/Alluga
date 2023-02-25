import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "alluga-d3c0f.firebaseapp.com",
  projectId: "alluga-d3c0f",
  storageBucket: "alluga-d3c0f.appspot.com",
  messagingSenderId: "144215520371",
  appId: "1:144215520371:web:717cccf82b69224461e606",
  measurementId: "G-JD028WPY3N",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
export { auth };
