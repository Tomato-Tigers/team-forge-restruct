import React, { useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import axios from "axios";

import SuccessMessage from "./SuccessMessage";

import "../App.css";
import "./Login-Register.css";

interface User {
  name: string;
  email: string;
  id: string;
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
  const [user, setUser] = useState<User>({ name: "", email: "", id: "" });

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
        const userName: string = JSON.stringify(res.data.name);
        let editedUserName = userName.slice(8, -1);
        editedUserName = editedUserName.replaceAll(/['"]/g, '');
        let userEmail: string = JSON.stringify(res.data.email);
        userEmail = userEmail.replaceAll(/['"]/g, '');
        //TODO: get ID here
        const user: User = { name: editedUserName, email: userEmail, id: "a33f3238-b960-4180-83cc-35be7fa71e55" };


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
