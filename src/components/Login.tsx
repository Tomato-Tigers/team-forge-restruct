import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./Login.css";

/*

bnm
let userDatabase: [string, string][] = [
  ["alexandra.iotzova@emory.edu", "Password123"],
  ["ekurchin@emory.edu", "Password456"],
  ["hrmitch@emory.edu", "Password789"],
];
*/

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

  // Handlers.
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    axios
      .get<User[]>("http://localhost:4000/users")
      .then((res) => {
        const users = res.data;
        const user = users.find((user: User) => user.email === email);
        if (user) {
          if (user.password === password) {
            console.log("User found and password matches");
          } else {
            console.log("User found but password does not match");
          }
        } else {
          console.log("User not found");
        }
      })
      .catch((error: Error) => {
        console.error(`Error fetching data: ${error}`);
      });
  };

  /*
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
