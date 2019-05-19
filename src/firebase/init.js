import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCBHOs_HexgGhd_ufRUEIyx0YH3j46y4Lc",
    authDomain: "agent-dsml-evaluation-tool.firebaseapp.com",
    databaseURL: "https://agent-dsml-evaluation-tool.firebaseio.com",
    projectId: "agent-dsml-evaluation-tool",
    storageBucket: "agent-dsml-evaluation-tool.appspot.com",
    messagingSenderId: "443608834828",
    appId: "1:443608834828:web:238bee88110a1d49"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore();