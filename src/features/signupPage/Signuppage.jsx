import React, {useState} from 'react'
import './signuppage.css'
import TextBox from '../textBox/TextBox';
import Button from '../button/Button';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Signuppage = () => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate()
  
  const handleInputTextChange = (e) => {
    setUsername(e.target.value);
  }
  const handleInputPassChange = (e)=> {
    setPass(e.target.value);
  }
  const handleInputEmailChange = (e) => {
    setEmail(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/users/signup', {username, pass, email})
    .then(result => {console.log(result)
      navigate('/')
    })
    .catch(err=>console.log(err))
    
  }


  return (
    <div className='mainPage'>
      <form className='signUp' onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className='textBoxes-signUp'>
          <div className='text'>
            <TextBox inputType={"text"}  claName={"textBox-chatInput"} placeHol={"Enter Username here"} onInputChange={handleInputTextChange}/>
            <FaUser className='icon'/>
          </div>
          <div className='text'>
            <TextBox inputType={"password"} claName={"textBox-chatInput"} placeHol={"Enter Password here"} onInputChange={handleInputPassChange}/>
            <FaLock className='icon'/>
          </div>
          <div className='text'>
            <TextBox inputType={"email"} claName={"textBox-chatInput"} placeHol={"Enter Email here"} onInputChange={handleInputEmailChange}/>
            <MdEmail className='icon'/>
          </div>
        </div>
        <div className='buttons'> 
          <Button type="submit" className='btn' text={'Login'} />
        </div>
    </form>
    </div>
    
  )
}

export default Signuppage