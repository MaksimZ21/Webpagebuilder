import React from 'react'
import { Link } from 'react-router-dom'
import './navigationBar.css'

const Navbar = () => {
  return (
    <header className='head'>
      <nav className='mainNav'>
        <Link className='navLink' to={'/'}>Login</Link>
        <Link className='navLink'>About</Link>
        <Link className='navLink'>Services</Link>
        <Link className='navLink' to={'/SignUp'}>Sign Up</Link>
      </nav>
      <img src="phot/logo.png" alt="" />
    </header>
    
  )
}

export default Navbar