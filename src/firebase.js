// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgv95NUCghUIR_U2k6XS0MN5V3MyqGCVY",
  authDomain: "meevo-fbb6a.firebaseapp.com",
  projectId: "meevo-fbb6a",
  storageBucket: "meevo-fbb6a.appspot.com",
  messagingSenderId: "112379943048",
  appId: "1:112379943048:web:e4c2c58efe7957baa9e73d",
  measurementId: "G-ZJ9T3T28E7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default getFirestore()