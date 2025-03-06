// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkyKZybnzuBOh16QDXtSf3cCsiBNP7Mag",

  authDomain: "diabeticvirtualassistant.firebaseapp.com",

  projectId: "diabeticvirtualassistant",

  storageBucket: "diabeticvirtualassistant.firebasestorage.app",

  messagingSenderId: "965268653652",

  appId: "1:965268653652:web:886c2c5e43c58552930fc1",

  measurementId: "G-NT2LPXT82Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app);
export const auth = getAuth();
