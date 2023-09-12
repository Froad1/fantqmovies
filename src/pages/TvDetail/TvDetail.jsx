import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import PostService from '../../API/PostService';
import classes from './TvDetail.module.css'

import { useSelector } from 'react-redux';
import Cards from '../../components/UI/Cards/Cards';
import { Rating } from '@mui/material';
import CardsMobile from '../../components/UI/Cards/CardsMobile';


const TvDetail = () => {

    const [movieDetail, setMovieDetail] = useState([]);
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [seasonData, setSeasonData] = useState([]);
    const [activeSeason, setActiveSeason] = useState(null);
    const [recomendation, setRecomendation] = useState()
    const [seeSeries, setSeeSeries] = useState(false);
    const [userRate, setUserRate] = useState('');
    const [saveLater, setSaveLater] =useState(false);
    const db = firebase.firestore();

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
    },[user])

    useEffect(()=>{
        getData();
        getRecomendation();
        localStorage.getItem(`onSeeLater${id}`) ? setSaveLater(localStorage.getItem(`onSeeLater${id}`)) : setSaveLater(false);
    },[id])

    const getData = async() => {
        const data = await PostService.getAll(`https://api.themoviedb.org/3/tv/${id}?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`)
        .then((data)=>{
            console.log(data.data)
            setMovieDetail(data.data)
            getInWatchlist();
        })
    }

    const getInWatchlist = () =>{
        console.log('fonction work');
        const collectionRef = db.collection('users').doc(user.uid).collection('seelater');
        collectionRef.get()
        .then(querySnapshot => {
            console.log('fonction work');
            const data = querySnapshot.docs.map(doc => {
                console.log('fonction work');
                if(doc.id == id){
                    console.log(123);
                    setSaveLater(true);
                }
            });
        })
    }

    const seenow = () =>{
        var db = firebase.firestore();
        var docRef = db.collection("users").doc(user.uid).collection('seenow').doc(id);

        user.uid ?
        docRef.set({
            type: 'tv',
        }) &&
        console.log(user.uid, 'Є')
        : console.log(user.uid, 'НЕМАЄ');
    }
    const setRate = (userRate) =>{
        var docRef = db.collection("users").doc(user.uid).collection('rating').doc(id);

        docRef.set({
            title: movieDetail.name,
            rate: userRate,
            type: 'tv',
            date: Date.now(),
        })
    }

    const addToCollection = () =>{
        var db = firebase.firestore();
        var docRef = db.collection("users").doc(user.uid).collection('seelater').doc(id);

        docRef.set({
            title: movieDetail.name,
            type: 'tv',
            date: Date.now(),
        })
        .then(()=>{
            console.log('Added'); 
            setSaveLater(true);
            localStorage.setItem(`onSeeLater${id}`, true)
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

    const getSeasonInfo = async(num) =>{
        if(num != activeSeason){
            const seasData = await PostService.getAll(`https://api.themoviedb.org/3/tv/${id}/season/${num}?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`);
            setSeasonData(seasData);
            console.log(seasData);
            setActiveSeason(num);
        }
        else {
            setSeasonData([])
            setActiveSeason()
        }
    }

    const getRecomendation = async() =>{
        const recomData = await PostService.getAll(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`);
        recomData.data.results.length != 0 ? setRecomendation(recomData.data.results): '';
        console.log(recomData.data.results);
    }
    const navigate = useNavigate();

    const watch = ()=>{
        // navigate(`/watch/${data.data.name}` +  `/` ${data.data.original_name} `(`${data.data.first_air_date.slice(0 , 4)}`)`}
        navigate('/watch/' + movieDetail.name + '(' + movieDetail.first_air_date.slice(0 , 4) + ')')
        // ${data.data.name} / ${data.data.original_name} (${data.data.first_air_date.slice(0 , 4)})
    }
    

    return (
        <div className={classes.tv_container}>
            <main className={classes.tv_main}>
                <div className={classes.poster_image_container}>
                    <div className={classes.poster_image_overlay}></div>
                    <img src={`https://image.tmdb.org/t/p/original/${movieDetail && movieDetail.backdrop_path}`} alt="" className={classes.poster_image}/>
                </div>
                <div className={classes.text_container}>
                    <p className={classes.title}>{movieDetail && movieDetail.name}</p>
                    <div className={classes.short_info}>
                        <p className={classes.genre}>{movieDetail && movieDetail.genres && movieDetail.genres[0].name}</p>
                        <div className={classes.point}></div>
                        <p className={classes.year}>{movieDetail && movieDetail.first_air_date && movieDetail.first_air_date.slice(0,4)}</p>
                        <div className={classes.point}></div>
                        <p className={classes.vote_average}>
                            {movieDetail && movieDetail.vote_average && movieDetail.vote_average.toString().slice(0,3)}
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className={`icon ${classes.vote_star}`}><path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z"/></svg>
                        </p>
                    </div>
                    <div className={classes.buttons}>
                        <button className={classes.see_button} onClick={watch}>
                            Дивитися
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className={`icon ${classes.see_button_icon}`}><path d="M320-203v-560l440 280-440 280Z"/></svg>
                        </button>
                        <Rating name="half-rating" defaultValue={0} precision={0.5} className={classes.set_user_rating} onChange={(event, value) => { setRate(value * 2); setUserRate(value * 2); }}/>
                        {
                            saveLater ? (
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" className={`icon ${classes.watch_later}`} onClick={deleteToCollection}><path d="M200-120v-665q0-24 18-42t42-18h440q24 0 42 18t18 42v665L480-240 200-120Z"/></svg>
                            )
                            :(
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" className={`icon ${classes.watch_later}`} onClick={addToCollection}><path d="M200-120v-665q0-24 18-42t42-18h440q24 0 42 18t18 42v665L480-240 200-120Zm60-91 220-93 220 93v-574H260v574Zm0-574h440-440Z"/></svg>
                            )

                        }
                    </div>
                </div>
            </main>
            <div className={classes.description}>
                <p>{movieDetail && movieDetail.overview && movieDetail.overview}</p>
            </div>
            <div className={classes.seasons_container}>
                <div className={classes.seasons}>
                    {movieDetail.seasons && movieDetail.seasons.map(season => (
                        <div key={season.season_number} className={classes.season} onClick={() => { getSeasonInfo(season.season_number) }}>
                            <div className={classes.season_poster_container}>
                                <img src={`https://image.tmdb.org/t/p/original/${season && season.poster_path}`} alt="" className={classes.season_poster_img} />
                            </div>
                            <div className={classes.season_text_constainer}>
                                <p className={classes.season_name}>{season && season.name}</p>
                                {season && season.vote_average !=0 ?
                                    (<p className={classes.season_vote}>
                                        {season && season.vote_average}
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className={`icon ${classes.vote_star}`}><path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z"/></svg>
                                    </p>)
                                    : ''
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={classes.series_container}>
                {seasonData && seasonData.data && seasonData.data.name &&
                    (<p className={classes.season_name_serias}>Серії в {seasonData && seasonData.data && seasonData.data.name}:</p>)
                }
                <div className={classes.series}>
                    {seasonData && seasonData.data && seasonData.data.episodes.map(seria => (
                        <div className={classes.seria}>
                            <div className={classes.seria_poster_container}>
                                <img src={`https://image.tmdb.org/t/p/original/${seria && seria.still_path}`} alt="" className={classes.seria_poster_img} />
                            </div>
                            <div className={classes.seria_text_constainer}>
                                <p className={classes.seria_title_container}>
                                    <p className={classes.seria_title}>{seria && seria.episode_number}. {seria && seria.name}</p>
                                    <p className={classes.seria_runtime}>{seria && seria.runtime} хв.</p>
                                </p>
                                <p className={classes.seria_overview}>{seria.overview}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {recomendation && (
            <div className={classes.recomendation_container}>
                <div className={classes.recomendation_text}>Серіали схожі на цей:</div>
                <div className={classes.recomendation}>
                    {recomendation && recomendation.map(doc => (
                        <Cards key={doc.id} id={doc.id} type='tv' moviedata={doc} />
                    ))}
                </div>
            </div>)
            }
        </div>
    );
};

export default TvDetail;


//https://yohoho.cc/yo.js