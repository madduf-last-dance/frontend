// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './Navbar.css';

const NonregisterNavbar = ({menu}) => {

    return (
      <>
        <div className="navbar-logo">
            <Link to="/">Hotel reservation app</Link>
        </div>       
        <div className="navbar-menu">
            <Dropdown overlay={menu} trigger={['click']}>
                <Button icon={<UserOutlined />} />
            </Dropdown>
        </div>
      </>
    );
};

export default NonregisterNavbar;
