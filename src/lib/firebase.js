import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCYyWNfA06cfE39bB3dwDvup9x6MvHWD2A",
  authDomain: "mohibk-craftilo.firebaseapp.com",
  projectId: "mohibk-craftilo",
  storageBucket: "mohibk-craftilo.appspot.com",
  messagingSenderId: "1079616889274",
  appId: "1:1079616889274:web:de4e43ca22b033e21ffd83",
  measurementId: "G-85H93S5XCJ",

  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
const auth = firebase.auth();

export { firebase, FieldValue, auth };
