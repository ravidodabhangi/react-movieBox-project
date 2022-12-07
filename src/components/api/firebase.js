
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZhAp4HbfqIJg0PB9SvzvjSQDRQLhSvCk",
  authDomain: "themoviebox-2a542.firebaseapp.com",
  projectId: "themoviebox-2a542",
  storageBucket: "themoviebox-2a542.appspot.com",
  messagingSenderId: "974473478425",
  appId: "1:974473478425:web:3373ed6fec29909b048588"
};

// Initialize Firebase
const firebase=initializeApp(firebaseConfig);
export let auth=getAuth(firebase);
export let storage=getStorage(firebase);