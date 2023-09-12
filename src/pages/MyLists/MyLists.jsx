import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './MyLists.module.css'
import MyInput from '../../components/UI/MyInput/MyInput';
import Cards from '../../components/UI/Cards/Cards';
import PostService from '../../API/PostService';

const MyLists = () => {
    const [loggined, setLoggined] = useState(false);
    const [user, setUser] = useState([]);
    const [selectedList, setSelectedList] = useState('rating');
    const [searchQuery, setSearchQuery] = useState('');
    const [ratingListData, setRatingListData] = useState([]);
    const [favoriteListData, setFavoriteListData] = useState([]);
    const [watchlistListData, setWathlistListData] = useState([]);
    const [customLists, setCustomLists] = useState([]);
    const [customListsData, setCustomListsData] = useState([]);
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
                setLoggined(true);
                setUser(user);
                getRatingListData();
                checkCustomLists();
            }
            else navigate('/login')
        })
    },[user]);

    useEffect(()=>{
        setSearchQuery('')
        console.log(selectedList);
        if(selectedList === 'rating'){
            getRatingListData();
        }else if(selectedList === 'favorite'){
            getFavoriteListData();
        }else if(customLists.includes(selectedList)){
            getCustomListData(selectedList);
        }
    },[selectedList])

    const getRatingListData = () =>{
        if(ratingListData.length == 0){
            console.log('Rating work 1');
            const firestore = firebase.firestore()

            const db = firestore.collection('users').doc(user.uid).collection('rating')
            db.orderBy('date', 'desc').get()
            .then(async querySnapshot => {
                const data = querySnapshot.docs.map(async doc => {
                    console.log('Rating work 2');
                    var url;
                    doc.data().type == 'tv' ? url = `https://api.themoviedb.org/3/tv/${doc.id}?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk` : url = `https://api.themoviedb.org/3/movie/${doc.id}?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`;
                    const fulldoc = await PostService.getAll(url);
    
                    return {
                       id: doc.id,
                       title: doc.data().title,
                       origTitle: doc.data().type == 'tv' ? fulldoc.data.original_name : fulldoc.data.original_title,
                       rate: doc.data().rate,
                       type: doc.data().type,
                       genres: fulldoc.data.genres
                    };
                });
                Promise.all(data).then(result => {
                    setRatingListData(result)
                })
            })
        }
    }

    const getFavoriteListData = () =>{
        if(favoriteListData.length == 0){
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
                setFavoriteListData(data)
            })
        }
    }

    const getWatchlistListData = ()=>{

    }

    const checkCustomLists = () =>{
        const firestore = firebase.firestore()
        const db = firestore.collection('users').doc(user.uid);
        db.get()
        .then(e =>{
            if(e.data().collectionList){
                setCustomLists(e.data().collectionList);
            }
        })
    }

    const getCustomListData = (list) =>{
        const firestore = firebase.firestore()
        const db = firestore.collection('users').doc(user.uid).collection(list)
        db.get()
        .then(querySnapshot =>{
            const data = querySnapshot.docs.map(doc => {
                return {
                id: doc.id,
                type: doc.data().type,
                title: doc.data().title,
                };
            });
            console.log(data);
            setCustomListsData(data);
        })
    }

    const tesst = ()=>{
        // const firestore = firebase.firestore()
        // const db = firestore.collection('users').doc(user.uid).collection('зуй').doc();
        // db.set({
        //     name: "John Doe",
        //     email: "johndoe@example.com",
        //     age: 30
        // })

        const firestore = firebase.firestore()
        const db = firestore.collection('users').doc(user.uid);
        db.get()
        .then(e =>{
            e.data().collectionList.map((f)=>{
                const db = firestore.collection('users').doc(user.uid).collection(f)
                db.get()
                .then(querySnapshot =>{
                    const data = querySnapshot.docs.map(doc => {
                        return {
                        id: doc.id,
                        type: doc.data().type,
                        };
                    });
                    console.log(data)
                })

            })
        })
    }
    

    const sortedRatingListData = useMemo(()=>{
        return ratingListData.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || movie.origTitle.toLowerCase().includes(searchQuery.toLowerCase()) || movie.rate.toString().includes(searchQuery.toLowerCase()));
    },[searchQuery,ratingListData])

    // const sortedFavoriteList = useMemo(()=>{
    //         return favoriteList.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || movie.origTitle.toLowerCase().includes(searchQuery.toLowerCase()) || movie.rate.toString().includes(searchQuery.toLowerCase()));
    // },[searchQuery,favoriteList])

    const sortedCustomListsData = useMemo(()=>{
        if (customListsData) {
            return customListsData.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));   
        }
    },[searchQuery,customListsData])

    useEffect(()=>{
        if(ratingListData){
            ratingListData.map((e)=>{
                console.log(e.genres);
            })
        }
    },[ratingListData])

    return (
        <div className={classes.lists_container}>
            <div className={classes.lists}>
                <div className={classes.rating} style={selectedList === 'rating' ? {background: '#242424'} : {}} onClick={()=>{setSelectedList('rating')}}>Rating</div>
                <div className={classes.favorite} style={selectedList === 'favorite' ? {background: '#242424'} : {}} onClick={()=>{setSelectedList('favorite')}}>Favorite</div>
                <div className={classes.watchlist} style={selectedList === 'watchlist' ? {background: '#242424'} : {}} onClick={()=>{setSelectedList('watchlist')}}>Watchlist</div>
                {customLists.map((e)=>(
                    <div key={e} style={selectedList === e ? {background: '#242424'} : {}} onClick={()=>{setSelectedList(e)}}>{e}</div>
                ))}
            </div>
            <MyInput type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className={`${classes.search_movie_input} input`} placeholder="Пошук за назвою"/>
            {selectedList === 'rating' ?(
                <div className={classes.cards}>
                    {sortedRatingListData.map(doc =>(
                        <Cards key={doc.id} id={doc.id} rate={doc.rate} type={doc.type} page='rating'/>
                    ))}
                </div> 
            ): selectedList === 'favorite' ? (
                <div className={classes.cards}>
                    {favoriteListData.map(doc =>(
                        <Cards key={doc.id} id={doc.id} type={doc.type} page='seelater'/>
                    ))}
                </div>
            ): selectedList === 'watchlist' ? (
                <div onClick={tesst}><button>123</button></div>
            ): customLists.includes(selectedList) ? (
                <div className={classes.cards}>
                    {sortedCustomListsData.map(doc =>(
                        <Cards key={doc.id} id={doc.id} type={doc.type}/>
                    ))}
                </div>
            ):(
                <div>Error</div>
            )
            }
        </div>
    );
};

export default MyLists;