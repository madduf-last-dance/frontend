// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import SignUpModal from '../SignUpModal/SignUpModal';
import LoginModal from '../LoginModal/LoginModal';
import { Link } from 'react-router-dom';
import './Navbar.css';
import GuestNavbar from './GuestNavbar';
import NonregisterNavbar from './NonregisterNavbar';
import { jwtDecode } from 'jwt-decode';
import HostNavbar from './HostNavbar';
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const [role, setRole] = useState(localStorage.getItem('role'));
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [signUpRole, setSignUpRole] = useState('guest'); // New state for sign-up role

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
      setUserProfile(jwtDecode(token));
    } else {
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
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserProfile(null);
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };


  const handleMenu = () => {
    if (isLoggedIn) {
      if (role === 'GUEST') {
        return (
          <Menu>
            <Menu.Item key="1">
              <Link to={`/profiles/${userProfile.username}`}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={`/reservations/${userProfile.username}`}>Reservations GUEST</Link>
            </Menu.Item>
            <Menu.Item key="3" onClick={handleLogout}>
              Log out
            </Menu.Item>
          </Menu>
        );
      }
      else if (role === 'HOST') {
        return (<Menu>
          <Menu.Item key="1">
            <Link to={`/profiles/${userProfile.username}`}>Profile</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={`/reservations/${userProfile.username}`}>Reservations HOST</Link>
          </Menu.Item>
          <Menu.Item key="3" onClick={handleLogout}>
            Log out
          </Menu.Item>
        </Menu>);
      }
    }
    else {
      return (
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
    }
  }

  const menu = handleMenu();

  return (
    <div className="navbar">
      {isLoggedIn ? (
        role === 'HOST' ? (<HostNavbar menu={menu}></HostNavbar>) : (<GuestNavbar menu={menu}></GuestNavbar>)
      ) : (
        <NonregisterNavbar menu={menu}></NonregisterNavbar>
      )}
      <SignUpModal visible={signUpVisible} onClose={closeSignUpModal} role={signUpRole} />
      <LoginModal visible={loginVisible} onClose={closeLoginModal} />
    </div>
  );
};

export default Navbar;
