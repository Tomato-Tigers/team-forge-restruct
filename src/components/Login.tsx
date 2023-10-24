import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
//import { useNavigate } from "react-router-dom";
import "./Login.css";

let userDatabase: [string, string][] = [
  ["alexandra.iotzova@emory.edu", "Password123"],
  ["ekurchin@emory.edu", "Password456"],
  ["hrmitch@emory.edu", "Password789"],
];

function Login() {
  // Hooks
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Handlers.
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    const confirmUser = userDatabase.find(([username, userPassword]) => {
      return username === email && userPassword === password;
    });
    if (confirmUser) {
      alert("Login successful");
      //navigate("/HomePage"), { state: { email: email } };
    } else {
      alert("Invalid username or password");
    }
  };
  /*
  const handleLogin = () => {
    fetch("/users/")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setEmail(jsonRes.usersList));
  */

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
              //onClick={redirectToRegisterPage}
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
