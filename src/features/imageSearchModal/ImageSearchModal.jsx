import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios for API requests

const ImageSearchModal = ({ isOpen, onClose, onImageSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query: searchTerm, per_page: 12 },
        headers: {
          Authorization: `T33KwTdO9y6fBtc9qa06tprdWG9ocyz8Zgw--F7VBtA`
        }
      });
      setImages(response.data.results);
    } catch (error) {
      console.error('Error fetching images from Unsplash', error);
    }
  };

  return (
    <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', top: '20%', left: '30%', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
      <button onClick={onClose}>Close</button>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search images" />
      <button onClick={fetchImages}>Search</button>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {images.map((img) => (
          <img key={img.id} src={img.urls.small} alt={img.alt_description} style={{ width: '100px', height: '100px', margin: '10px' }} onClick={() => onImageSelect(img.urls.regular)} />
        ))}
      </div>
    </div>
  );
};
export default ImageSearchModal