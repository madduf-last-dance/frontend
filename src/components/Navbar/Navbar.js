// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import SignUpModal from '../SignUpModal/SignUpModal';
import LoginModal from '../LoginModal/LoginModal';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    const [signUpVisible, setSignUpVisible] = useState(false);
    const [loginVisible, setLoginVisible] = useState(false);
    const [signUpRole, setSignUpRole] = useState('guest'); // New state for sign-up role

    useEffect(() => {
        checkLoginStatus();
    }, []);
    
    const checkLoginStatus = async () => {
      try {
          const profileData = {
              "username": "marko",
              "password": "aaa"
          }
          setUserProfile(profileData);
          setIsLoggedIn(true);
      } catch (error) {
          console.error('User not logged in:', error);
          setIsLoggedIn(false);
          setUserProfile(null);
      }
    };

    const showSignUpModal = (role) => {
        setSignUpRole(role);
        setSignUpVisible(true);
    };

    const closeSignUpModal = () => {
        setSignUpVisible(false);
    };

    const showLoginModal = () => {
        setLoginVisible(true);
    };

    const closeLoginModal = () => {
        setLoginVisible(false);
    };

    const handleLogout = () => {
      localStorage.removeItem('accessToken');
      setIsLoggedIn(false);
      setUserProfile(null);
    };

    const menu = isLoggedIn ? (
        <Menu>
          <Menu.Item key="1">
            <Link to={`/profiles/${ userProfile.username }`}>Profile</Link>
          </Menu.Item>
          <Menu.Item key="2" onClick={handleLogout}>
            Log out
          </Menu.Item>
        </Menu>
      ) : (
        <Menu>
          <Menu.Item key="1" onClick={() => showSignUpModal('guest')}>
            Sign up as Guest
          </Menu.Item>
          <Menu.Item key="2" onClick={() => showSignUpModal('host')}>
            Sign up as Host
          </Menu.Item>
          <Menu.Item key="3" onClick={showLoginModal}>
            Log in
          </Menu.Item>
        </Menu>
      );

    return (
    <div className="navbar">
        <div className="navbar-logo">
            <Link to="/">Hotel reservation app</Link>
        </div>
        <div className="navbar-menu">
            <Link to="/my-hotels" className="navbar-menu-item">My Hotels</Link>
            <Dropdown overlay={menu} trigger={['click']}>
                <Button icon={<UserOutlined />} />
            </Dropdown>
        </div>
        <SignUpModal visible={signUpVisible} onClose={closeSignUpModal} role={signUpRole}/>
        <LoginModal visible={loginVisible} onClose={closeLoginModal} />
    </div>
    );
};

export default Navbar;