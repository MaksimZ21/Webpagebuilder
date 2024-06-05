import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, CardActions, Button, Checkbox } from '@mui/material';
import TitleModal from '../titleModal/TitleModal'; 
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

const UploadSite = () => {
  const [pages, setPages] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [showTitleModal, setShowTitleModal] = useState(true); 
  const [showAlert, setShowAlert] = useState(false); 
  const [title, setTitle] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;
  
  console.log(userId);

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

  const handleSelectPage = (pageId) => {
    setSelectedPages((prevSelectedPages) => {
      if (prevSelectedPages.includes(pageId)) {
        return prevSelectedPages.filter(id => id !== pageId);
      } else {
        return [...prevSelectedPages, pageId];
      }
    });
  };
  const generateHTML = (title, droppedItems) => {
    const createElement = (item) => {
      let element = '';
      const style = item.styles ? `style="${Object.entries(item.styles).map(([key, value]) => `${key}: ${value}`).join('; ')}"` : '';
  
      switch (item.elementType) {
        case 'button':
          element = `<button ${style}>${item.styles?.text || 'Button'}</button>`;
          break;
        case 'text':
          element = `<input type="text" placeholder="${item.styles?.text || 'Text Box'}" ${style} />`;
          break;
        case 'h1':
          element = `<h1 ${style}>${item.styles?.text || 'H1 HEADING'}</h1>`;
          break;
        case 'img':
          element = `<img src="${item.url || ''}" alt="Image" ${style} />`;
          break;
        case 'parag':
          element = `<p ${style}>${item.styles?.text || 'Paragraph'}</p>`;
          break;
        case 'table':
          element = `<table ${style}></table>`;
          break;
        case 'divForItem':
          element = `
            <div ${style}>
              <h2>${item.styles?.text || 'Item'}</h2>
              <h3>${item.styles?.text || 'Price'}</h3>
            </div>
          `;
          break;
        case 'miniDropZone':
          element = `<div ${style}>${item.elements.map(createElement).join('')}</div>`;
          break;
        default:
          element = '';
      }
  
      return element;
    };
  
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          .nested-item {
            margin: 10px;
          }
        </style>
      </head>
      <body>
        ${droppedItems.map(createElement).join('')}
      </body>
      </html>
    `;
  
    return htmlContent;
  };
  

  const handleUploadPages = async () => {
    try {
      const pagesToUpload = pages.filter(page => selectedPages.includes(page._id));
      const pagesWithHTML = pagesToUpload.map(page => ({
        ...page,
        htmlContent: generateHTML(page.title, page.elements) 
      }));
      axios.defaults.withCredentials = true;
      const response = await axios.post('http://localhost:3001/sites/createSite', { title, userId, pages: pagesWithHTML });
      if (response.data.status === 'success') {
        setShowAlert(true); 
        setTimeout(() => {
          setShowAlert(false);
        }, 3000); 
      }
    } catch (error) {
      console.error('Error uploading pages:', error);
    }
  };
    
  const handleSeeSites = () => {
    navigate('/LoadSites',  {state: { userId: userId }})
  }

  const handleTitleSave = (newTitle) => {
    setTitle(newTitle);
    setShowTitleModal(false); 
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Pages
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {pages.map(page => (
          <Card key={page._id} style={{ width: '300px' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {page.title}
              </Typography>
              <Checkbox
                checked={selectedPages.includes(page._id)}
                onChange={() => handleSelectPage(page._id)}
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <Button style={{marginRight: '10px'}}
        variant="contained"
        color="primary"
        onClick={handleUploadPages}
        disabled={selectedPages.length === 0}
      >
        Upload Selected Pages
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSeeSites}
      >
        See Sites to Upload to Web Host
      </Button>

      <TitleModal
        show={showTitleModal}
        onClose={() => setShowTitleModal(false)}
        onSave={handleTitleSave}
        initialTitle={title}
      />
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
            Site Uploaded Successfully!
          </Alert>
        )}
    </div>
  );
};

export default UploadSite;
