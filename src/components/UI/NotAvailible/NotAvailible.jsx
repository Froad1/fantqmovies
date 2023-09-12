import React from 'react';
import classes from './NotAvailible.module.css'

const NotAvailible = () => {
    return (
        <div className={classes.notavailible_container}>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
            <h2>Not Availible</h2>
        </div>
    );
};

export default NotAvailible;