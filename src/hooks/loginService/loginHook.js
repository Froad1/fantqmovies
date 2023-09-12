import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth';

export const LoginServise = ()=>{

  const firebaseConfig = {
      apiKey: "AIzaSyCBQCLDYlJt39h2Cnno7MQDG9qRtX3X5PE",
      authDomain: "fantqwebrtctest.firebaseapp.com",
      databaseURL: "https://fantqwebrtctest-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "fantqwebrtctest",
      storageBucket: "fantqwebrtctest.appspot.com",
      messagingSenderId: "521347400993",
      appId: "1:521347400993:web:0dc912826a963360f66a60",
      measurementId: "G-TE9C10LD9Q"
  };
     
  firebase.initializeApp(firebaseConfig);
   
  const authProvider = new firebase.auth.GoogleAuthProvider();
   
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithPopup(authProvider)
      .then((userCredential) => {
        const user = userCredential.user;      
        resolve(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        reject(errorMessage);
      });
  });
};


