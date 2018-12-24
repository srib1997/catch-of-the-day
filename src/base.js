import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBujQ8K7shHzOdoo9QPht5opkFTg7mGU7w",
  authDomain: "catch-of-the-day-12fdc.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-12fdc.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database())

// This is a name export
export {firebaseApp}

// This is a default export
export default base
