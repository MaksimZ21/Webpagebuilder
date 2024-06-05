import React, {useState} from 'react'
import './forgotpass.css'
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

const ForgotPass = () => {
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [conPass, setConPass] = useState('');
  const [showAlert, setShowAlert] = useState(false); 
  const [showErrorAlert, setShowErrorAlert] = useState(false); 

  const navigate = useNavigate()
  
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
      axios.post('http://localhost:3001/users/changepass', {email, pass})
      .then(result => {console.log(result)
      if(result.status == 200){
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
      <form className='changePass' onSubmit={handleSubmit}>
        <h1>Change Pass</h1>
        <div className='textBoxes-changePass'>
          <div className='text'>
            <TextBox inputType={"email"}  claName={"textBox-chatInput"} placeHol={"Enter email here"} onInputChange={handleInputEmailChange}/>
            <MdEmail className='icon'/>
          </div>
          <div className='text'>
            <TextBox inputType={"password"} claName={"textBox-chatInput"} placeHol={"Enter New pass here"} onInputChange={handleInputPassChange}/>
            <FaLock className='icon'/>
          </div>
          <div className='text'>
            <TextBox inputType={"password"} claName={"textBox-chatInput"} placeHol={"Confirm New Pass"} onInputChange={handleInputPassConfirmationChange}/>
            <FaLock className='icon'/>
          </div>
        </div>
        <div className='buttons'> 
          <Button type="submit" className='btn' text={'Change Pass!'} />
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
            Password Changed!
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
          Password didnt change!!
        </Alert>
      )}
    </div>
    
  )
}

export default ForgotPass