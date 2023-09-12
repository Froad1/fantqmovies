import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import PostService from '../../API/PostService';
import classes from './MovieDetail.module.css'

import { useSelector } from 'react-redux';
import Cards from '../../components/UI/Cards/Cards';
import MyInput from '../../components/UI/MyInput/MyInput';
import { Rating } from '@mui/material';


const MovieDetail = () => {

    const [movieDetail, setMovieDetail] = useState([]);
    const { id } = useParams();
    const [loggined, setLoggined] = useState(false);
    const [user, setUser] = useState([]);
    const [recomendation, setRecomendation] = useState([]);
    const [userRate, setUserRate] = useState('');
    const [saveLater, setSaveLater] =useState(false);
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
            user ? setLoggined(true): '';
            user ? setUser(user): '';
        })
    },[user])


    useEffect(()=>{
        getData();
        getRecomendation();
    },[id]);

    const getData = async() => {
        const data = await PostService.getAll(`https://api.themoviedb.org/3/movie/${id}?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`)
        .then((data)=>{
            console.log(data.data)
            setMovieDetail(data.data)
        })
    }

    const seenow = () =>{
        var db = firebase.firestore();
        var docRef = db.collection("users").doc(user.uid).collection('seenow').doc(id);

        user.uid ?
        docRef.set({
            type: 'movie',
        })
        :'';
    }

    const setRate = (userRate) =>{
        var db = firebase.firestore();
        var docRef = db.collection("users").doc(user.uid).collection('rating').doc(id);

        docRef.set({
            title: movieDetail.title,
            rate: userRate,
            type: 'movie',
            date: Date.now(),
        })
    }

    const getRecomendation = async() =>{
        const recomData = await PostService.getAll(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`);
        setRecomendation(recomData.data.results);
        // console.log(recomData);
        console.log(recomData.data.results);
    }
    const addToCollection = () =>{
        var db = firebase.firestore();
        var docRef = db.collection("users").doc(user.uid).collection('seelater').doc(id);

        docRef.set({
            title: movieDetail.title,
            type: 'movie',
            date: Date.now(),
        })
        .then(()=>{
            console.log('Added'); 
            setSaveLater(true);
        })
        .catch(()=>{console.log('No')})
    }

    const deleteToCollection = () =>{
        var db = firebase.firestore();
        var docRef = db.collection("users").doc(user.uid).collection('seelater').doc(id);

        docRef.delete()
        .then(()=>{
            setSaveLater(false);
            localStorage.removeItem(`onSeeLater${id}`)
        });
    }
    const watch = ()=>{
        navigate('/watch/' + movieDetail.title + '(' + movieDetail.release_date.slice(0, 4) + ')')
    }

    return (
        <div className={classes.movie_container}>
            <main className={classes.movie_main}>
                <div className={classes.poster_image_container}>
                    <div className={classes.poster_image_overlay}></div>
                    <img src={`https://image.tmdb.org/t/p/original/${movieDetail && movieDetail.backdrop_path}`} alt="" className={classes.poster_image} />
                </div>
                <div className={classes.text_container}>
                    <p className={classes.title}>{movieDetail && movieDetail.title}</p>
                    <div className={classes.short_info}>
                        <p className={classes.genre}>{movieDetail && movieDetail.genres && movieDetail.genres[0].name}</p>
                        <div className={classes.point}></div>
                        <p className={classes.year}>{movieDetail && movieDetail.release_date && movieDetail.release_date.slice(0, 4)}</p>
                        <div className={classes.point}></div>
                        <p className={classes.vote_average}>
                            {movieDetail && movieDetail.vote_average && movieDetail.vote_average.toString().slice(0, 3)}
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className={`icon ${classes.vote_star}`}><path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" /></svg>
                        </p>
                        <div className={classes.point}></div>
                        <div className={classes.runtime}>{Math.floor(movieDetail.runtime / 60)} год.  {movieDetail.runtime % 60} хв.</div>
                    </div>
                    <div className={classes.buttons}>
                        <button className={classes.see_button} onClick={watch}>
                            Дивитися
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className={`icon ${classes.see_button_icon}`}><path d="M320-203v-560l440 280-440 280Z" /></svg>
                        </button>
                        <Rating name="half-rating" defaultValue={0} precision={0.5} className={classes.set_user_rating} onChange={(event, value) => { setRate(value * 2); setUserRate(value * 2); }} />
                        {
                            saveLater ? (
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" className={`icon ${classes.watch_later}`} onClick={deleteToCollection}><path d="M200-120v-665q0-24 18-42t42-18h440q24 0 42 18t18 42v665L480-240 200-120Z" /></svg>
                            )
                                : (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" className={`icon ${classes.watch_later}`} onClick={addToCollection}><path d="M200-120v-665q0-24 18-42t42-18h440q24 0 42 18t18 42v665L480-240 200-120Zm60-91 220-93 220 93v-574H260v574Zm0-574h440-440Z" /></svg>
                                )

                        }
                    </div>
                </div>
            </main>
            <div className={classes.description}>
                <p>{movieDetail && movieDetail.overview && movieDetail.overview}</p>
            </div>
            {recomendation && (
            <div className={classes.recomendation_container}>
                <div className={classes.recomendation_text}>Фільми схожі на цей:</div>
                <div className={classes.recomendation}>
                    {recomendation && recomendation.map(doc => (
                        <Cards key={doc.id} id={doc.id} type='movie' moviedata={doc} />
                    ))}
                </div>
            </div>)
            }
        </div>
    );
};

export default MovieDetail;


//https://yohoho.cc/yo.js