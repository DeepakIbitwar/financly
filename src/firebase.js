// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore, doc, setDoc} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoRlsFq6xn9H9xZMkEkemWwiw6DHvFkac",
  authDomain: "finance-tracker-b3eee.firebaseapp.com",
  projectId: "finance-tracker-b3eee",
  storageBucket: "finance-tracker-b3eee.appspot.com",
  messagingSenderId: "962200522233",
  appId: "1:962200522233:web:b16611dddf4b6e8abc8128",
  measurementId: "G-YRQRQV0X5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth = getAuth(app);
const provider=new GoogleAuthProvider();
export {db, auth,provider,doc,setDoc}