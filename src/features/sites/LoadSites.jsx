import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
const LoadSites = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;
  const [sites, setSites] = useState([]);
  const netlifyToken = 'nfp_fNegdtZL4xK3F8Tu2dCoLnS5gVi2n9Kjb306'; 
  const [showAlert, setShowAlert] = useState(false); 
  const [showErrorAlert, setShowErrorAlert] = useState(false); 

  useEffect(() => {
    if (userId) {
      axios.get('http://localhost:3001/sites/loadsites', {
        params: { userId }
      })
        .then(response => {
          if (response.data.status === 'success') {
            setSites(response.data.data);
          }
        })
        .catch(error => {
          console.error("There was an error fetching the sites!", error);
        });
    }
  }, [userId]);

  const handleDeleteSite = (siteId) => {
    axios.delete('http://localhost:3001/sites/deletesite', {
      params: { siteId }
    })
      .then(response => {
        if (response.data.status === 'success') {
          setSites(sites.filter(site => site._id !== siteId));
        }
      })
      .catch(error => {
        console.error("There was an error deleting the site!", error);
      });
  };

  const createNetlifySite = async (title, netlifyToken) => {
    const netlifyApiUrl = 'https://api.netlify.com/api/v1/sites';

    const uniqueSubdomain = `${title.toLowerCase().replace(/ /g, '-')}-${Date.now()}`;

    try {
      const siteResponse = await axios.post(netlifyApiUrl, {
        name: uniqueSubdomain,
      }, {
        headers: {
          'Authorization': `Bearer ${netlifyToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Site created successfully:', siteResponse.data);
      return siteResponse.data;
    } catch (error) {
      console.error('Error creating Netlify site:', error.response?.data || error.message);
      throw error;
    }
  };

  const deployFilesToNetlify = async (siteId, pages, netlifyToken) => {
    const deployEndpoint = `https://api.netlify.com/api/v1/sites/${siteId}/deploys`;

    const formData = new FormData();
    pages.forEach((page, index) => {
      const file = new Blob([page.htmlContent], { type: 'text/html' });
      formData.append(`files/${page.title.toLowerCase().replace(/ /g, '-')}.html`, file);
    });

    try {
      const response = await axios.post(deployEndpoint, formData, {
        headers: {
          'Authorization': `Bearer ${netlifyToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Files deployed successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deploying files to Netlify:', error.response?.data || error.message);
      throw error;
    }
  };

  const handleUpload = async (site) => {
    try {
      const createdSite = await createNetlifySite(site.title, netlifyToken);
      console.log('Created site:', createdSite);

      const deployResponse = await deployFilesToNetlify(createdSite.id, site.pages, netlifyToken);
      
      console.log('Deploy response:', deployResponse);
       setShowAlert(true); 
        setTimeout(() => {
          setShowAlert(false);
        }, 3000); 
      
      
    } catch (error) {
      console.error('Error uploading site:', error.response?.data?.message || error.message);
      setShowErrorAlert(true); 
      setTimeout(() => {
        setShowAlert(false);
      }, 5000); 
      
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Sites
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {sites.map(site => (
          <Card key={site._id} style={{ width: '300px' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {site.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleUpload(site)}>Upload</Button>
              <Button size="small" onClick={() => handleDeleteSite(site._id)}>Delete</Button>
            </CardActions>
          </Card>
        ))}
      </div>
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
            Site uploaded successfully
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
          Error uploading site
        </Alert>
      )}
    </div>
  );
};

export default LoadSites;
