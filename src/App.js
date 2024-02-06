import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import ShowDetails from './components/home/homeComponents/ShowDetails';
import Leaderboard from './components/home/homeComponents/leaderboard';
import PageNotFound from './components/NotFound';
import ViewAllJobs from './components/Jobs';
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home/:username' element={<Home/>}/>
        <Route path='/job_details/:username' element={<ShowDetails/>}/>
        <Route path='/leaderboard/:username' element={<Leaderboard/>}/>
        <Route path='/jobs/:username' element={<ViewAllJobs/>} />
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </Router>
  );
}

export default App;
