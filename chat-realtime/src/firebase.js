import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCUxRD55_FU_1sGnq5pV6VFo5ACV8nugw8",
  authDomain: "curd-firestore.firebaseapp.com",
  projectId: "curd-firestore",
  storageBucket: "curd-firestore.appspot.com",
  messagingSenderId: "938117605694",
  appId: "1:938117605694:web:5a3617ddd4445ad3d2a46f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }