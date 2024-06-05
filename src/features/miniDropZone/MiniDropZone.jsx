import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../itemTypes/ItemTypes';

const sizeStyles = {
  small: { width: '100px', height: '100px' },
  medium: { width: '200px', height: '200px' },
  large: { width: '300px', height: '300px' },
  navbar: { width: '100%', height: '50px' },
  sidebar: { width: '200px', height: '100vh' },
  footer: { width: '100%', height: '70px' },
  fullwidth: { width: '100%', height: 'auto' },
  halfwidth: { width: '50%', height: 'auto' }
};

const MiniDropZone = ({ id, size, styles, nestedItems = [], addNestedElement, openStyleDialog, openImageModal, handleItemClick }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.ELEMENT,
    drop: (item) => {
      if (item.elementType === 'img') {
        openImageModal(id);
      } else {
        const newNestedElement = { ...item, id: `${id}-${nestedItems.length + 1}`, styles: {} };
        addNestedElement(id, newNestedElement);
        openStyleDialog(newNestedElement, id);
      }
      return { name: 'MiniDropZone' };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  const sizeStyle = sizeStyles[size] || sizeStyles.small;

  return (
    <div ref={drop} style={{ ...sizeStyle, ...styles, backgroundColor: isActive ? 'lightblue' : 'white', border: '1px dashed black', margin: '5px', overflowY: 'auto' }}>
      {nestedItems.map((item, index) => {
        let element;
        const style = item.styles || {};
        const handleClick = () => handleItemClick(item, id);
        switch (item.elementType) {
          case 'button':
            element = <button key={index} className="nested-item" style={style} onClick={handleClick}>{style.text || 'Button'}</button>;
            break;
          case 'text':
            element = <input key={index} className="nested-item" type="text" placeholder={style.text || 'Text Box'} style={style} onClick={handleClick} />;
            break;
          case 'h1':
            element = <h1 key={index} className="nested-item" style={style} onClick={handleClick}>{style.text || 'H1 HEADING'}</h1>;
            break;
          case 'img':
            element = <img key={index} className="nested-item" src={item.url || ''} alt="Nested" style={style} onClick={handleClick} />;
            break;
          case 'parag':
            element = <p key={index} className="nested-item" style={style} onClick={handleClick}>{style.text || 'Paragraph'}</p>;
            break;
          case 'table':
            element = <table key={index} className="nested-item" style={style} onClick={handleClick}></table>;
            break;
          case 'divForItem':
            element = (
              <div key={index} className="nested-item" style={style} onClick={handleClick}>
                <h2>{style.text || 'Item'}</h2>
                <h3>{style.text || 'Price'}</h3>
              </div>
            );
            break;
          default:
            element = null;
        }
        return element;
      })}
    </div>
  );
};

export default MiniDropZone;
