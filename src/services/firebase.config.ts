// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuKkwv7XXi5darvpLs4HvVb6y1ehdG3As",
  authDomain: "lmma-web.firebaseapp.com",
  projectId: "lmma-web",
  storageBucket: "lmma-web.appspot.com",
  messagingSenderId: "923836737692",
  appId: "1:923836737692:web:5cd27533daa76baae0a559",
  measurementId: "G-2625C8BP55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
