import React from 'react';
import { Layout } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import './Footer.css';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Learn more about our hotel reservation services and our story.</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@hotelapp.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <FacebookOutlined className="social-icon" />
            <TwitterOutlined className="social-icon" />
            <InstagramOutlined className="social-icon" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Hotel Reservation App. All rights reserved.</p>
      </div>
    </Footer>
  );
};

export default AppFooter;