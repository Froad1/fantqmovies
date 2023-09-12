import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from './Bottom.module.css'

const Botom = () => {
    const [pathName, setPathName] = useState('')

    const location = useLocation();
    useEffect(()=>{
        setPathName(location.pathname);
    },[location.pathname]);
    console.log(pathName);

    return (
        <div className={classes.bottom_container}>
            <div className={classes.bottom}>
                <Link to='/' className={`${pathName == '/' ? classes.selected : {}} ${classes.home_icon}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" className={`icon ${classes.home}`}><path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"/></svg>
                </Link>
                <Link to='/search' className={`${pathName == '/search' ? classes.selected : {}} ${classes.search_icon}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" className={`icon ${classes.search}`}><path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z"/></svg>
                </Link>
                <Link to='/mylists' className={`${pathName == '/mylists' ? classes.selected : {}} ${classes.mylists_icon}`}>
                    <svg className={`icon ${classes.mylists}`} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"/></svg>
                </Link>
                <Link to='/account' className={`${pathName == '/account' ? classes.selected : {}} ${classes.account_icon}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" className={`icon ${classes.account}`}><path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5T731-360q31 14 50 41t19 65v94H160Z"/></svg>
                </Link>
            </div>
        </div>
    );
};

export default Botom;