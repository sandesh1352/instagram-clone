
  import firebase from 'firebase';

  const firebaseApp = firebase.initializeApp({
      apiKey: "AIzaSyA7ekoCuHIsAIGS1qzh0JRfxi6Lfk25Qd0",
      authDomain: "instagram-clone-react-42a9f.firebaseapp.com",
      projectId: "instagram-clone-react-42a9f",
      storageBucket: "instagram-clone-react-42a9f.appspot.com",
      messagingSenderId: "714305917105",
      appId: "1:714305917105:web:44766105067db03b0c5290",
      measurementId: "G-Z06PQT40QC"
    

  })
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  
  export {db,auth,storage}