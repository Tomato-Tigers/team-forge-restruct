import React, { useState } from "react";
import { Link } from "react-router-dom";
import './NavigationBar.css';
import logo from './images/your-logo.png'; 

const NavigationBar: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="links">
                <Link to="/HomePage">Home</Link>
                <Link to="/Messages">Messages</Link>
                <Link to="/MyProjects">My Projects</Link>
            </div>
            <button className="x-button" onMouseEnter={toggleDropdown}>X</button>
            {showDropdown && (
                <div className="dropdown">
                    <p>Hello</p>
                    <button className="sign-out-button">Sign Out</button>
                </div>
            )}
        </div>
    );
};

export default NavigationBar;



