import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route, } from 'react-router-dom'
import LoginPage from './features/loginPage/LoginPage'
import Signuppage from './features/signupPage/Signuppage'
import HomePage from './features/homePage/HomePage'
import Navbar from './features/navbar/Navbar'
import DesignPage from './features/designPage/DesignPage'

function App() {

  return (
        <BrowserRouter>
          <div className="app">
            <Navbar/>
            <Routes>
              <Route path='/' element={<LoginPage/>}/>
              <Route path='/SignUp' element={<Signuppage/>}/>
              <Route path='/HomePage' element={<HomePage/>}/>
              <Route path='/DesignPage' element={<DesignPage/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      
      
  )
}

export default App
