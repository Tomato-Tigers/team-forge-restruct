import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";
import image from "./Logo.png";
import UsrProps from "./UsrProps";

const NavBar: React.FC<UsrProps> = (u) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={image} alt="Logo" />
      </div>
      <div className="links">
        <p>{u.myEmail}</p>
        <Link to="/HomePage"  state={{email:"alexandra.iotzova@emory.edu"}} >Home</Link>
        <Link to="/Messages"  state={{email:"alexandra.iotzova@emory.edu"}} >Messages</Link>
        <Link to="/Projects">Projects</Link>
      </div>
      <button className="x-button" onMouseEnter={toggleDropdown}>
        X
      </button>
      {showDropdown && (
        <div className="dropdown">
          <p>Hello</p>
          <button className="sign-out-button">Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
