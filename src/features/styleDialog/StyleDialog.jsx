import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const StyleDialog = ({ show, onClose, onSave, onDelete, item, pages }) => {
  const [styles, setStyles] = useState({
    color: '',
    text: '',
    height: '',
    width: '',
    linkTo: '',
  });

  useEffect(() => {
    if (item && item.styles) {
      setStyles({
        color: item.styles.color || '',
        text: item.styles.text || '',
        height: item.styles.height || '',
        width: item.styles.width || '',
        linkTo: item.styles.linkTo || '',
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStyles((prevStyles) => ({ ...prevStyles, [name]: value }));
  };

  const handleSave = () => {
    const updatedStyles = {
      ...styles,
      height: styles.height ? `${styles.height}px` : '',
      width: styles.width ? `${styles.width}px` : '',
    };
    onSave(updatedStyles);
    onClose();
  };

  const handleDelete = () => {
    onDelete(item.id, item.parentId);
  };

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Style Element</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {item && item.elementType === 'button' && (
          <Form.Group controlId="formLinkTo">
            <Form.Label>Link to Page</Form.Label>
            <Form.Control
              as="select"
              name="linkTo"
              value={styles.linkTo}
              onChange={handleChange}
            >
              <option value="">Select a page</option>
              {pages.map((page) => (
                <option key={page._id} value={page._id}>
                  {page.title}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )}
        <Form>
          <Form.Group controlId="formText">
            <Form.Label>Text</Form.Label>
            <Form.Control
              type="text"
              name="text"
              value={styles.text}
              onChange={handleChange}
              placeholder="Enter text"
            />
          </Form.Group>
          <Form.Group controlId="formColor">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="color"
              name="color"
              value={styles.color}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formHeight">
            <Form.Label>Height (px)</Form.Label>
            <Form.Control
              type="number"
              name="height"
              value={styles.height.replace('px', '')}
              onChange={handleChange}
              placeholder="Enter height"
            />
          </Form.Group>
          <Form.Group controlId="formWidth">
            <Form.Label>Width (px)</Form.Label>
            <Form.Control
              type="number"
              name="width"
              value={styles.width.replace('px', '')}
              onChange={handleChange}
              placeholder="Enter width"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StyleDialog;
