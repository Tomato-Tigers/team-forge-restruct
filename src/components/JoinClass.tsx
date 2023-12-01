import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from 'react-icons/fa';

import MainLayout from "./MainLayout";
import "./ClassPage.css";
import "./JoinClass.css";
import AddClassNavBar from "./AddClassNavBar";

interface User {
  name: string;
  email: string;
}

interface Class {
  classID: string;
  title: string;
  subtitle: string;
  members: string[];
}


interface JoinClassProps {
  user: User;
  onLogout: () => void;
}

const JoinClass: React.FC<JoinClassProps> = ({ user, onLogout }) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [classCode, setClassCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) { // can be replaced for user.token
      axios
        .get("http://localhost:3001/listClasses", {
          params: {
            email: user?.email,
            },})
        .then((res) => {
          setClasses(res.data);
        })
        .catch((error) => {
          // alert(`Error fetching classes: ${error.message}`);
          console.error(`Error fetching classes: ${error.message}`);
        });
    }
  }, []);

  const handleJoinClass = (classID: string) => {
    axios.post("http://localhost:3001/joinClass", {
      email: user?.email,
      classID: classID,
    })
    .then((res) => {
      alert(res.data.message); //replace with success message
      navigate("/Projects");
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        const message = error.response.data.message
        setErrorMessage(message);
          setTimeout(() => {
            setErrorMessage("");
        }, 2000);
      } else {
        setErrorMessage(error.response.data.message);
          setTimeout(() => {
            setErrorMessage("");
        }, 2000);
      }
    })
  }

  return (
    <MainLayout user={user} onLogout={onLogout}>
      <AddClassNavBar user={user} onLogout={onLogout} />
      {errorMessage && (
        <div className="error-message">
        <FaExclamationTriangle />{errorMessage}
        </div>
      )}
      <div className="class-card-container">
      {classes.map(({ classID, title, subtitle, members }) => (
        <div key={classID} className="class-card">
        <div className="title-subtitle">
          <div className="title">{title}</div>
          <div className="subtitle">{subtitle}</div>
        </div>
        <div className="members">
          Members:{" "}
          <span className="membersCount">{members.length}</span>
        </div>
        <button className="join-button" onClick={() => handleJoinClass(classID)}>Join</button>
      </div>
      ))}
      </div>
    </MainLayout>
  );
};

export default JoinClass;
