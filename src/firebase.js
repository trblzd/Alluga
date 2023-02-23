import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBbWUDv2iCFR5-TrF3a3Ao7k3olxXdQX8o",
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
