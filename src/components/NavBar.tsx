import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./NavBar.css";
import image from "./Logo.png";
import menuIcon from "./menu.png";


interface User {
    name: string;
    email: string;
  }

  interface NavBarProps{
    user: User;
    // navigate to login page on logout
    onLogout: () => void;
  }

const NavBar: React.FC<NavBarProps> = ({user, onLogout}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogoClick = () => {
    navigate("/Home");
  };
  return (
    <div className="navbar">
      <div className="logo">
        <img src={image} alt="Logo" onClick={handleLogoClick} />
      </div>
      <div className="branding">
        <span className="blue_text">Team</span>Forge
      </div>
      <div className="links">
        <Link to="/Home">Home</Link>
        <Link to="/Messages">Messages</Link>
        <Link to="/Projects">Projects</Link>
      </div>
      <div className="menuIcon">
      <img src={menuIcon} alt = "Menu" onClick={toggleDropdown} />
      </div>
      {showDropdown && (
        <div className={`dropdown ${showDropdown ? 'animate': ''}`}>
          <p>Hello, {user.name}!</p>
          <button className="sign-out-button" onClick = {handleLogout}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
