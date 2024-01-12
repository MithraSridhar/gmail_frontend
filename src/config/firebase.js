// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0pfnZqIKibNGCKZRpkG4WDEEJYsxBA5Y",
  authDomain: "fir-react-auth-68f0d.firebaseapp.com",
  projectId: "fir-react-auth-68f0d",
  storageBucket: "fir-react-auth-68f0d.appspot.com",
  messagingSenderId: "998729284664",
  appId: "1:998729284664:web:317876fbecf151feb5facd",
  measurementId: "G-X72STVHBZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const db = app.firestore();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {  auth, provider };