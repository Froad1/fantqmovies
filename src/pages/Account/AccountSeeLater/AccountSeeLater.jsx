import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './AccountSeeLater.module.css'
import Cards from '../../../components/UI/Cards/Cards';

const AccountSeeLater = () => {
    const [seeNowList, setSeeNowList] = useState([])
    const [user, setUser] = useState([]);

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

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) =>{
            user ? setUser(user): '';
        })
        getSeeNowList()
    },[user])

    useEffect(()=>{
    })

    const getSeeNowList = () =>{
        const firestore = firebase.firestore()
        const db = firestore.collection('users').doc(user.uid).collection('seelater')
        db.orderBy('date', 'desc').get()
        .then(querySnapshot =>{
            const data = querySnapshot.docs.map(doc => {
                return {
                   id: doc.id,
                   type: doc.data().type,
                };
            });
            console.log(data)
            setSeeNowList(data)
        })
    }

    const navigate = useNavigate();

    const ratings = () =>{
        navigate('/account');
    }
    const seeNow = () => {
        navigate('/account/seenow')
    }
    return (
        <div className={classes.see_later_container}>
            <button onClick={ratings}>Рейтинг</button>
            <button onClick={seeNow}>Дивлюся зараз</button>
            <div className={classes.cards}>
                {seeNowList.map(doc =>(
                    <Cards key={doc.id} id={doc.id} type={doc.type} page='seelater'/>
                ))}
            </div>
        </div>
    );
};

export default AccountSeeLater;