import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import './loadPages.css';

const LoadPages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;
  console.log(userId)
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (userId) {
      axios.get('http://localhost:3001/pages/loadpages', {
        params: { userId }
      })
        .then(response => {
          console.log('Response:', response);
          if (response.data.status === 'success') {
            setPages(response.data.data);
            console.log('Pages:', response.data.data);
          }
        })
        .catch(error => {
          console.error("There was an error fetching the pages!", error);
        });
    }
  }, [userId]);
  
  const handleEditPage = (page) => {
    navigate('/DesignPage', { state: { page, userId } });
  };
  const handleDeletePage = (pageId) => {
    console.log(pageId);
    axios.delete('http://localhost:3001/pages/deletepage', {
      params: { pageId }
    })
      .then(response => {
        if (response.data.status === 'success') {
          setPages(pages.filter(page => page._id !== pageId));
        }
      })
      .catch(error => {
        console.error("There was an error deleting the page!", error);
      });
  };

  return (
    <div className="load-pages-container">
      <Typography variant="h4" component="h1" gutterBottom>
        Your Pages
      </Typography>
      <div className="pages-grid">
        {pages.map(page => (
          <Card key={page._id} className="page-card">
            <CardContent>
              <Typography variant="h5" component="div">
                {page.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleEditPage(page)}>Edit</Button>
              <Button size="small" onClick={() => handleDeletePage(page._id)}>Delete</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LoadPages;
