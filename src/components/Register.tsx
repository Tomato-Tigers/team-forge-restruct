import React, { useState } from "react";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import SuccessMessage from "./SuccessMessage";

import axios from "axios";

import "../App.css";
import "./Login-Register.css";



const Register: React.FC = () => {
  // Hooks
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  // Handlers
  const redirectToLogin = () => {
    navigate("/");
  };
  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  
  const handleRegistration = () => {
    if (firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === "") {
      setErrorMessage("Please fill out all fields.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }
    
    const name = `${firstName} ${lastName}`;
    
    axios.post("http://localhost:3001/register", {
      name: name,
      email: email,
      password: password,
    })
    .then((response) => {
      // Handle successful registration here, e.g., redirect to login page.
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        redirectToLogin();
      }, 5000);
      console.log("User registered successfully:", response.data);
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } else {
        console.error(`Error registering user: ${error}`);
      }
    });
    };
  


  return (
    <div className="register_page" id="register">
      <div className="login_box">
        <div className="login_header">
          <span className="blue_text">Team</span>Forge
        </div>
        <form className="login_form">
          <div className="subtitle">Register</div>
          <div className="form-group">
            <div className="name-group">
              <input
                type="firstName"
                placeholder="First name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <input
                type="lastName"
                placeholder="Last name"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegistration();
                }
              }}
            />
          </div>
          {errorMessage && (<div className="error_message">{errorMessage}</div>)}
          <footer>
            <div className="login_bottom_left">
              Using Google? Return to Login.
            </div>
            <div className="login_bottom_right">
              <button
                className="login_redirect_button"
                type="button"
                onClick={redirectToLogin}
              >
                Login
              </button>
              <button type="button" className = "register_button" onClick={handleRegistration}>
                Register
              </button>
            </div>
          </footer>
        </form>
      </div>
      {showSuccessMessage && <SuccessMessage message="Registered successfully!" />}
    </div>
  );
};

export default Register;
