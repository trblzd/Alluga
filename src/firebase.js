import firebase from "firebase/compat/app";
import "firebase/compat/functions";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "alluga-d3c0f.firebaseapp.com",
  projectId: "alluga-d3c0f",
  storageBucket: "alluga-d3c0f.appspot.com",
  messagingSenderId: "144215520371",
  appId: "1:144215520371:web:717cccf82b69224461e606",
  measurementId: "G-JD028WPY3N",
};

export let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
export const auth = firebase.auth();
export const storage = getStorage(app);
export const db = getFirestore(app);
export const functions = firebase.functions(); // add this line

// Now you can call functions() method to get an instance of the Functions service
const sendMail = functions.httpsCallable("sendMail");
