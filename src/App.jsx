import Nav from './component/nav/Nav.jsx'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './component/home/Home.jsx';
import Discover from './component/discover/Discover.jsx';
import Login from './component/login/Login.jsx';
import Showmore from './component/genres/Showmore.jsx'
import Crimeshowmore from './component/genres/Crimeshowmore.jsx';
import Thrillershowmore from './component/genres/Thrillershowmore.jsx';
import Comedyshowmore from './component/genres/Comedyshowmore.jsx';
import Pnf from './component/pnf/Pnf.jsx';
import Toprated from './component/toprated/Toprated.jsx';
import Latest from './component/latest/Latest.jsx';
import Showdetail from './component/showdetails/Showdetail.jsx';
import { useState } from 'react';
import Watchlist from './component/watch/Watchlist.jsx';
import Signup from './component/signup/Signup.jsx'
import { useEffect } from 'react';
import Footer from './component/footer/Footer.jsx';

function App() {
  const [movie, setmovie] = useState([]);
  const [movieid ,setmovieid] = useState("")
  const [watchList,setWatchList] = useState([])
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    // Retrieve user ID from local storage
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (userDetails) {
      setUserId(userDetails.userId);
    }
  }, []);
  return (
    <div>
     <Nav/>
    <Routes>
    <Route path='home' element={<Home  setmovieid={setmovieid}/>}/>
    <Route path='discover' element={<Discover movie={movie} setmovie={setmovie} setmovieid={setmovieid}/>} />
    <Route path='/' element={<Login/>} />
    <Route path='signup' element={<Signup/>} />
    <Route path='showmore' element={<Showmore  setmovieid={setmovieid}/>} />
    <Route path='comedy'  element={<Comedyshowmore  setmovieid={setmovieid}/>} />
    <Route path='thriller'  element={<Thrillershowmore  setmovieid={setmovieid}/>} />
    <Route path='crime'  element={<Crimeshowmore  setmovieid={setmovieid}/>} />
    <Route path='rated'  element={<Toprated  setmovieid={setmovieid}/>} />
    <Route path='latest'  element={<Latest  setmovieid={setmovieid}/>} />
    <Route path='*'  element={<Pnf/>} />
    <Route path='watchlist'  element={userId && <Watchlist userId={userId} setmovieid={setmovieid} watchList={watchList}/>} />
    <Route path="/showdetail/:movieid" element={<Showdetail watchList={watchList} setWatchList={setWatchList} />} />
    


    </Routes> 
    <Footer/>
   

    </div>
  );
}

export default App;
