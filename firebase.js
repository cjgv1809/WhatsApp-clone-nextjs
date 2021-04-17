import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCExtGk4_c6pp0i2j5AmjVnmIyp5fY_no",
  authDomain: "whatsapp-clone-nextjs-6fd42.firebaseapp.com",
  projectId: "whatsapp-clone-nextjs-6fd42",
  storageBucket: "whatsapp-clone-nextjs-6fd42.appspot.com",
  messagingSenderId: "729966656022",
  appId: "1:729966656022:web:f5e83430dbefedfb52d337",
  measurementId: "G-P511DWRJWN",
};

// To prevent to initializeApp a second time while using SSR
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
