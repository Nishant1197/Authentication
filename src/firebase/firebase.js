// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import config from "../config";
let {WEB_API_KEY}=config
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:WEB_API_KEY ,
  authDomain: "authentication-project-5d5f7.firebaseapp.com",
  projectId: "authentication-project-5d5f7",
  storageBucket: "authentication-project-5d5f7.appspot.com",
  messagingSenderId: "55193361742",
  appId: "1:55193361742:web:a90e06d9845af38a9d921f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("firebase");
