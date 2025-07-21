import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBiFDGZzwbcJPjpvrrxC4a7Cg8pzyDoHIM",
  authDomain: "demofirebase-d3191.firebaseapp.com",
  databaseURL: "https://demofirebase-d3191.firebaseio.com",
  projectId: "demofirebase-d3191",
  storageBucket: "demofirebase-d3191.firebasestorage.app",
  messagingSenderId: "808886358474",
  appId: "1:808886358474:web:c51b15c252629d93f4bf33",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db, app };
