// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbWUDv2iCFR5-TrF3a3Ao7k3olxXdQX8o",
  authDomain: "alluga-d3c0f.firebaseapp.com",
  projectId: "alluga-d3c0f",
  storageBucket: "alluga-d3c0f.appspot.com",
  messagingSenderId: "144215520371",
  appId: "1:144215520371:web:717cccf82b69224461e606",
  measurementId: "G-JD028WPY3N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
