import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import image from "./Logo.png";
import menuIcon from "./menu.png";

// Defining the structure of a user object
interface User {
    name: string;
    email: string;
}

// Defining the structure of the NavBar component props
interface NavBarProps {
    user: User;
    onLogout: () => void;
}

// NavBar functional component
const NavBar: React.FC<NavBarProps> = ({ user, onLogout }) => {
    // State for controlling the visibility of the dropdown menu
    const [showDropdown, setShowDropdown] = useState(false);

    // Hook for navigation within the app
    const navigate = useNavigate();

    // Handler for logout action
    const handleLogout = () => {
        onLogout(); 
        navigate("/"); 
    };

    // Handler to toggle the visibility of the dropdown menu
    
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const navigateToHomepage = () => {
    navigate("/Home");
  };
  const navigateToProfile = () => {
    navigate("/ProfilePage");
  }

    // Handler for clicking on the logo, navigates to the home page
    const handleLogoClick = () => {
        navigate("/Home");
    };

    // Rendering the NavBar component
    return (
        <div className="navbar">
            {/* Logo section */}
            <div className="logo">
                <img src={image} alt="Logo" onClick={handleLogoClick} />
            </div>
            {/* Navigation links */}
            <div className="links">
                <Link to="/Home">Home</Link>
                <Link to="/Messages">Messages</Link>
                <Link to="/Projects">Projects</Link>
            </div>
            <div className="menuIcon">
                <img src={menuIcon} alt="Menu" onClick={toggleDropdown} />
            </div>
            {/* Dropdown menu section, conditionally rendered based on showDropdown state */}
            {showDropdown && (
                <div className={`dropdown ${showDropdown ? 'animate' : ''}`}>
                    <p>Hello, {user.name}!</p>
                    <button className="sign-out-button" onClick={handleLogout}>Sign Out</button>
                </div>
            )}
        </div>
    );
};

export default NavBar; 
