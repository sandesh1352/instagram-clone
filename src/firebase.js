
  import firebase from 'firebase';

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCAA9DkL4hWe4gmNHrbbdWXeoqrDLoBBz4",
    authDomain: "instagram-clone-react-b8ebd.firebaseapp.com",
    projectId: "instagram-clone-react-b8ebd",
    storageBucket: "instagram-clone-react-b8ebd.appspot.com",
    messagingSenderId: "902518398733",
    appId: "1:902518398733:web:123f0c9045e8c0379b5a44"
      
    

  })
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  
  export {db,auth,storage}