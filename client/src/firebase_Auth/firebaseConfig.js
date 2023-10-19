import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCPd-MrdV1Z8X3OvGIXfbYicuPDyNL05XA",
  authDomain: "hacktoberfest-51303.firebaseapp.com",
  projectId: "hacktoberfest-51303",
  storageBucket: "hacktoberfest-51303.appspot.com",
  messagingSenderId: "691596713690",
  appId: "1:691596713690:web:7e71b3888c9b6066058fe3",
  measurementId: "G-9FSLQGS5PC"
};

const app = initializeApp(firebaseConfig);
export default app;