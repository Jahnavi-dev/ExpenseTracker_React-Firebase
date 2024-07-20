import { initializeApp } from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAlqE52JLRgy1vzWp_S8IfBQ_qAiG8O4JY",
    authDomain: "expense-tracker-d7d91.firebaseapp.com",
    projectId: "expense-tracker-d7d91",
    storageBucket: "expense-tracker-d7d91.appspot.com",
    messagingSenderId: "142075229872",
    appId: "1:142075229872:web:e426a638f24d9426172d75",
    measurementId: "G-NMKQG3R45Q"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
// const db = getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const provider=new GoogleAuthProvider()
export const db=getFirestore(app)
//firebase login
//firebase init
//firebase deploy

export { app };