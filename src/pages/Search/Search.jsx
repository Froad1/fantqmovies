import React, { useEffect, useState } from 'react';
import searchMovie from '../../hooks/searchMovie';
import Cards from '../../components/UI/Cards/Cards';
import classes from './Search.module.css'
import CardsMobile from '../../components/UI/Cards/CardsMobile';
import MyInput from '../../components/UI/MyInput/MyInput';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [preSearchData, setPreSearchData] = useState([])


    const getPreData = async()=>{
        const responce = await searchMovie.getSearchData(searchQuery);
        setPreSearchData(responce.data.results)
    }

    useEffect(()=>{
        getPreData();
        console.log(preSearchData);
    },[searchQuery])
    return (
        <div>
            <div className={classes.input_container}>
                <MyInput type="text" placeholder="Пошук" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
            </div>
            <div className={classes.cards_container}>
                {preSearchData.map(data =>(
                    <CardsMobile key={data.id} id={data.id} type={data.media_type}/>
                ))}
            </div>
        </div>
    );
};

export default Search;