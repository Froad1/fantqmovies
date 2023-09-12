import React, { useEffect, useState } from 'react';

import classes from './Home.module.css'

import PostService from '../../API/PostService';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import Cards from '../../components/UI/Cards/Cards';


const Home = () => {

    const [loggined, setLoggined] = useState(false);
    const [user, setUser] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(()=>{
        getData();
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

    const getData = async() => {
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

        const data1 = await PostService.getAll(`https://api.themoviedb.org/3/movie/popular?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`);
        const dataTv1 = await PostService.getAll(`https://api.themoviedb.org/3/tv/popular?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`)

        const dataAll1 = dataTv1.data.results.concat(data1.data.results)
        dataAll1.sort(()=>Math.random()-0.5)
        setPopularMovies(dataAll1)
    }

    return (
        <div>
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
            >
                {
                    topRatedMovies.map(movie =>{
                        var type;
                        return movie.name ? type = 'tv' : type = 'movie',(
                        <Link style={{textDecoration:'none'}} to={`${type}/${movie.id}`} key={movie.id}>
                            <div className={classes.posterImage}>
                                <img src={`https://image.tmdb.org/t/p/original/${movie && movie.backdrop_path}`} alt="" />
                            </div>
                            <div className={classes.posterImage_overlay}>
                                <div className={classes.posterImage_title}>{movie ? movie.name ? movie.name : movie.title ? movie.title : movie.original_title : ""}</div>
                                <div className={classes.posterImage_runtime}>
                                    {movie ? movie.release_date: ""}
                                    <span className={classes.posterImage_rating}>
                                        {movie ? movie.vote_average: ""}
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className='icon'><path d="m323-205 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-355Z"/></svg>
                                    </span>
                                </div>
                                <div className={classes.postImage_description}>{movie.overview.slice(0,250) + "..."}</div>
                            </div>
                        </Link>
                        )
                    })
                }
            </Carousel>
            <div className={classes.cards_container}>
                {popularMovies.map(movie => {
                return movie.name ? (
                    <Cards key={movie.id} id={movie.id} type='tv'/>
                ) : (
                    <Cards key={movie.id} id={movie.id} type='movie' />
                );
                })}
            </div>
        </div>
    );
};

export default Home;