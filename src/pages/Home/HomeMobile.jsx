import React, { useEffect, useState } from 'react';

import classes from './HomeMobile.module.css'

import PostService from '../../API/PostService';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import Cards from '../../components/UI/Cards/Cards';
import CardsMobile from '../../components/UI/Cards/CardsMobile';


const HomeMobile = () => {

    const [loggined, setLoggined] = useState(false);
    const [user, setUser] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);

    useEffect(()=>{
        getTopData();
        getPopularData();
        getNowPlaying();
    },[]);

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

    const getTopData = async() => {
        const data = await PostService.getAll(`https://api.themoviedb.org/3/movie/top_rated?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`)
        const dataTv = await PostService.getAll(`https://api.themoviedb.org/3/tv/top_rated?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`)
        dataTv.data.results.forEach(obj => {
            obj.release_date = obj.first_air_date
            delete obj.first_air_date
          });

        const dataAll = dataTv.data.results.concat(data.data.results)
        dataAll.sort(()=>Math.random()-0.5)
        const slicedDataAll = dataAll.slice(0, 10)
        setTopRatedMovies(slicedDataAll)
        console.log(slicedDataAll)

    }

    const getPopularData = async () =>{
        const data1 = await PostService.getAll(`https://api.themoviedb.org/3/movie/popular?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`);
        const dataTv1 = await PostService.getAll(`https://api.themoviedb.org/3/tv/popular?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`)

        const dataAll1 = dataTv1.data.results.concat(data1.data.results)
        dataAll1.sort(()=>Math.random()-0.5)
        setPopularMovies(dataAll1)
    }

    const getNowPlaying = async () => {
        const data1 = await PostService.getAll(`https://api.themoviedb.org/3/movie/now_playing?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`);
        const dataTv1 = await PostService.getAll(`https://api.themoviedb.org/3/tv/airing_today?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`)

        const dataAll1 = dataTv1.data.results.concat(data1.data.results)
        dataAll1.sort(()=>Math.random()-0.5)
        setNowPlaying(dataAll1)
    }

    return (
        <div>
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
                showArrows={false}
                showIndicators={false}
            >
                {
                    topRatedMovies.map(movie =>{
                        var type;
                        return movie.name ? type = 'tv' : type = 'movie',(
                        <Link className={classes.poster_container} to={`${type}/${movie.id}`} key={movie.id}>
                            <div className={classes.posterImage}>
                                <img src={`https://image.tmdb.org/t/p/original/${movie && movie.backdrop_path}`} alt="" />
                            </div>
                            <div className={classes.posterImage_overlay}>
                                <div className={classes.posterImage_title}>{movie ? movie.name ? movie.name : movie.title ? movie.title : movie.original_title : ""}</div>
                                <div className={classes.posterImage_runtime}>
                                    {/* <p className={classes.poster_genre}>{movie ? movie.genres[0].name : ''}</p> */}
                                    <p className='poster_release-date'>{movie ? movie.release_date.slice(0,4): ""}</p>
                                    <div className={classes.runtime_point}></div>
                                    <p className={classes.posterImage_rating}>
                                        {movie ? movie.vote_average: ""}
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className={classes.star_icon}><path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z"/></svg>
                                    </p>
                                </div>
                            </div>
                        </Link>
                        )
                    })
                }
            </Carousel>
            <div className={classes.popular_container}>
                <h2>Популярне:</h2>
                <div className={classes.cards_container}>
                    {popularMovies.map(movie => {
                    return movie.name ? (
                        <CardsMobile key={movie.id} id={movie.id} type='tv'/>
                    ) : (
                        <CardsMobile key={movie.id} id={movie.id} type='movie' />
                    );
                    })}
                </div>
            </div>
            <div className={classes.popular_container}>
                <h2>Зараз дивляться:</h2>
                <div className={classes.cards_container}>
                    {nowPlaying.map(movie => {
                    return movie.name ? (
                        <CardsMobile key={movie.id} id={movie.id} type='tv'/>
                    ) : (
                        <CardsMobile key={movie.id} id={movie.id} type='movie' />
                    );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HomeMobile;