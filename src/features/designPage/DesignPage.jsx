import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AsideMenu from '../asideMenu/AsideMenu';
import DroppableArea from '../droppableArea/DroppableArea';
import ImageSearchModal from '../imageSearchModal/ImageSearchModal';
import { useLocation } from 'react-router-dom';
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const DesignPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [showAlert, setShowAlert] = useState(false); 

  const handleImageSelect = (url) => {
    setSelectedImageUrl(url);
    setModalOpen(false); 
  };

  const location = useLocation();
  const userId = location.state?.userId;
  const page = location.state?.page || {}; 
  const initialElements = page.elements || [];
  const initialTitle = page.title || ''; 

  console.log(userId);
  console.log(page._id);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100vh' }}>
        <div style={{ display: 'flex', gap: '20px', flex: 1 }}>
          <DroppableArea userId={userId} initialElements={initialElements} initialTitle={initialTitle} pageId={page} />
        </div>
        
        <ImageSearchModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onImageSelect={handleImageSelect} />
      </div>
    </DndProvider>
  );
}

export default DesignPage;
