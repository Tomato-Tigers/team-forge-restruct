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

function Login() {
  // Hooks
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  // Handlers.
  const redirectToRegister = () => {
    navigate("/Register");
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    axios
      .post("https://team-forge-restruct.vercel.app/login", { email, password })
      .then((res) => {
        // Handle successful login here, e.g., navigate to home page
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          // Here, error.response.data will contain the error message 
          // sent by the server ('Username not found' or 'Incorrect password').
          console.error(`Error during login: ${error.response.data}`);
        } else {
          console.error(`Error during login: ${error.message}`);
        }
      });
  };
  

  

  return (
    <div className="login_box" id="login">
      <div className="login_header">
        <span className="blue_text">Team</span>Forge
      </div>
      <form className="login_form">
        <div className="subtitle">Login</div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
        </div>
        <footer>
          <div className="login_bottom_left" id="signInDiv">
            Login with Google.
          </div>
          <div className="login_bottom_right">
            <button
              className="login_button"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="login_redirect_button"
              type="button"
              onClick={redirectToRegister}
            >
              Register
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}

export default Login;
