import React, { useEffect } from 'react';
import { useState } from 'react';
import PostService from '../../../API/PostService';
import classes from './Cards.module.css'

import { Link } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const Cards = ({id, rate, type, page, moviedata}) => {
    const [movie, setMovie] = useState([]);
    const [user, setUser] = useState([]);
    const [onSeeLater, setOnSeeLater] = useState(false);
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) =>{
            user ? setUser(user): '';
        })
        // existOnSeeLater();
    },[user])

    useEffect(()=>{
        page == 'rating' || page == 'seenow' || page == 'seelater' ? setOnSeeLater(true) : '';
        !moviedata ? getData() : setMovie(moviedata);
    },[]);

    const getData = async() => {
        var url;
        type == 'tv' ? url = `https://api.themoviedb.org/3/tv/${id}?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk` : url = `https://api.themoviedb.org/3/movie/${id}?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`;

        const data = await PostService.getAll(url)

        // var db = firebase.firestore();
        // var docRef = db.collection("users").doc(user.uid).collection('rating').doc(id);

        // docRef.set({
        //     title: type == 'tv' ? data.data.name: data.data.title,
        //     rate: rate,
        //     type: type,
        // })

        setMovie(data.data)
    }

    const existOnSeeLater = () =>{
        var db = firebase.firestore();
        var docRef = db.collection("users").doc(user.uid).collection('seelater').doc(`${id}`);
        docRef.get().then(ex =>{setOnSeeLater(ex.exists); console.log(ex.exists)})
    }

    const addSeeLater = (event) => {
        event.preventDefault()
        var db = firebase.firestore();
        var docRef = db.collection("users").doc(user.uid).collection('seelater').doc(`${id}`);

        docRef.set({
            type: type,
        })
        setOnSeeLater(true)
    }

    const deleteSeeLater = (event) =>{
        event.preventDefault()
        var db = firebase.firestore();
        var docRef = db.collection("users").doc(user.uid).collection('seelater').doc(`${id}`);
        docRef.delete()
        setOnSeeLater(false)
    }

    const deleteRating = (event) =>{
        event.preventDefault()
        var db = firebase.firestore();
        var docRef = db.collection("users").doc(user.uid).collection('rating').doc(`${id}`);
        docRef.delete()
    }

    const deleteSeeNow = (event) =>{
        event.preventDefault()
        var db = firebase.firestore();
        var docRef = db.collection("users").doc(user.uid).collection('seenow').doc(`${id}`);
        docRef.delete()
    }

    return (
        movie.backdrop_path ? (
        <Link style={{textDecoration:'none'}} className={classes.card_container} to={`/${type}/${movie.id}`} key={movie.id}>
            <div className={classes.card}>
                <div className={classes.card_overlay}></div>
                <div className={classes.cardImage}>
                    <img src={`https://image.tmdb.org/t/p/original/${movie && movie.poster_path}`} alt="" className={classes.image}/>
                </div>
                <div className={classes.text_container}>
                    <p className={classes.title}>{type =='tv' ? movie && movie.name : movie && movie.title}</p>
                    <p className={classes.rate}>{rate && rate}</p>
                    <div className={classes.description_container}>
                        <div className={classes.runtime}>
                            {type == 'tv' ? movie ? movie.first_air_date: "": movie ? movie.release_date: ""}
                            <span className={classes.rating}>
                                {movie ? movie.vote_average.toString().slice(0,3): ""}
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className={`icon ${classes.icon}`}><path d="m323-205 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-355Z"/></svg>
                            </span>
                        </div>
                        <p className={classes.overview}>{movie && movie.overview.slice(0,30) + "..."}</p>
                    </div>
                </div>
                {onSeeLater ?
                    (<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" onClick={page == 'rating' ? deleteRating : page == 'seenow' ? deleteSeeNow : deleteSeeLater } className={`icon ${classes.icon_add_to_collection}`}><path d="m330-288 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"/></svg>)
                    :
                    (<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" onClick={addSeeLater} className={`icon ${classes.icon_add_to_collection}`}><path d="M453-280h60v-166h167v-60H513v-174h-60v174H280v60h173v166Zm27.266 200q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Zm.234-60Q622-140 721-239.5t99-241Q820-622 721.188-721 622.375-820 480-820q-141 0-240.5 98.812Q140-622.375 140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>)
                }
            </div>
        </Link>
        )
        : ''
    );
};

export default Cards;