// import app from "firebase/app";
// import "firebase/firestore";

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDS4GKJ4vzXs1jyht7T45SDLrsRaqZA6sQ",
//   authDomain: "mohib-todoist.firebaseapp.com",
//   projectId: "mohib-todoist",
//   storageBucket: "mohib-todoist.appspot.com",
//   messagingSenderId: "691824805329",
//   appId: "1:691824805329:web:1b5814e1969e87af878cf0",
//   measurementId: "G-LFJB64YWFW",
// };

// const firebase = app.initializeApp(firebaseConfig);

// export default firebase;

import Firebase from "firebase/app";
import "firebase/firestore";
// import "firebase/auth";

const config = {
  apiKey: "AIzaSyDS4GKJ4vzXs1jyht7T45SDLrsRaqZA6sQ",
  authDomain: "mohib-todoist.firebaseapp.com",
  projectId: "mohib-todoist",
  storageBucket: "mohib-todoist.appspot.com",
  messagingSenderId: "691824805329",
  appId: "1:691824805329:web:1b5814e1969e87af878cf0",
  measurementId: "G-LFJB64YWFW",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
