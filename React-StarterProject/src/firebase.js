// src/firebase.js
import firebase from "firebase"

// PASTE FIREBASE CODE HERE (before "export default firebase;")
// It should look similar to the following:
// // Initialize Firebase
// var config = {
//   apiKey: "XXXXXXX",
//   authDomain: "XXXXX",
//   databaseURL: "XXXXXX",
//   projectId: "XXXXXXX",
//   storageBucket: "XXXXXXX",
//   messagingSenderId: "XXXXXXX"
// };
// firebase.initializeApp(config);
/*<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.0.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->*/


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCS8_5cl7HVTHDBigKq89mzf4H4umEfaM8",
    authDomain: "project1-b18ce.firebaseapp.com",
    databaseURL: "https://project1-b18ce.firebaseio.com",
    projectId: "project1-b18ce",
    storageBucket: "",
    messagingSenderId: "797228671120",
    appId: "1:797228671120:web:d965b72303e9f3c07cb815"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



export default firebase;
