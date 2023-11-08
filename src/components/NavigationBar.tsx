import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './NavigationBar.css';
import logo from './images/your-logo.png';
import profiles from './images/LoginLogo.png';

interface IMyProps {
    myEmail: string,
}

const NavigationBar: React.FC<IMyProps> = (props) => {
    let navigate = useNavigate();

    const navigateToHome = () => {
        navigate("/HomePage", {
            state: {
                email: props.myEmail
            }
        });
    };

    const handleSignOut = () => {
        // Handle sign out and redirect to the login page
        navigate("/"); // Replace "Login" with the actual login page path
    };

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };

    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="links">
                <span onClick={navigateToHome}>Home</span>
                <span>Messages</span> {/* Replace Link with span */}
                <span>My Projects</span> {/* Replace Link with span */}
            </div>
            <button className="x-button" onMouseEnter={closeDropdown} onClick={toggleDropdown}>
                X
            </button>
            {showDropdown && (
                <div className="dropdown">
                    <img src={profiles} alt="profiles" className="profiles" /> 
                    <p>Alexandra</p>
                    <button className="sign-out-button" onClick={handleSignOut}>
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default NavigationBar;








