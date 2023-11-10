import React, { useState } from "react";
import { ChangeEvent } from "react";
import { Route, useNavigate } from "react-router-dom";
import SuccessMessage from "./SuccessMessage";


import axios from "axios";

import "../App.css";
import "./Login-Register.css";
import { on } from "events";
import e from "express";


interface User {
  name: string;
  email: string;
}

interface LoginProps {
  onLogin: (user: User) => void;

}


const Login: React.FC<LoginProps> = ({onLogin}) => {
  // Hooks
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [user, setUser] = useState<User>({name: "", email: ""});

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
    const data = { email: email, password: password };
    axios.post("http://localhost:3001/login", data, { 
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
        console.log(res.data.name);
        //remove the {name:} from the name so it is just the name
        const username: string = JSON.stringify(res.data.name);
        console.log(username)
        const editedUsername = username.slice(8, -1);
        console.log(editedUsername)
        
        const useremail: string = JSON.stringify(res.data.email);
        console.log(useremail)
        
        // Handle successful login here, e.g., navigate to home page
        
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
          // Here, error.response.data will contain the error message
          // sent by the server ('Username not found' or 'Incorrect password').
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
      {showSuccessMessage && (<SuccessMessage message = {`Logged in as ${(user.name)}!`}/>)}
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
            Forgot password.
          </div>
          <div className="login_bottom_right">
            <button
              className="login_button"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
            {errorMessage && (<div className="error_message">{errorMessage}</div>)}
            <button
              className="login_redirect_button"
              type="button"
              onClick={redirectToRegister}
            >
              Don't have an account? Register here.
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
};

export default Login;
