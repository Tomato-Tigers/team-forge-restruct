import React, { useState } from "react";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../App.css";
import "./Login-Register.css";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  // Hooks
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

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
    if (password != confirmPassword) {
      console.error("Passwords do not match.");
    } else {
      const name = `${firstName} ${lastName}`;
      const newUser: User = {
        id: 0,
        name: name,
        email: email,
        password: password,
      };
      axios
        .post("http://localhost:5000/register", {
          name: name, // Added the name field here
          email: email,
          password: password,
        })
        .then((response) => {
          console.log("User registered successfully:", response.data);
          // Optionally redirect to login or somewhere else after successful registration
          redirectToLogin();
        })
        .catch((error) => {
          console.error(`Error registering user: ${error}`);
        });
    }
  };

  /*
  const handleRegistration = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    if (password != confirmPassword) {
      alert("Passwords do not match");
    }
    const confirmUser = userDatabase.find(([username, userPassword]) => {
      return username === email && userPassword === password;
    });
    if (confirmUser) {
      alert("Login already exists");
    } else {
      alert("Creating");
    }
  };
*/

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
              <button type="button" onClick={handleRegistration}>
                Register
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Register;
