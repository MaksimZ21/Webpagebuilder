import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './designpage.css'
import Button from '../button/Button';
import ImageSearchModal from "../imageSearchModal/ImageSearchModal";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import UserPagesPopup from '../userPagePop/UserPagesPopup';


const ItemTypes = {
  ELEMENT: 'element',
};

const elements = [
  { id: '1', type: 'button', text: 'Button' },
  { id: '2', type: 'text', text: 'Text Box' },
  { id: '3', type: 'h1', text: 'H1 Heading'},
  { id: '4', type: 'img', text: 'Image'},
  { id: '5', type: 'parag', text: 'Paragraph'},
  { id: '6', type: 'table', text: 'Table'},
  { id: '7', type: 'divForItem', text: 'Div'}

];


const PropertyPanel = ({ selectedItem, updateProps }) => {
  if (!selectedItem) return <div>Select an item to see properties</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateProps({ [name]: value });
  };

  return (
    <aside>
      <h3>Properties for: {selectedItem.type}</h3>
      <label>Width:
        <input type="text" name="width" value={selectedItem.style.width} onChange={handleChange} />
      </label>
      <label>Height:
        <input type="text" name="height" value={selectedItem.style.height} onChange={handleChange} />
      </label>
      {/* Add more properties as needed */}
    </aside>
  );
};

const DraggableItem = ({ item , setModalOpen}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ELEMENT,
    item: { id: item.id, elementType: item.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const handleDragStart = () => {
    if (item.type === 'img') {
      setModalOpen(true); // This function will be used to set modal open state in parent component
    }
  };
  return (
    //<div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}>
      //{item.text}
    //</div>  

    <aside className='asdItms' ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }} onMouseDown={handleDragStart}>
      {item.text}
    </aside>
  );
};

const DroppableArea = ({userId}) => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [showPagesPopup, setShowPagesPopup] = useState(false);
  const [pages, setPages] = useState([]);
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ELEMENT,
    drop: (item, monitor) => {
      setDroppedItems((prevItems) => [...prevItems, item]);
      console.log(droppedItems);
      return { name: 'DroppableArea' };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

    useEffect(() => {
    console.log(droppedItems);// This will log the updated state after changes
  }, [droppedItems]); // Dependency array tells React to rerun the effect when `droppedItems` changes


  const isActive = canDrop && isOver;
  const handleLoad = (e, userId) => {
    e.preventDefault();
    axios.get(`http://localhost:3001/pages/loadpages`, {userId})
      .then(response => {
        setPages(response.data.data);
        setDroppedItems(response.data.data); // Set the fetched pages into state
        console.log(response.data.data);
        setShowPagesPopup(true); // Show the popup
      })
      .catch(error => {
        console.error("Error loading pages:", error);
      });
  };
  const handleReset = () => {
    setDroppedItems([]);  
  };
  const handleSave = (e, userId, droppedItems) => {
    e.preventDefault()
    console.log(userId, droppedItems);
    
    const elementsToSend = droppedItems.map(item => ({
      id: item.id,
      elementType: item.elementType // Or 'elementType', depending on which property you want to use
    }));
    
    axios.post('http://localhost:3001/pages/savepage', {userId, elements: elementsToSend})
    .then(result => {
      console.log(result)
      if(result.data === "Success")
      {
        console.log("data saved successfully");
      }
    })
    .catch(err=>console.log(err))
  };
  const handlePageSelect = (pageElements) => {
    setDroppedItems(pageElements);
  };

  const convertToHTML = () => {
    const htmlContent = droppedItems.map(item => {
      switch (item.elementType) {
        case 'button':
          return `<button>${item.text || 'Button'}</button>`;
        case 'text':
          return `<input type="text" placeholder="${item.text || 'Text Box'}"/>`;
        case 'h1':
          return `<h1>${item.text || 'Heading'}</h1>`;
        case 'img':
          return `<img src="${item.url || ''}" alt="${item.text || 'Image'}"/>`;
        case 'parag':
          return `<p>${item.text || 'Paragraph'}</p>`;
        case 'table':
          // Assuming you need a basic table structure
          return `<table><tr><td>Sample Data</td></tr></table>`;
        case 'divForItem':
          return `<div><h2>${item.text || 'Item'}</h2><h3>Price</h3></div>`;
        default:
          return '';
      }
    }).join('');
  
     // Create a Blob from the HTML String
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'GeneratedPage.html';  // You can customize the file name
    document.body.appendChild(link); // Append link to body
    link.click(); // Simulate click to download
    document.body.removeChild(link); // Clean up and remove the link
  };
  
  // Add a button in your render method to trigger this function
  <button className='btnGenerateHTML' onClick={convertToHTML}>
    Generate HTML
  </button>

  return (
    <div ref={drop} style={{ backgroundColor: isActive ? 'lightgreen' : 'lightgrey', padding: '10px', width: '100vw', height: '70vh' }}>
      
      <div className="dropped-container">
        {droppedItems.map((item, index) => {
          let element;
          switch (item.elementType) {
            case 'button':
              element = <button key={index} className="dropped-item">Button</button>;
              break;
            case 'text':
              element = <input key={index} className="dropped-item" type="text" placeholder="Text Box" />;
              break;
            case 'h1':
              element = <h1 key={index} className="dropped-item">H1 HEADING</h1>
              break;
            case 'img':
              element = <img key={index} className="dropped-item" src={item.url || ''} alt="Dropped" />;
              break;
            case 'parag':
              element = <p key={index} className="dropped-item"></p>;
              break;
            case 'table':
              element = <table key={index} className="dropped-item"></table>;
              break;
            case 'divForItem':
              element = <div key={index} className="dropped-item">
                          <h2>Item</h2>
                          <h3>Price</h3>
                        </div>;
              break;
            default:
              element = null;
          }
          return element;
        })}
      </div>
  
      {isActive ? 'Release to drop' : 'Drag an element here'}
      <div>
        <button className='btnClr' onClick={handleReset}>
          Clear all
        </button>
        <button className='btnSave' onClick={(e) => handleSave(e, userId, droppedItems)}>
          Save page
        </button>
        <button className='btnLoad' onClick={(e) => handleLoad(e, userId)}>
          Load Page
        </button>
        <button className='btnGenerateHTML' onClick={convertToHTML}>
          Generate HTML
        </button>
      </div>
      {showPagesPopup && (
        <UserPagesPopup userId={userId} pages={pages} onClose={() => setShowPagesPopup(false)} onSelectPage={handlePageSelect} />
      )}
    </div>
  );
};

const AsideMenu = ({ setModalOpen }) => {
  const [showDraggableItems, setShowDraggableItems] = useState(false);

  return (
      <aside className="aside-menu">
          <div className="menu-item" onClick={() => setShowDraggableItems(!showDraggableItems)}>
              Elements
              {showDraggableItems && (
                  <div className="submenu">
                      {elements.map((item) => (
                          <DraggableItem key={item.id} item={item} setModalOpen={setModalOpen} />
                      ))}
                  </div>
              )}
          </div>
          <div className="menu-item">
              Load Page
          </div>
          <div className="menu-item">
              Save Page
          </div>
          <div className="menu-item">
              Clear Area
          </div>
          {/* Add more menu options as needed */}
      </aside>
  );
};

const DesignPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');



  const handleImageSelect = (url) => {
    setSelectedImageUrl(url);
    setModalOpen(false); // Close the modal
  };

  const location = useLocation();
  const userId = JSON.stringify(location.state?.userId);
  console.log(userId);
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', gap: '20px' }}>
       {/*  <div>
          {elements.map((item) => (
            <DraggableItem key={item.id} item={item} setModalOpen={setModalOpen} />
          ))}
        </div>
        */}
        <AsideMenu setModalOpen={setModalOpen} />
        <DroppableArea userId = {userId} />
      </div>
      <ImageSearchModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onImageSelect={handleImageSelect} />
      
    </DndProvider>
  );
}

export default DesignPage