// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (copy from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyDZFf1zoP2B7vUl4H47zNzGb0XTVzF0URo",
  authDomain: "contact-book-9a06a.firebaseapp.com",
  databaseURL: "https://contact-book-9a06a-default-rtdb.firebaseio.com",
  projectId: "contact-book-9a06a",
  storageBucket: "contact-book-9a06a.firebasestorage.app",
  messagingSenderId: "992167965661",
  appId: "1:992167965661:web:6269863ce5c78eda027c34",
  measurementId: "G-6EMJP5Z7DS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
