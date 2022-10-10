import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDTZL8aPL7OemIKs_774v2mSEF56RSxPrg",
  authDomain: "giftlist-8cac5.firebaseapp.com",
  projectId: "giftlist-8cac5",
  storageBucket: "giftlist-8cac5.appspot.com",
  messagingSenderId: "845798622571",
  appId: "1:845798622571:web:bd62b5c9d5069e2496f82e"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    db,
    googleAuthProvider,
    app,
    firebase
}