import React from 'react';
import './pricingPage.css';
import Navbar from '../navbar/Navbar';

const PricingPage = () => {
  return (
    <div className='allpage'>
      <Navbar />
      <div className='container'>
      <div className="pricing-container">
        <h1>Our Hilarious Pricing Plans</h1>
        <p className="pricing-subtitle">Choose a plan that suits your non-existent budget</p>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h2>Free Forever</h2>
            <p className="price">$0</p>
            <ul>
              <li>Unlimited drag-and-drop</li>
              <li>Unlimited templates</li>
              <li>Unlimited undo actions</li>
              <li>Access to all features</li>
              <li>24/7 Support (kinda)</li>
            </ul>
            <button>Sign Up Now</button>
          </div>
          <div className="pricing-card">
            <h2>Still Free</h2>
            <p className="price">$0</p>
            <ul>
              <li>All features from Free Forever</li>
              <li>Plus a virtual high five</li>
              <li>Personalized funny messages</li>
              <li>Special "Thank You" email</li>
            </ul>
            <button>Get Started</button>
          </div>
          <div className="pricing-card">
            <h2>Free VIP</h2>
            <p className="price">$0</p>
            <ul>
              <li>Everything in Still Free</li>
              <li>Direct line to our CEO (just kidding)</li>
              <li>Golden badge on your profile</li>
              <li>Priority support (if we're awake)</li>
            </ul>
            <button>Join the Fun</button>
          </div>
        </div>
      </div>
    </div>
      </div>
      
  );
};

export default PricingPage;
