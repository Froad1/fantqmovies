import React, { useEffect, useState } from 'react';
import PostService from '../../API/PostService';
import { Link } from 'react-router-dom';

import classes from './HomeTest.module.css'
import { Carousel } from 'react-responsive-carousel';
import Cards from '../../components/UI/Cards/Cards';

const HomeTest = () => {
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlaingMovies, setNowPlaingMovies] = useState([]);

    useEffect(()=>{
        getTopRatedData();
        getPopularData();
        getNowPlaying();
    },[])

    const getTopRatedData = async() =>{
        const data = await PostService.getAll(`https://api.themoviedb.org/3/movie/top_rated?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`);
        const dataTv = await PostService.getAll(`https://api.themoviedb.org/3/tv/top_rated?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`);

        const genresData = await PostService.getAll(`https://api.themoviedb.org/3/genre/movie/list?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`);
        const genresTvData = await PostService.getAll(`https://api.themoviedb.org/3/genre/tv/list?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk`);

        dataTv.data.results.forEach(obj => {
            var genreArray = [];
            obj.genre_ids.map((e)=>{
                const genre = genresTvData.data.genres.find(genre => genre.id === e);
                if(genre){
                    genreArray.push(genre.name);
                }
            })
            obj.genres = genreArray;
            obj.type = 'tv';
            obj.title = obj.name;
            obj.release_date = obj.first_air_date;
            delete obj.name;
            delete obj.first_air_date;
        });

        data.data.results.forEach(obj =>{
            var genreArray = [];
            obj.genre_ids.map((e)=>{
                const genre = genresData.data.genres.find(genre => genre.id === e);
                if(genre){
                    genreArray.push(genre.name);
                }
            })
            obj.genres = genreArray;
            obj.type = 'movie';
        })

        const dataAll = dataTv.data.results.concat(data.data.results)
        dataAll.sort(()=>Math.random()-0.5)
        const slicedDataAll = dataAll.slice(0, 10)

        setTopRatedMovies(slicedDataAll)
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
        setNowPlaingMovies(dataAll1);
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
                {topRatedMovies.map((movie)=>(
                    <Link to={`${movie.type}/${movie.id}`} className={classes.main_poster} key={movie.id}>
                        <div className={classes.poster_container}>
                            <img src={`https://image.tmdb.org/t/p/original/${movie && movie.backdrop_path}`} alt="" className={classes.poster}/>
                        </div>
                        <div className={classes.poster_overlay}>
                            <div className={classes.poster_info}>
                                <div className={classes.genres_container}>
                                    {movie.genres.map((genre, index) => (
                                        <React.Fragment key={genre}>
                                            {index > 0 && <div className={classes.separator}></div>}
                                            <div className={classes.genre}>{genre}</div>
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className={classes.poster_title}>{movie.title}</div>
                                <div className={classes.poster_mini_info}>
                                    <div className={classes.poster_year}>{movie.release_date.slice(0,4)}</div>
                                    <div>|</div>
                                    <div className={classes.poster_rate}>
                                        {movie.vote_average}
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className='icon'><path d="m323-205 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-355Z"/></svg>
                                    </div>
                                </div>
                                <div className={classes.poster_description}>{movie.overview.slice(0,200) + "..."}</div>
                            </div>
                        </div>
                    </Link>
                ))

                }
            </Carousel>
            <div className={classes.popular_container}>
                <h2>Популярне:</h2>
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
            <div className={classes.nowplaing_container}>
                <h2>Зараз дивляться:</h2>
                <div className={classes.cards_container}>
                    {nowPlaingMovies.map(movie => {
                    return movie.name ? (
                        <Cards key={movie.id} id={movie.id} type='tv'/>
                    ) : (
                        <Cards key={movie.id} id={movie.id} type='movie' />
                    );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HomeTest;