// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import SignUpModal from '../SignUpModal/SignUpModal';
import LoginModal from '../LoginModal/LoginModal';
import { Link } from 'react-router-dom';

import './Navbar.css';

const GuestNavbar = ({menu}) => {

    return (
      <>
        <div className="navbar-logo">
            <Link to="/">Hotel reservation app</Link>
        </div>       
        <div className="navbar-menu">
            <Link to="/reservations" className="navbar-menu-item">My Reservations</Link>
            <Dropdown overlay={menu} trigger={['click']}>
                <Button icon={<UserOutlined />} />
            </Dropdown>
        </div>

      </>
    );
};

export default GuestNavbar;
