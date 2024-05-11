import React from 'react'
import './button.css'
import { Link, useNavigate } from 'react-router-dom';
const Button = ({type, className ,text, destination}) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(destination);
  }
  return (
    
      <button type={type} className={className} onClick={handleButtonClick}> 
      {text}
      </button>
    
  )
}

export default Button