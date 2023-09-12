import React, { useEffect, useState } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import classes from './Account.module.css'
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) =>{
            if(!user){
                navigate('/login');
            }
        })
    },[user])

    const signout = () =>{
        firebase.auth().signOut();
    }

    return (
        <div className={classes.account_container}>
            <button onClick={signout}>Sign Out</button>
        </div>
    );
};

export default Account;