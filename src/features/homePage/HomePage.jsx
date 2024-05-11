import React from 'react'
import './homepage.css'
import Button from '../button/Button'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




const HomePage = () => {
  
  const location = useLocation();  // Access location object
  const userId = location.state?.userId;
  console.log(userId);

  const navigate = useNavigate()
  const handleOnClick = (userId) => {
    console.log("pressed");
    navigate("/DesignPage", {state: {userId: userId}})
  }
  return (
    <div className='mainPge'>
      <div className='heade'>
        Welcome To Web&Web!
      </div>
      <div className='textUnderHead'>
        <div className='openingText'>
          <p>
            Have you ever wanted to create a site? <br/>
            Have you ever Faced a difficult challenge that made you quit of just <br/>
            the lack of knowledge made you not achivehing the site you wanted? <br/>
            Well, you have come to the right place!
          </p>
          {/*<Button type={'button'} className='btn' text={'Start!'} destination="/DesignPage"/>*/}
          <button className='btn' onClick={() => handleOnClick(userId)}>
            Start!
          </button>
        </div>
        <div className='photoNear'>
          <img src="https://img.freepik.com/free-vector/creative-mini-designers-changing-website-interface-tiny-persons-covering-computer-screen-with-paint-digital-content-flat-vector-illustration-teamwork-marketing-development-concept-banner_74855-22995.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default HomePage