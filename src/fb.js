import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyA6MDyaIipbAFKn1TmLE5VeFakETAwlGqw",
  authDomain: "projectmamagement-64957.firebaseapp.com",
  databaseURL: "https://projectmamagement-64957.firebaseio.com",
  projectId: "projectmamagement-64957",
  storageBucket: "projectmamagement-64957.appspot.com",
  messagingSenderId: "601469431007",
  appId: "1:601469431007:web:c488a5002e543eba168d6a",
  measurementId: "G-EFFXP2EWFV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//configuring database
const db = firebase.firestore();
db.settings({});
export default db;

