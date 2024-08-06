
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import React from 'react'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import AdminLogin from './pages/AdminLogin'
import AdminHome from './pages/AdminHome'

export default function App() {
  return(
  <BrowserRouter>
    <Header />
      <Routes >
        <Route path='/' element = { <Home /> } />
        <Route path='/about' element = { <About /> } />
        <Route path='/sign-in' element = { <SignIn />} />
        <Route path='/sign-up' element = {<SignUp />} />
        <Route element={<PrivateRoute />} >
          <Route path='/profile' element = { <Profile />} />
        </Route>

        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/admin-Home' element={<AdminHome />}/>
      </Routes>
    </BrowserRouter>
  ) 
  
}
