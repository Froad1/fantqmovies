import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cards from '../../components/UI/Cards/Cards';
import searchMovie from '../../hooks/searchMovie';
import classes from './SearchData.module.css'

const SearchData = () => {
    const { query } = useParams()
    const [searchData, setSearchData] = useState([])


    const getData = async()=>{
        const responce = await searchMovie.getSearchData(query.replace(/%20/g, " "));
        console.log(responce.data.results)
        setSearchData(responce.data.results)
    }

    useEffect(()=>{
        getData()
    },[query])
    return (
        <div className={classes.cards}>
            {searchData.map(data =>(
                <Cards key={data.id} id={data.id} type={data.media_type}/>
            ))}
        </div>
    );
};

export default SearchData;