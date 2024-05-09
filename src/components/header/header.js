import React from 'react';
import logo from "../../images/logofirmetine.png"
import './header.css'
import { useNavigate } from 'react-router-dom';

function Header( {children} ){

  const navigate = useNavigate()
  const homeLogo = () => {
    navigate("/")
  }

  return (
    <div className="header-main">
        <div>
            <img src={logo} alt='Placeholder image' 
            style={{ height: "100px", width: "100px", cursor: "pointer"}}
            onClick={homeLogo}/>
        </div>
      <div className="app-name">Reservation Platform</div>
      {children}
    </div>
  );
};

export default Header;
