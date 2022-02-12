// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.HEPHAESTUS_FIREBASE_API_KEY,
  authDomain:  process.env.HEPHAESTUS_FIREBASE_AUTH_DOMAIN,
  databaseURL:  process.env.HEPHAESTUS_FIREBASE_DATABASE_URL,
  projectId:  process.env.HEPHAESTUS_FIREBASE_PROJECT_ID,
  storageBucket:  process.env.HEPHAESTUS_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:  process.env.HEPHAESTUS_FIREBASE_MESSAGING_SENDER_ID,
  appId:  process.env.HEPHAESTUS_FIREBASE_APP_ID
};

// Initialize Firebase Services
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const storage = getStorage(app)

// export the service objects
export {db, storage}
