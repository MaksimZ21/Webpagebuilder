import{ React, useState} from 'react';
import { useLocation, useNavigate,  } from 'react-router-dom';
import './homePage.css';
import axios from 'axios';
import { Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const HomePage = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  const username = location.state?.username;
  const navigate = useNavigate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  console.log(userId);

  const handleNavigate = (path) => {
    navigate(path, { state: { userId: userId } });
  };

  const handleLogout = () => {
    axios.post('http://localhost:3001/users/logout')
      .then(() => {
        setShowErrorAlert(true); 
          setTimeout(() => {
            setShowErrorAlert(false); 
            navigate('/'); 
          }, 3000); 
      })
      .catch(err => {
        console.error("There was an error logging out!", err);
      });
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {username}!</h1>
      </header>
      <div className="dashboard-content">
        <div className="card" onClick={() => handleNavigate("/DesignPage")}>
          <h2>Design a Page</h2>
          <p>Create and customize your own site.</p>
        </div>
        <div className="card" onClick={() => handleNavigate("/LoadPage")}>
          <h2>View Pages</h2>
          <p>Browse and manage your existing pages.</p>
        </div>
        <div className="card" onClick={() => handleNavigate("/UploadSite")}>
          <h2>Create a New Site</h2>
          <p>Start from scratch and build a new site.</p>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>Log Out</button>
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
          Logged Out!
        </Alert>
      )}
    </div>
    
  );
};

export default HomePage;
