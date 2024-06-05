import React from 'react';
import './imageSearchModal.css';

const ImageSearchModal = ({ isOpen, onClose, onImageSelect }) => {
  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelect(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`image-search-modal ${isOpen ? 'open' : ''}`}>
      <button onClick={onClose}>Close</button>
      <div>
        <input type="file" accept="image/*" onChange={handleUpload} />
      </div>
    </div>
  );
};

export default ImageSearchModal;
