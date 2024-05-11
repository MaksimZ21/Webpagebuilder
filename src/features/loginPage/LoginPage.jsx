import React, {useState} from 'react'
import './loginpage.css'
import TextBox from '../textBox/TextBox'
import Button from '../button/Button'
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Navbar from '../navbar/Navbar'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const navigate = useNavigate()

  const handleInputTextChange = (e) => {
    setEmail(e.target.value);
  }
  const handleInputPassChange = (e) => {
    setPass(e.target.value);
  }
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/users/login', {email, pass})
    .then(result => {
      console.log(result)
      if(result.data.message === "Success")
      {
        navigate('/HomePage', {state: {userId: result.data.userId}})
      }
    })
    .catch(err=>console.log(err))
    
  }
  return (
    <div className='mainPage'>
      <form className='loginWin' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className='textBoxes-Login'>
          <div className='text'>
            <TextBox inputType={"email"}  claName={"textBox-chatInput"} placeHol={"Enter Email here"} onInputChange={handleInputTextChange}/>
            <MdEmail className='icon'/>
          </div>
          <div className='text'>
            <TextBox inputType={"password"} claName={"textBox-chatInput"} placeHol={"Enter Password here"} onInputChange={handleInputPassChange}/>
            <FaLock className='icon'/>
          </div>
      </div>
      <div className='underText'>
        <div className='checkBox'>
          <input type="checkBox" id='rememCheck'/>
          <label htmlFor="rememCheck">Remember Me</label>
        </div>
        <h5>Forgot Password?</h5>
      </div>
      
      <div className='buttons'> 
        <Button type="submit" className='btn' text={'Login'}/>
        <Button type={'button'} className='btn' text={'Sign Up'} destination="/SignUp"/>
      </div>
    </form>
    </div>
    
  )
}

export default LoginPage