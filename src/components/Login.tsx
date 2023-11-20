import React, { useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import axios from "axios";

import SuccessMessage from "./SuccessMessage";

import "../App.css";
import "./Login-Register.css";

interface User {
  name: string;
  email: string;
}

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  // State hooks
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [user, setUser] = useState<User>({ name: "", email: "" });

  const navigate = useNavigate();

  // Event handlers
  const redirectToRegister = () => {
    navigate("/Register");
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { email: email, password: password };
    axios
      .post("/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const username: string = JSON.stringify(res.data.name);
        const editedUsername = username.slice(8, -1);
        const useremail: string = JSON.stringify(res.data.email);
        const user: User = { name: editedUsername, email: useremail };
        setUser(user);
        onLogin(user);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate("/Home");
        }, 2000);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        } else {
          setErrorMessage(error.message);
          setTimeout(() => {
            setErrorMessage("");
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
