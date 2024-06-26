import React, {useState} from 'react'
import './signuppage.css'
import TextBox from '../textBox/TextBox';
import Button from '../button/Button';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Navbar from '../navbar/Navbar';
import ErrorIcon from '@mui/icons-material/Error';

const Signuppage = () => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [conPass, setConPass] = useState('');
  const [showAlert, setShowAlert] = useState(false); 
  const [showErrorAlert, setShowErrorAlert] = useState(false); 

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
  const handleInputPassConfirmationChange = (e) => {
    setConPass(e.target.value);
  }
  const handleSubmit = (e) => {
    if(conPass == pass)
    {
      e.preventDefault()
      axios.post('http://localhost:3001/users/signup', {username, pass, email})
      .then(result => {console.log(result)
      if(result.status == 201){
        setShowAlert(true); 
        setTimeout(() => {
          setShowAlert(false);
          navigate('/'); 
        }, 3000); 
      }
      })
      .catch(err=>console.log(err))
    }
    else{
      setShowErrorAlert(true); 
      setTimeout(() => {
        setShowAlert(false);
      }, 5000); 
    }
    
  }


  return (
    <div className='mainPage'>
      <Navbar/>
      <form className='signUp' onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className='textBoxes-signUp'>
          <div className='text'>
            <TextBox inputType={"text"}  claName={"textBox-chatInput"} placeHol={"Enter Username here"} onInputChange={handleInputTextChange}/>
            <FaUser className='icon'/>
          </div>
          
          <div className='text'>
            <TextBox inputType={"email"} claName={"textBox-chatInput"} placeHol={"Enter Email here"} onInputChange={handleInputEmailChange}/>
            <MdEmail className='icon'/>
          </div>
          <div className='text'>
            <TextBox inputType={"password"} claName={"textBox-chatInput"} placeHol={"Enter Password here"} onInputChange={handleInputPassChange}/>
            <FaLock className='icon'/>
          </div>
          <div className='text'>
            <TextBox inputType={"password"} claName={"textBox-chatInput"} placeHol={"Confirm password"} onInputChange={handleInputPassConfirmationChange}/>
            <FaLock className='icon'/>
          </div>
        </div>
        <div className='buttons'> 
          <Button type="submit" className='btn' text={'Sign up!'} />
        </div>
    </form>
    {showAlert && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            variant='filled'
            style={{
              position: 'fixed',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'fit-content',
              zIndex: 1000
            }}
          >
            Signed Up Successfully!
          </Alert>
        )}
    {showErrorAlert && (
        <Alert
          icon={<ErrorIcon fontSize="inherit" />}
          severity="error"
          variant='filled'
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'fit-content',
            zIndex: 1000
          }}
        >
          Passwords doesn't match!
        </Alert>
      )}
    </div>
    
  )
}

export default Signuppage