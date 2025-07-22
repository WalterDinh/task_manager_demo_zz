import { getFirestore } from "@firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
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
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app,'taskmanager');
