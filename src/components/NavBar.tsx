import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./NavBar.css";
import image from "./Logo.png";
import menuIcon from "./menu.png";

interface User {
  name: string;
  email: string;
}

interface NavBarProps {
  user: User;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const navigateToHomepage = () => {
    navigate("/Home");
  };
  const navigateToProfile = () => {
    navigate("/ProfilePage");
  }

  return (
    <div className="navbar">
       <div className="logo" onClick={navigateToProfile}>
        <img src={image} alt="Logo" />
      </div>
      <div className="links">
        <Link to="/Home">Home</Link>
        <Link to="/Messages">Messages</Link>
        <Link to="/Projects">Projects</Link>
      </div>
     <div className="menuIcon">
        < img src={menuIcon} alt="Menu" onClick={toggleDropdown} />
      </div>
      {showDropdown && (
        <div className={`dropdown ${showDropdown ? "animate" : ""}`}>
          <p>
  Hello, <span onClick={navigateToHomepage}>{user.name}</span>!
</p>
          <button className="sign-out-button" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar; 