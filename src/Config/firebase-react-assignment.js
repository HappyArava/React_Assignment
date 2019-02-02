import firebase from 'firebase';
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
firebase.initializeApp(config);
const database = firebase.database();
export default database;
