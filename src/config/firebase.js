// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArQz5pQDQUuqhivQIa5hpLiD37AYP5CyA",
  authDomain: "travelapp-fa9c9.firebaseapp.com",
  projectId: "travelapp-fa9c9",
  storageBucket: "travelapp-fa9c9.firebasestorage.app",
  messagingSenderId: "268639454818",
  appId: "1:268639454818:web:48430d0a0a9ac08592333b",
  measurementId: "G-H4EEQ8XN6Z"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
export default app;
