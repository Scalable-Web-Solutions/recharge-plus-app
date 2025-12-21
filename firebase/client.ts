// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLD9PWdXPUuCtZlCqdJfOvpU10JonHW7s",
  authDomain: "rechargeplus-c7ddd.firebaseapp.com",
  projectId: process.env.FB_PROJ_ID,
  storageBucket: "rechargeplus-c7ddd.firebasestorage.app",
  messagingSenderId: "873805158710",
  appId: "1:873805158710:web:a00a1bb6878c65bb55bb97",
  measurementId: "G-JTV1ZT8LC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);