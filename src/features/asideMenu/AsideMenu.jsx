import React, { useState } from 'react';
import DraggableItem from '../draggableItem/DraggableItem';
import elements from '../elements/Elements';
import './asidemenu.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import LayersIcon from '@mui/icons-material/Layers';
import WidgetsIcon from '@mui/icons-material/Widgets';
import UndoIcon from '@mui/icons-material/Undo';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description'; 

const AsideMenu = ({ setModalOpen, onClearAll, onSavePage, onLoadPage, onGenerateHTML, onUndo, onHome, onOpenDescriptionModal }) => { 
  const [showMiniDropZones, setShowMiniDropZones] = useState(false);
  const [showComponents, setShowComponents] = useState(false);

  const miniDropZones = elements.filter(item => item.type === 'miniDropZone');
  const otherComponents = elements.filter(item => item.type !== 'miniDropZone');

  return (
    <aside className="aside-menu">
      <div className="menu-item" onClick={() => setShowMiniDropZones(!showMiniDropZones)}>
        <LayersIcon />
        {showMiniDropZones && (
          <div className="submenu">
            {miniDropZones.map((item) => (
              <DraggableItem key={item.id} item={item} setModalOpen={setModalOpen} />
            ))}
          </div>
        )}
      </div>
      <div className="menu-item" onClick={() => setShowComponents(!showComponents)}>
        <WidgetsIcon />
        {showComponents && (
          <div className="submenu">
            {otherComponents.map((item) => (
              <DraggableItem key={item.id} item={item} setModalOpen={setModalOpen} />
            ))}
          </div>
        )}
      </div>
      <div className="menu-item" onClick={onLoadPage}>
        <FileUploadIcon />
      </div>
      <div className="menu-item" onClick={onSavePage}>
        <SaveIcon />
      </div>
      <div className="menu-item" onClick={onGenerateHTML}>
        <DashboardIcon />
      </div>
      <div className="menu-item" onClick={onClearAll}>
        <ClearIcon />
      </div>
      <div className="menu-item" onClick={onHome}>
        <HomeIcon />
      </div>
      <div className="menu-item" onClick={onOpenDescriptionModal}>
        <DescriptionIcon />
      </div>
    </aside>
  );
};

export default AsideMenu;
