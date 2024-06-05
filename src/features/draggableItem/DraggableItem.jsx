// draggableItem/DraggableItem.js
import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../itemTypes/ItemTypes';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';

const DraggableItem = ({ item, setModalOpen }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: item.type === 'miniDropZone' ? ItemTypes.MINI_DROP_ZONE : ItemTypes.ELEMENT,
    item: { id: item.id, elementType: item.type, size: item.size },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  
  const handleDragStart = () => {
    if (item.type === 'img') {
      setModalOpen(true); 
    }
  };
  
  return (
    <aside className='asdItms' ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }} onMouseDown={handleDragStart}>
      {item.text}
    </aside>
  );
};

export default DraggableItem;
