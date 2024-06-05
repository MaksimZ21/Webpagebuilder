import React from 'react';
import './aboutpage.css';
import Navbar from '../navbar/Navbar';

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <h1>About Our Project</h1>
        <div className="about-content">
          <p>
            Welcome to our drag-and-drop webpage builder project! Our mission is to provide users with a simple and intuitive way to create beautiful webpages without needing to write a single line of code.
          </p>
          <p>
            This project started with the idea of making web design accessible to everyone. Whether you're a seasoned developer or someone with no technical background, our tool is designed to help you bring your ideas to life effortlessly.
          </p>
          <p>
            The core features of our system include:
          </p>
          <ul>
            <li>
              <strong>Drag-and-Drop Interface:</strong> Easily add, arrange, and customize elements on your webpage by dragging and dropping them.
            </li>
            <li>
              <strong>Machine Learning Integration:</strong> Our system uses machine learning to analyze user inputs and recommend the best templates and elements for your project.
            </li>
            <li>
              <strong>Mini Drop Zones:</strong> Create complex layouts with nested drop zones, allowing for greater design flexibility.
            </li>
            <li>
              <strong>Customizable Styles:</strong> Open a style dialog to customize the look and feel of each element to match your vision.
            </li>
            <li>
              <strong>Undo Functionality:</strong> Easily undo your last action with a single click, giving you the freedom to experiment without fear of making mistakes.
            </li>
          </ul>
          <p>
            Below are some images showcasing the functionality of our project:
          </p>
          <div className="about-images">
            <img src="https://assets-global.website-files.com/5eff9c5e4dba181f8aa2d1e0/5f4036b6ed1d3da2cf10d237_drag-and-drop.svg" alt="Drag-and-Drop Interface" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK9Wc5ntlWKKcbp0b8v4P1L7Kp50s7IN_DjbVrL8BzwQ&s" alt="Machine Learning Integration" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFg-FW2-fHMFStl4j-y5ugOoL5LEj7aidd99j7bIl3Gg&s" alt="HTML5" />
          </div>
          <p>
            We hope you enjoy using our webpage builder as much as we enjoyed creating it. Happy building!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
