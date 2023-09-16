import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'

import './App.css'
import Header from './components/UI/Header/Header'
import Home from './pages/Home/Home'
import MovieDetail from './pages/MovieDetail/MovieDetail'
import Login from './pages/Login/Login'
import Account from './pages/Account/Account'
import TvDetail from './pages/TvDetail/TvDetail'
import SearchData from './pages/SearchData/SearchData'
import AccountSeeNow from './pages/Account/AccountSeeNow/AccountSeeNow'
import AccountSeeLater from './pages/Account/AccountSeeLater/AccountSeeLater'
import HomeMobile from './pages/Home/HomeMobile'
import { useEffect } from 'react'
import Bottom from './components/UI/Bottom/Bottom'
import Watch from './pages/Watch/Watch'
import Search from './pages/Search/Search'
import AccountMobile from './pages/Account/AccountMobile/AccountMobile'
import HomeTest from './pages/Home/HomeTest'
import MyLists from './pages/MyLists/MyLists'
import Test from './pages/Test/Test'
import MyListsMobile from './pages/MyListsMobile/MyListsMobile'
import TvDetailMobile from './pages/TvDetailMobile/TvDetailMobile'
import MovieDetailMobile from './pages/MovieDetailMobile/MovieDetailMobile'
import ErrorNotFound from './pages/ErrorNotFound/ErrorNotFound'
import Register from './pages/Register/Register'

function App() {
  const [mobile, setMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(`Ширина екрану: ${windowWidth}px`);
    windowWidth > 768 ? '' : setMobile(true);
  }, [windowWidth]);

  return (
    <div className='App'>
      <BrowserRouter basename={import.meta.env.DEV ? '/' : '/fantqmovies/'}>
          {mobile ? <Bottom/> : <Header/>}
          <Routes>
            <Route index element={ mobile ? <HomeMobile/> : <HomeTest/>}></Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path='/movie/:id' element={ mobile ? <MovieDetailMobile/>: <MovieDetail/>}></Route>
            <Route path='/tv/:id' element={ mobile ? <TvDetailMobile/> : <TvDetail/>}></Route>
            <Route path='/watch/:name' element={<Watch/>}></Route>
            <Route path='/account' element={ mobile ? <AccountMobile/> : <Account/>}></Route>
            <Route path='/account/seenow' element={<AccountSeeNow/>}></Route>
            <Route path='/account/seelater' element={<AccountSeeLater/>}></Route>
            <Route path='/search/:query' element={<SearchData/>}></Route>
            <Route path='/search' element={<Search/>}></Route>
            <Route path='/mylists' element={ mobile ? <MyListsMobile/> : <MyLists/>}></Route>
            <Route path='/test' element={<Test/>}></Route>
            <Route path='/*' element={<ErrorNotFound/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
