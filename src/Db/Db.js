import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8V090i1kxPrlgUTAxX9Cz_ixysQSxkJc",
  authDomain: "flip-docs-1f9a3.firebaseapp.com",
  projectId: "flip-docs-1f9a3",
  storageBucket: "flip-docs-1f9a3.appspot.com",
  messagingSenderId: "137274289667",
  appId: "1:137274289667:web:35788bd81724c7107be836",
  measurementId: "G-R97JNLB46V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const Db = getFirestore(app);
