import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";

import { LoginServise } from '../../hooks/loginService/loginHook';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classes from './Login.module.css'
import NotAvailible from '../../components/UI/NotAvailible/NotAvailible';


const Login = () => {
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

  const [loggined, setLoggined] = useState(false);
  const [user, setUser] = useState([]);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState('');
  const navigate = useNavigate();


  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user) =>{
        console.log(user)
        user ? setLoggined(true): '';
        user ? setUser(user): '';
    })
  },[user])

  useEffect(()=>{
    loggined ? navigate('/') : '';
  },[loggined])

  const login = async () => {
      const user = await LoginServise();
      console.log(user);

      setUser(user);
      setLoggined(true);
      navigate('/');
  }

  const signInGoogle = () =>{
    const authProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(authProvider)
      .then((userCredential) => {
        setLoggined(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }

  const signInEmail = (email) => {
    const auth = getAuth();

    if(inputEmail.includes("@") || email){
      console.log('email');
      signInWithEmailAndPassword(auth, email ? email : inputEmail , inputPassword)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          if(user){
            setUser(user);
            setLoggined(true);
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessages(errorMessage);
          console.log(errorCode, errorMessage);
        });
      }
      else{
        signInUsername();
      }
    };

    const signInUsername = () =>{
      const dbRef = ref(getDatabase());
      get(child(dbRef, `usernames/${inputEmail}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          signInEmail(snapshot.val());
        } else {
          setErrorMessages('Username not found')
        }
      }).catch((error) => {
        console.error(error);
      });
    }


  return (
    <div className={classes.loginPage_container}>
      <div className={classes.login_container}>
        <div className={classes.login_box}>
          <form onSubmit={(e)=>{e.preventDefault(); signInEmail()}}>
            {/* <NotAvailible/> */}
            <input type="text" placeholder='Username or E-mail' value={inputEmail} onChange={(e)=>{setInputEmail(e.target.value)}} required/>
            <input type="password" placeholder='Password' value={inputPassword} onChange={(e)=>{setInputPassword(e.target.value)}} required/>
            {errorMessages && (
              <p style={{color:'red'}}>{errorMessages}</p>
            )}
            <button>Sign In</button>
          </form>
          <p>- Or Sign in width -</p>
          <button className={classes.signInGoogle} onClick={signInGoogle}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px">    <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z" /></svg>
            Google
          </button>
          <p>Don't have account. <Link to='/register'>Sign Up!</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
