import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// eslint-disable-next-line
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/compat/functions";

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

export const auth = firebase.auth();
export const storage = getStorage(app);
export const db = getFirestore(app);
export const functions = app.functions();
//export const signOut = firebase.auth.signOut();
