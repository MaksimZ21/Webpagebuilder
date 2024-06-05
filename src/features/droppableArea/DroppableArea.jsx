import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../itemTypes/ItemTypes';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageSearchModal from '../imageSearchModal/ImageSearchModal.jsx';
import StyleDialog from '../styleDialog/StyleDialog.jsx';
import MiniDropZone from '../miniDropZone/MiniDropZone.jsx';
import AsideMenu from '../asideMenu/AsideMenu.jsx';
import TitleModal from '../titleModal/TitleModal.jsx';
import DescriptionDialog from '../descDialog/DescriptionDialog.jsx';
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import './droppableArea.css';

const DroppableArea = ({ userId, initialElements = [], initialTitle = '', pageId = undefined }) => {
  const [droppedItems, setDroppedItems] = useState(initialElements);
  const [history, setHistory] = useState([]);
  const [pages, setPages] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showStyleDialog, setShowStyleDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [title, setTitle] = useState(initialTitle);
  const [styles, setStyles] = useState({});
  const [showTitleModal, setShowTitleModal] = useState(true);
  const [showDescriptionDialog, setShowDescriptionDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [currentParentId, setCurrentParentId] = useState(null);
  const navigate = useNavigate();

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.MINI_DROP_ZONE,
    drop: (item) => {
      const newItem = {
        ...item,
        id: droppedItems.length + 1,
        elements: [],
        styles: {},
        size: item.size,
      };
      setHistory([...history, droppedItems]);
      setDroppedItems((prevItems) => [...prevItems, newItem]);
      return { name: 'DroppableArea' };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    console.log(droppedItems);
  }, [droppedItems]);

  useEffect(() => {
    axios.get('http://localhost:3001/pages/loadpages', {
      params: { userId }
    })
    .then(response => {
      if (response.data.status === 'success') {
        setPages(response.data.data);
      }
    })
    .catch(error => {
      console.error("There was an error fetching the pages!", error);
    });
  }, [userId]);

  const isActive = canDrop && isOver;

  const handleSaveStyles = (styles, itemId, parentId) => {
    if (parentId) {
      setDroppedItems((prevItems) =>
        prevItems.map((item) =>
          item.id === parentId
            ? {
                ...item,
                elements: item.elements.map((nestedItem) =>
                  nestedItem.id === itemId
                    ? { ...nestedItem, styles }
                    : nestedItem
                ),
              }
            : item
        )
      );
    } else {
      setDroppedItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, styles } : item
        )
      );
    }
    setShowStyleDialog(false);
  };

  const handleDeleteItem = (itemId, parentId) => {
    if (parentId) {
      setDroppedItems((prevItems) =>
        prevItems.map((item) =>
          item.id === parentId
            ? {
                ...item,
                elements: item.elements.filter((nestedItem) => nestedItem.id !== itemId),
              }
            : item
        )
      );
    } else {
      setDroppedItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    }
    setShowStyleDialog(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(userId, droppedItems);
    const elementsToSend = droppedItems.map(item => ({
      id: item.id,
      elementType: item.elementType,
      styles: item.styles,
      elements: item.elements,
      size: item.size,
      url: item.url, 
    }));

    try {
      let response;
      console.log(pageId);
      if (pageId && pageId !== "undefined" && Object.keys(pageId).length > 0) {
        response = await axios.post(`http://localhost:3001/pages/updatepage`, { pageId, userId, elements: elementsToSend, title });
      } else {
        response = await axios.post('http://localhost:3001/pages/savepage', { userId, elements: elementsToSend, title });
      }

      if (response.data.status === "success") {
        console.log("Data saved successfully");
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClearAll = () => {
    setHistory([...history, droppedItems]);
    setDroppedItems([]);
  };

  const handleLoadPage = () => {
    navigate('/LoadPage', { state: { userId: userId } });
  };

  const handleGenerateHTML = () => {
    const generateHTML = (title, droppedItems) => {
      const createElement = (item) => {
        let element = '';
        const style = item.styles ? `style="${Object.entries(item.styles).map(([key, value]) => `${key}: ${value}`).join('; ')}"` : '';
  
        switch (item.elementType) {
          case 'button':
            element = `<button ${style} ${item.styles.linkTo ? `onclick="location.href='${item.styles.linkTo}'"` : ''}>${item.styles.text || 'Button'}</button>`;
            break;
          case 'text':
            element = `<input type="text" placeholder="${item.styles.text || 'Text Box'}" ${style} />`;
            break;
          case 'h1':
            element = `<h1 ${style}>${item.styles.text || 'H1 HEADING'}</h1>`;
            break;
          case 'img':
            element = `<img src="${item.url || ''}" alt="Image" ${style} />`;
            break;
          case 'parag':
            element = `<p ${style}>${item.styles.text || 'Paragraph'}</p>`;
            break;
          case 'table':
            element = `<table ${style}></table>`;
            break;
          case 'divForItem':
            element = `
              <div ${style}>
                <h2>${item.styles.text || 'Item'}</h2>
                <h3>${item.styles.text || 'Price'}</h3>
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
  
    const downloadHTML = (filename, content) => {
      const blob = new Blob([content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  
    const title = "My Page Title";
    const htmlContent = generateHTML(title, droppedItems);
    console.log(htmlContent);
    downloadHTML(title, htmlContent);
  };
  

  const handleUndo = () => {
    if (history.length > 0) {
      const previousState = history.pop();
      setDroppedItems(previousState);
      setHistory([...history]);
    }
  };

  const handleHome = () => {
    navigate('/HomePage');
  };

  const addNestedElement = (parentId, nestedElement) => {
    setDroppedItems(prevItems =>
      prevItems.map(item =>
        item.id === parentId ? { ...item, elements: [...item.elements, { ...nestedElement, id: `${parentId}-${item.elements.length + 1}` }] } : item
      )
    );
  };

  const openStyleDialog = (item, parentId = null) => {
    setCurrentItem({ ...item, parentId });
    setShowStyleDialog(true);
  };

  const handleTitleSave = (newTitle, newStyles) => {
    setTitle(newTitle);
    setStyles(newStyles);
  };

  const handleOpenDescriptionModal = () => {
    setShowDescriptionDialog(true);
  };

  const handleDescriptionSave = async (description) => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post('http://localhost:5000/recommend', { description });
      const recommendations = response.data.recommendations;
      console.log(recommendations);
      setDroppedItems(recommendations);
      setShowDescriptionDialog(false);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    }
  };

  const handleImageSelect = (base64Image) => {
    const newImageElement = {
      elementType: 'img',
      id: `img-${droppedItems.length + 1}`,
      url: base64Image,
      styles: {},
    };
    addNestedElement(currentParentId, newImageElement);
    setShowImageModal(false);
  };

  const openImageModal = (parentId) => {
    setCurrentParentId(parentId);
    setShowImageModal(true);
  };

  const handleItemClick = (item, parentId) => {
    openStyleDialog(item, parentId);
  };

  return (
    <div className="droppable-area-container">
      <AsideMenu
        setModalOpen={setShowImageModal}
        onClearAll={handleClearAll}
        onSavePage={handleSave}
        onLoadPage={handleLoadPage}
        onGenerateHTML={handleGenerateHTML}
        onUndo={handleUndo}
        onHome={handleHome}
        onOpenDescriptionModal={handleOpenDescriptionModal}
      />
      <div ref={drop} className={`droppable-area ${isActive ? 'active' : ''}`}>
        <div className="dropped-container">
          {droppedItems.map((item, index) => (
            <MiniDropZone
              key={index}
              id={item.id}
              size={item.size}
              styles={item.styles}
              nestedItems={item.elements}
              addNestedElement={addNestedElement}
              openStyleDialog={openStyleDialog}
              openImageModal={openImageModal}
              handleItemClick={handleItemClick}
            />
          ))}
        </div>
        {isActive ? 'Release to drop' : 'Drag a mini drop zone here'}
        
        <ImageSearchModal
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
          onImageSelect={handleImageSelect}
        />
        <StyleDialog
          show={showStyleDialog}
          onClose={() => setShowStyleDialog(false)}
          onSave={(styles) => handleSaveStyles(styles, currentItem.id, currentItem.parentId)}
          onDelete={(itemId, parentId) => handleDeleteItem(itemId, parentId)}
          item={currentItem}
          pages={pages} 
        />
        <TitleModal
          show={showTitleModal}
          onClose={() => setShowTitleModal(false)}
          onSave={handleTitleSave}
          initialTitle={title}
        />
        <DescriptionDialog
          show={showDescriptionDialog}
          onClose={() => setShowDescriptionDialog(false)}
          onSave={handleDescriptionSave}
        />
        {showSuccessAlert && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            variant="filled"
            className="success-alert"
          >
            Page Saved!!
          </Alert>
        )}
      </div>
    </div>
  );
};

export default DroppableArea;
