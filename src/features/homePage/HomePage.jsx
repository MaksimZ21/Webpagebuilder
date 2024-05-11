import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './HomePage.css';  // Ensure to update the corresponding CSS file

const HomePage = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/DesignPage", {state: {userId: userId}});
  };

  return (
    <div className='mainPage'>
      <div className='overlay'>
        <h1>Welcome to Web&Web!</h1>
        <p>
          Have you ever wanted to create a site?<br/>
          Have you ever faced a difficult challenge that made you quit or just<br/>
          the lack of knowledge made you not achieving the site you wanted?<br/>
          Well, you have come to the right place!
        </p>
        <button onClick={handleOnClick}>
          Start!
        </button>
      </div>
    </div>
  );
};

export default HomePage;
