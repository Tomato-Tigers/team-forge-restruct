import React, { useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import axios from "axios";
import useLocalState from './useLocalStorage';
import SuccessMessage from "./SuccessMessage";

import "../App.css";
import "./Login-Register.css";

// Define the structure of a User
interface User {
  name: string;
  email: string;
}

// Define the properties expected by the Login component
interface LoginProps {
  onLogin: (user: User) => void;  // Callback function triggered on successful login
}

// Define the expected structure of the login response from the server
interface LoginResponse {
  email: string;
  name: string;
  token: string;
  message: string;
}

// Login component
const Login: React.FC<LoginProps> = ({ onLogin }) => {
  // State hooks for managing form input and messages
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [user, setUser] = useState<User>({ name: "", email: "" });

  const navigate = useNavigate();  // Hook for programmatic navigation

  // Event handler to navigate to the registration page
  const redirectToRegister = () => {
    navigate("/Register");
  };

  // Event handlers for updating email and password state
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // Event handler for form submission (login)
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { email: email, password: password };

    // Send a POST request to the server to authenticate the user
    axios
      .post<LoginResponse>("/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const { name, email } = res.data;
        const user: User = { name, email };
       


        // Assuming the JWT is in res.data.jwt
        const jwt = res.data.token;
        localStorage.setItem('jwt', jwt);

        setUser(user);
        onLogin(user);  // Invoke the provided onLogin callback
        setShowSuccessMessage(true);

        // Redirect to the home page 
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate("/Home");
        }, 2000);
      })
      .catch((error) => {
        // Handle errors from the server response
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message);
          setTimeout(() => {
            setErrorMessage("asdasd");
          }, 5000);
        } else {
          setErrorMessage(error.response.data.message);
          setTimeout(() => {
            setErrorMessage("qweqwe");
          }, 5000);
        }
      });
  };

  return (
    <div className="login_box" id="login">
      {showSuccessMessage && (
        <SuccessMessage message={`Logged in as ${user.name}!`} />
      )}
      <div className="login_header">
        <span className="blue_text">Team</span>Forge
      </div>
      <form className="login_form" onSubmit={handleLogin}>
        <div className="subtitle">Login</div>
        <div className="form-group">
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
        <footer>
          <div className="login_bottom_left">Forgot password.</div>
          <div className="login_bottom_right">
            <button className="login_button" type="submit">
              Login
            </button>
            <button
              className="login_redirect_button"
              type="button"
              onClick={redirectToRegister}
            >
              Register
            </button>
            
            {errorMessage && (
              <div className="error_message">{errorMessage}</div>
            )}
          </div>
        </footer>
      </form>
    </div>
  );
};

export default Login;
