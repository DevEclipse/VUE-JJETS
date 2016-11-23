import firebase from 'firebase'

const firebase_config = {
  apiKey: "AIzaSyCDc-cZsPDvEJunFh_fvrXACuzlASX9iJM",
  authDomain: "jjets-1e39b.firebaseapp.com",
  databaseURL: "https://jjets-1e39b.firebaseio.com",
  storageBucket: "jjets-1e39b.appspot.com",
  messagingSenderId: "433322078391"
}

const firebaseApp = firebase.initializeApp(firebase_config)

const db = firebaseApp.database()

export default db
