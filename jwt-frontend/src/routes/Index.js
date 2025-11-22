import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '../components/Home';
import Register from '../components/Register';
import Login from '../components/Login';
import Profile from '../components/Profile'
import Error from '../components/Error'
import Navigation from '../layout/Navigation';

const Index = () => {
  return (
    <BrowserRouter>
    <Navigation />

    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/user/register' element={<Register />}/>
      <Route path='/user/login' element={<Login />} />
      <Route path='/user/profile' element={<Profile />} />
      <Route path='*' element={<Error />} />
    </Routes>

    </BrowserRouter>
  )
}

export default Index