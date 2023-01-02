// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKZF7Zb9VROWsRl-HmiCQg-F1zsd1MQlY",
  authDomain: "year-old.firebaseapp.com",
  projectId: "year-old",
  storageBucket: "year-old.appspot.com",
  messagingSenderId: "947016283031",
  appId: "1:947016283031:web:895289a79f8bc103eccad2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
