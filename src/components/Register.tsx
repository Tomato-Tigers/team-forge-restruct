import React, { useState } from "react";
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
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/");
  };

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleRegistration = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    
    const name = `${firstName} ${lastName}`;
    
    axios.post("/api/register", {
      name: name,
      email: email,
      password: password,
    })
    .then((response) => {
      console.log("User registered successfully:", response.data);
      redirectToLogin();
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        alert("Error registering: " + error.response.data);
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
        <form className="login_form" onSubmit={handleRegistration}>
          <div className="subtitle">Register</div>
          <div className="form-group">
            <div className="name-group">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <input
                type="text"
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
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <footer>
            <div className="login_bottom_left">
              Already have an account? <span className="link" onClick={redirectToLogin}>Login here.</span>
            </div>
            <div className="login_bottom_right">
              <button
                className="login_redirect_button"
                type="submit"
              >
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
