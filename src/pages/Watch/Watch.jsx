import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './Watch.module.css'


const Watch = () => {
    const { name } = useParams();
    const navigate = useNavigate();


    const handleGoBack = () => {
        navigate(-1)
    };
    
    useEffect(()=>{
            const yohoho = document.createElement('div')
            yohoho.id = 'yohoho';
            yohoho.setAttribute('data-title', name.replace(/%20/g, " "))
            document.querySelector(`.${classes.video_container}`).appendChild(yohoho)
        
            const script = document.createElement('script');
            script.src = 'https://yohoho.cc/yo.js';
            script.id = 'script';
            document.querySelector(`.${classes.video_container}`).appendChild(script);
    },[name])

    return (
        <div className={classes.watch_container}>
            <svg onClick={handleGoBack} xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
            <div className={classes.video_container}></div>
        </div>
    );
};

export default Watch;