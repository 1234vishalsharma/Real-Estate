// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {FIREBASE_API_KEY , FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MSG_ID, FIREBASE_APP_ID, FIREBASE_MES_ID} from "../keys";
const firebaseConfig = {
  apiKey:  FIREBASE_API_KEY,                               //"AIzaSyBwmlc7YyK8qsMZitiYYjBQYgjV447PjYs"
  authDomain: FIREBASE_AUTH_DOMAIN,                         // "real-estate-142ce.firebaseapp.com",
  projectId: FIREBASE_PROJECT_ID,                          // "real-estate-142ce",
  storageBucket: FIREBASE_STORAGE_BUCKET,                      // "real-estate-142ce.appspot.com",
  messagingSenderId: FIREBASE_MSG_ID,                    //"321189141571",
  appId: FIREBASE_APP_ID,                               // "1:321189141571:web:b2a7d980de0c0c02bfc8f6",
  measurementId: FIREBASE_MES_ID,                        // "G-VCTHHDZ72T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
