import axios from "axios";
import React, { useState } from "react";

import MainLayout from "./MainLayout";
import "./ClassPage.css";
import "./JoinClass.css";

interface User {
  name: string;
  email: string;
}

interface JoinClassProps {
  user: User;
  onLogout: () => void;
}

const JoinClass: React.FC<JoinClassProps> = ({ user, onLogout }) => {
  const [classCode, setClassCode] = useState<string>("");

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassCode(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Joined class with code: ${classCode}");
  };

  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div className="join-class-box">
        <div className="join-class-header">Join Class</div>
        <form className="join-class-form" onSubmit={handleSubmit}>
          <div className="subtitle">Enter the code for an existing class</div>
          <div className="form-group">
            <input
              type="classCode"
              placeholder="Class code"
              value={classCode}
              onChange={handleCodeChange}
            />
          </div>
          <footer>
            <button className="create-class-button" type="submit">
              Join
            </button>
          </footer>
        </form>
      </div>
    </MainLayout>
  );
};

export default JoinClass;
