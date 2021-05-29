import firebase from 'firebase/app';
// import 'firebase/database';
// import 'firebase/'

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAuOmFslyIgKGfhYG92OAJ9Ehg52J2JzsE",
    authDomain: "notepen-ce033.firebaseapp.com",
    projectId: "notepen-ce033",
    storageBucket: "notepen-ce033.appspot.com",
    messagingSenderId: "536032148961",
    appId: "1:536032148961:web:87cd51aa6dfa9d70c566a0",
    measurementId: "G-6RFMRPCRF2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

  export default firebase;