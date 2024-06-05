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
import LoadPages from './features/loadPagesPage/LoadPages'
import AboutPage from './features/aboutPage/AboutPage'
import PricingPage from './features/pricingPage/PricingPage'
import UploadSite from './features/uploadSite/UploadSite'
import LoadSites from './features/sites/LoadSites'
import ForgotPass from './features/forgotPass/ForgotPass'
function App() {

  return (
        <BrowserRouter>
          <div className="app">
            <Routes>
              <Route path='/' element={<LoginPage/>}/>
              <Route path='/SignUp' element={<Signuppage/>}/>
              <Route path='/HomePage' element={<HomePage/>}/>
              <Route path='/DesignPage' element={<DesignPage/>}/>
              <Route path='/LoadPage' element={<LoadPages/>}/>
              <Route path='/About' element={<AboutPage/>}/>
              <Route path='/Pricing' element={<PricingPage/>}/>
              <Route path='/UploadSite' element={<UploadSite/>}/>
              <Route path='/LoadSites' element={<LoadSites/>}/>
              <Route path='/ForgotPass' element={<ForgotPass/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      
      
  )
}

export default App
