import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "./Login-Register.css";

const Login: React.FC = () => {
  // State hooks
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
    axios
      .post('/api/login', { email, password })
      .then((response) => {
        // Handle successful login here
        console.log(response.data);
        navigate("/Home"); 
      })
      .catch((error) => {
        // Handle login error here
        if (error.response) {
          // Display server-provided error message to the user
          console.error(`Error during login: ${error.response.data}`);
        } else {
          // Handle other errors (e.g., network error)
          console.error(`Error during login: ${error.response.data}`);
        }
      });
  };

  return (
    <div className="login_box" id="login">
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
          <div className="login_bottom_left">
            Forgot password.
          </div>
          <div className="login_bottom_right">
            <button
              className="login_button"
              type="submit"
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
};

export default Login;
