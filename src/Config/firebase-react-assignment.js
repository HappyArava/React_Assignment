import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyARs0JhFunnXzajVrXlV_4ilnQoZuGieRQ",
    authDomain: "react-assignment-3889e.firebaseapp.com",
    databaseURL: "https://react-assignment-3889e.firebaseio.com",
    projectId: "react-assignment-3889e",
    storageBucket: "react-assignment-3889e.appspot.com",
    messagingSenderId: "576380880451"
  };
firebase.initializeApp(config);
const database = firebase.database();
export default database;