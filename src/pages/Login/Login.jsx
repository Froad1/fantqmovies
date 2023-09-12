import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { LoginServise } from '../../hooks/loginService/loginHook';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


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

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user) =>{
        console.log(user)
        user ? setLoggined(true): '';
        user ? setUser(user): '';
    })
  },[user])
  const navigate = useNavigate();
  loggined ? navigate('/') : '';

  const login = async () => {
      const user = await LoginServise();
      console.log(user);

      setUser(user);
      setLoggined(true);
      navigate('/');
  }


  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
