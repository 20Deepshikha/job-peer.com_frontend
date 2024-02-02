import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Home from './components/home/home';
import ShowDetails from './components/home/homeComponents/ShowDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home/:username' element={<Home/>}/>
        <Route path='/job_details/:id' element={<ShowDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;
