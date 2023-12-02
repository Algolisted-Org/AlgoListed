// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAV5JUr0aJ_hth6o8akGyIsR7qRjyw-Gdw",
  authDomain: "algolisted-7fc44.firebaseapp.com",
  projectId: "algolisted-7fc44",
  storageBucket: "algolisted-7fc44.appspot.com",
  messagingSenderId: "660029461893",
  appId: "1:660029461893:web:c1c31b0c4e90f0eae820ec",
  measurementId: "G-REGNB1CS34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export default app;