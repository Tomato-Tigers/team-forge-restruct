import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from 'react-icons/fa';
import MainLayout from "./MainLayout";
import "./ClassPage.css";
import "./JoinClass.css";
import AddClassNavBar from "./AddClassNavBar";
import SuccessMessage from "./SuccessMessage";

// Defining interfaces for User and Class objects
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

// Props interface for the JoinClass component
interface JoinClassProps {
  user: User;
  onLogout: () => void;
}

// JoinClass functional component
const JoinClass: React.FC<JoinClassProps> = ({ user, onLogout }) => {
  // State hooks to manage component state
  const [classes, setClasses] = useState<Class[]>([]);
  const [classCode, setClassCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  // useEffect hook to fetch classes 
  useEffect(() => {
    if (user?.email) {
      axios
        .get("/api/listClasses", {
          params: {
            email: user?.email,
          },
        })
        .then((res) => {
          setClasses(res.data);
        })
        .catch((error) => {
          console.error(`Error fetching classes: ${error.message}`);
        });
    }
  }, []);

  // Function to handle joining a class
  const handleJoinClass = (classID: string) => {
    axios.post("/api/joinClass", {
      email: user?.email,
      classID: classID,
    })
    .then((res) => {
      setSuccessMessage(res.data.message);
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/Projects");
      }, 3000);
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
        {successMessage && <SuccessMessage message={successMessage} />} 
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

