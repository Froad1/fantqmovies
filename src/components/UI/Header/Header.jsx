import React from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


import { Link, useLocation, useNavigate } from 'react-router-dom';
import classes from './Header.module.css'

import { useState } from 'react';
import { useEffect } from 'react';
import MyInput from '../MyInput/MyInput';
import searchMovie from '../../../hooks/searchMovie';


const Header = () => {

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
    const [searchData, setSearchData] = useState('');
    const [darkTheme, setDarkTheme] = useState(true);
    const [preSearchData, setPreSearchData] = useState([]);
    const [location, setLocation] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const loc = useLocation();
    const navigate = useNavigate();


    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) =>{
            user ? setLoggined(true): '';
            user ? setUser(user): '';
        })
    },[user])


    useEffect(()=>{
        setLocation(loc.pathname)
    },[loc])

    const indicatorStyle = {
        left: location === '/' ? '0' : location === '/movies' ? '22%' : location === '/tv' ? '50%' : location === '/mylists' ? '77%' : '500%',
    };

    const changeTheme = ()=>{
        var root = document.documentElement;

        if (root.getAttribute('data-color-scheme') === 'dark') {
          root.setAttribute('data-color-scheme', 'light');
          setDarkTheme(false);
        } else {
          root.setAttribute('data-color-scheme', 'dark');
          setDarkTheme(true);
        }
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        if(searchQuery){
            navigate(`/search/${searchQuery}`);
            setSearchQuery('');
            setSearchVisible(false);
        }
        else{
            setSearchVisible(!searchVisible);
        }
    };

    const getPreData = async()=>{
        const responce = await searchMovie.getSearchData(searchData);
        console.log(responce.data.results)
        setPreSearchData(responce.data.results)
    }
    
    useEffect(()=>{
        console.log(darkTheme);
    },[darkTheme])

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link to="/" className={classes.logo__1}>
                    fantq
                </Link>
                <span className={classes.logo__2}>movies</span>
            </div>
            <div className={classes.navbar}>
                <div>
                    <Link to="/" className={`${classes.nav_link} ${location === '/' ? classes.active_link : ''}`}>
                        Home
                    </Link>
                    <Link to="/movies" className={`${classes.nav_link} ${location === '/movies' ? classes.active_link : ''}`}>
                        Movies
                    </Link>
                    <Link to="/tv" className={`${classes.nav_link} ${location === '/tv' ? classes.active_link : ''}`}>
                        TV Shows
                    </Link>
                    <Link to="/mylists" className={`${classes.nav_link} ${location === '/mylists' ? classes.active_link : ''}`}>
                        My lists
                    </Link>
                </div>
                <div className={classes.indicator} style={indicatorStyle}></div>
            </div>
            <div className={classes.account}>
                {/* <button onClick={()=>{changeTheme()}}>1</button> */}
                <form className={classes.search_form} onSubmit={(e)=>{handleInputChange(e)}}>
                    <MyInput placeholder='Введіть назву фільма' value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}} style={searchVisible ? {padding: "0.4rem 0.6rem" ,width: '150px'}: {}}  className={`${classes.search_movie_input} input`} required/>
                    <svg onClick={(e)=>{handleInputChange(e)}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className={`${classes.search} icon`}><path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z"/></svg>
                </form>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className={`${classes.account_more} icon`}><path d="M480-360 280-560h400L480-360Z"/></svg>
                <div className={classes.login}>
                    {!loggined && (
                        <Link to="/login">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" className={`${classes.user} icon`} >
                                <path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm.654 370Q398-80 325-111.5q-73-31.5-127.5-86t-86-127.266Q80-397.532 80-480.266T111.5-635.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5-848.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5-325q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480-140q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z" />
                            </svg>
                        </Link>
                    )}
                    {loggined && (
                        <>
                            {user.photoURL ? (
                                <Link to='/account'>
                                    <img src={user.photoURL} className={classes.user} />
                                </Link>
                            ) : (
                                <Link to='/account'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                        <path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm.654 370Q398-80 325-111.5q-73-31.5-127.5-86t-86-127.266Q80-397.532 80-480.266T111.5-635.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5-848.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5-325q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480-140q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z" />
                                    </svg>
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;


{/* <div className={classes.header_right}>
                <div className={classes.search_movie}>
                    <div className={classes.search_movie_container}>
                        <MyInput placeholder='Введіть назву фільма' value={searchData} onChange={handleInputChange} className={`${classes.search_movie_input} input`}/>
                        <div className={classes.searched_movie_container}>
                            {preSearchData.map(data =>(
                                <Link className={classes.searched_movie} to={`/${data.media_type}/${data.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt="" className={classes.searched_movie_img}/>
                                    <p className={classes.searched_movie_title}>{data.title ? data.title : data.name}</p>
                                </Link>
                            ))

                            }
                        </div>
                    </div>
                    <Link to={`/search/${searchData}`} className={classes.search_link}>
                        <svg width="24" height="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className={`${classes.search_movie_btn} icon`}>
                            <path d="M12.8645 11.3208H12.0515L11.7633 11.0429C12.7719 9.86964 13.3791 8.34648 13.3791 6.68954C13.3791 2.99485 10.3842 0 6.68954 0C2.99485 0 0 2.99485 0 6.68954C0 10.3842 2.99485 13.3791 6.68954 13.3791C8.34648 13.3791 9.86964 12.7719 11.0429 11.7633L11.3208 12.0515V12.8645L16.4666 18L18 16.4666L12.8645 11.3208V11.3208ZM6.68954 11.3208C4.12693 11.3208 2.05832 9.25214 2.05832 6.68954C2.05832 4.12693 4.12693 2.05832 6.68954 2.05832C9.25214 2.05832 11.3208 4.12693 11.3208 6.68954C11.3208 9.25214 9.25214 11.3208 6.68954 11.3208Z" />
                        </svg>
                    </Link>
                </div>
                <div className={classes.theme__change}>{
                    darkTheme ? (<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" className="icon" onClick={changeTheme}>
                        <path d="M480 696q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280 576q0-83 58.5-141.5T480 376q83 0 141.5 58.5T680 576q0 83-58.5 141.5T480 776ZM80 616q-17 0-28.5-11.5T40 576q0-17 11.5-28.5T80 536h80q17 0 28.5 11.5T200 576q0 17-11.5 28.5T160 616H80Zm720 0q-17 0-28.5-11.5T760 576q0-17 11.5-28.5T800 536h80q17 0 28.5 11.5T920 576q0 17-11.5 28.5T880 616h-80ZM480 296q-17 0-28.5-11.5T440 256v-80q0-17 11.5-28.5T480 136q17 0 28.5 11.5T520 176v80q0 17-11.5 28.5T480 296Zm0 720q-17 0-28.5-11.5T440 976v-80q0-17 11.5-28.5T480 856q17 0 28.5 11.5T520 896v80q0 17-11.5 28.5T480 1016ZM226 378l-43-42q-12-11-11.5-28t11.5-29q12-12 29-12t28 12l42 43q11 12 11 28t-11 28q-11 12-27.5 11.5T226 378Zm494 495-42-43q-11-12-11-28.5t11-27.5q11-12 27.5-11.5T734 774l43 42q12 11 11.5 28T777 873q-12 12-29 12t-28-12Zm-42-495q-12-11-11.5-27.5T678 322l42-43q11-12 28-11.5t29 11.5q12 12 12 29t-12 28l-43 42q-12 11-28 11t-28-11ZM183 873q-12-12-12-29t12-28l43-42q12-11 28.5-11t27.5 11q12 11 11.5 27.5T282 830l-42 43q-11 12-28 11.5T183 873Zm297-297Z" />
                    </svg>)
                     :(<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" className="icon" onClick={changeTheme}>
                        <path d="M480 936q-150 0-255-105T120 576q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444 396q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480 936Zm0-80q88 0 158-48.5T740 681q-20 5-40 8t-40 3q-123 0-209.5-86.5T364 396q0-20 3-40t8-40q-78 32-126.5 102T200 576q0 116 82 198t198 82Zm-10-270Z" />
                    </svg>)}
                </div>
                <div className={classes.login}>
                    {!loggined && (
                        <Link to="/login">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" className={`${classes.user} icon`} >
                                <path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm.654 370Q398-80 325-111.5q-73-31.5-127.5-86t-86-127.266Q80-397.532 80-480.266T111.5-635.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5-848.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5-325q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480-140q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z" />
                            </svg>
                        </Link>
                    )}
                    {loggined && (
                        <>
                            {user.photoURL ? (
                                <Link to='/account'>
                                    <img src={user.photoURL} className={classes.user} />
                                </Link>
                            ) : (
                                <Link to='/account'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                        <path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm.654 370Q398-80 325-111.5q-73-31.5-127.5-86t-86-127.266Q80-397.532 80-480.266T111.5-635.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5-848.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5-325q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480-140q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z" />
                                    </svg>
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div> */}