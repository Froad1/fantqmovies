import React, { useEffect, useState } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import classes from './AccountMobile.module.css';
import { Link, useNavigate } from 'react-router-dom';
import NotAvailible from '../../../components/UI/NotAvailible/NotAvailible';

const AccountMobile = () => {
    const [user, setUser] = useState([]);
    const [customLists, setCustomLists] = useState([]);
    const [customListsData, setCustomListsData] = useState([]);
    const [seeAddListModel, setSeeAddListModel] = useState(false);
    const navigate = useNavigate();



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
            if(user){
                checkCustomLists();
                setUser(user);
            }
            else navigate('/login');
        })
    },[user]);

    const checkCustomLists = () =>{
        const firestore = firebase.firestore();
        const db = firestore.collection('users').doc(user.uid);
        db.get()
        .then(e =>{
            if(e.data().collectionList){
                setCustomLists(e.data().collectionList);
            }
        })
    }

    // useEffect(()=>{
    //     if(customLists){
    //         getCustomListData();
    //     }
    // },[customLists])

    // const getCustomListData = () =>{
    //     const firestore = firebase.firestore();

    //     customLists.map((name)=>{
    //         const db = firestore.collection('users').doc(user.uid).collection(name);
    //         db.get()
    //         .then(querySnapshot =>{
    //             const data = querySnapshot.docs.map(doc => {
    //                 return {
    //                     id: doc.id,
    //                     type: doc.data().type,
    //                     title: doc.data().title,
    //                 };
    //             });
    //             console.log({name, data});
    //         }); 
    //     });
    // }

    const changeTheme = ()=>{
        var root = document.documentElement;

        if (root.getAttribute('data-color-scheme') === 'dark') {
          root.setAttribute('data-color-scheme', 'light');
        } else {
          root.setAttribute('data-color-scheme', 'dark');
        }
    }

    const signout = () =>{
        firebase.auth().signOut();
    }

    return (
        <div className={classes.main}>
            <button onClick={changeTheme}>Змінити тему</button>
            <button className={classes.signout_button} onClick={signout}>Sign Out</button>
            <div className={classes.lists_container}>
                {customLists && customLists.map((e)=>(
                    <Link to={`/list/${e}`} key={e} className={classes.list}>
                        <div className={classes.first_block}></div>
                        <div className={classes.second_block}></div>
                        <p className={classes.list_title}>{e}</p>
                    </Link>
                ))}
                <div onClick={()=>{setSeeAddListModel(!seeAddListModel)}} className={classes.list}>
                    <NotAvailible/>
                    <div className={classes.first_block}>
                        <svg className={classes.add_list_icon} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    </div>
                    <div className={classes.second_block}></div>
                    <p className={classes.list_title}>Add new list</p>
                </div>
            </div>
            {seeAddListModel && (
                <>
                    <div onClick={()=>{setSeeAddListModel(!seeAddListModel)}} className={classes.overlay}></div>
                    <div className={classes.addnewlist_container}>
                        <div className={classes.addnewlist}>
                            <div className={classes.list}>
                                <div className={classes.first_block}>
                                <svg className={classes.add_list_icon} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                                </div>
                                <div className={classes.second_block}></div>
                            </div>
                            <div className={classes.controls}>
                                <input type="text" placeholder='Type list name'/>
                                <button>Confirm</button>
                            </div>
                        </div>
                    </div>    
                </>
            )}

        </div>
    );
};

export default AccountMobile;