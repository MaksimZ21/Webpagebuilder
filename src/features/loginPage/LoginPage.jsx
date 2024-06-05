import React, { useState } from 'react';
import './loginpage.css';
import TextBox from '../textBox/TextBox';
import Button from '../button/Button';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const navigate = useNavigate();

  const handleInputTextChange = (e) => {
    setEmail(e.target.value);
  };

  const handleInputPassChange = (e) => {
    setPass(e.target.value);
  };
  const handleForgotPasswordClick = () => {
    navigate('/ForgotPass');
  };

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/users/login', { email, pass })
      .then(result => {
        console.log(result);
        if (result.data.message === "Success") {
          setShowSuccessAlert(true); 
          setTimeout(() => {
            setShowSuccessAlert(false); 
            navigate('/HomePage', { state: { userId: result.data.userId, username: result.data.username } }); 
          }, 3000);
        }
        else{
          setShowErrorAlert(true); 
          setTimeout(() => setShowErrorAlert(false), 3000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='mainPage'>
      <Navbar/>
      <form className='loginWin' onSubmit={handleSubmit}>
        <h2>Welcome To Web&Web!</h2>
        <h2>Login</h2>
        <div className='textBoxes-Login'>
          <div className='text'>
            <TextBox inputType={"email"} claName={"textBox-chatInput"} placeHol={"Enter Email here"} onInputChange={handleInputTextChange} />
            <MdEmail className='icon' />
          </div>
          <div className='text'>
            <TextBox inputType={"password"} claName={"textBox-chatInput"} placeHol={"Enter Password here"} onInputChange={handleInputPassChange} />
            <FaLock className='icon' />
          </div>
        </div>
        <div className='underText'>
          <h5 onClick={handleForgotPasswordClick} style={{cursor: 'pointer'}}>Forgot Password?</h5>
        </div>
        <div className='buttons'>
          <Button type="submit" className='btn' text={'Login'} />
          <Button type={'button'} className='btn' text={'Sign Up'} destination="/SignUp" />
        </div>
      </form>
      {showSuccessAlert && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          variant="filled"
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'fit-content',
            zIndex: 1000
          }}
        >
          Logged in Successfully!!
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
          Login Failed! Please check your email and password.
        </Alert>
      )}
    </div>
  );
};
export default LoginPage;