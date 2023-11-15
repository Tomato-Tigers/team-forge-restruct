import React from "react";
import "./Projects.css";
import { useParams, Link, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import MainLayout from "./MainLayout";
import ClassPage from "./ClassPage";

interface Class {
  id: string;
  title: string;
  subtitle: string;
  members: number;
}

interface ProjectProps {
  user: User;
  onLogout: () => void;
}

interface User {
  name: string;
  email: string;
}

const Projects: React.FC<ProjectProps> = ({user, onLogout}) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [newClassTitle, setNewClassTitle] = useState<string>("");
  const [newClassSubtitle, setNewClassSubtitle] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (user?.email) {
       axios.post("http://localhost:3001/getClasses", {
            email: user?.email
          })
          .then((res) => {
            setClasses(res.data);
          })
          .catch((error) => {
          // alert(`Error fetching classes: ${error.message}`);
            console.error(`Error fetching classes: ${error.message}`);
          });}
  }, []);

  const handleNewClassTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewClassTitle(e.target.value);
  };

  const handleNewClassSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewClassSubtitle(e.target.value);
  };

  const handleNewClassSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newClassTitle === "" || newClassSubtitle === "") {
      setErrorMessage("Please fill out both fields.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    } 
      
      

    axios.post("http://localhost:3001/addClass", { email: user.email, title: newClassTitle, subtitle: newClassSubtitle })
      .then((res) => {
        alert(`Class added successfully: ${res.data.title}`);
        setClasses([...classes, res.data]);
        setNewClassTitle("");
        setNewClassSubtitle("");
      })
      .catch((error) => {
        if (error.status === 409){
          alert(`This class already exists. The class has been added to your profile.`);
          setClasses([...classes, error.data]);
          setNewClassTitle("");
          setNewClassSubtitle("");
        } else {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        console.error(`Error creating class: ${error.message}`);
        }
      });
  };

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  return (
    <MainLayout user = {user} onLogout={onLogout}>
      
      <div className="projects-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {Array.isArray(classes) && classes.map(({ id, title, subtitle, members }) => (
                  <Link key={id} to={`/Projects/${id}`}>
                    <div className="class-card">
                      <div className="title-subtitle">
                        <div className="title">{title}</div>
                        <div className="subtitle">{subtitle}</div>
                      </div>
                      <div className="members">
                        Members: <span className="membersCount">{members}</span>
                      </div>
                    </div>
                  </Link>
                ))}
                {showForm ? (
                  <form className={`new-class-form ${showForm ? 'animate' : ''}`} onSubmit = {handleNewClassSubmission}>
                    <div className="form-header">Add a class to your profile:</div>
                    {errorMessage && (<div className="error_message">{errorMessage}</div>)} 
                      <input
                        type="text"
                        placeholder="Class Title i.e. C.S. 370"
                        value={newClassTitle}
                        onChange={handleNewClassTitleChange}
                        style = {{width: "100%"}}
                      />
  

                      <input
                        type="text"
                        placeholder="Class Subtitle i.e. C.S. Practicum"
                        value={newClassSubtitle}
                        onChange={handleNewClassSubtitleChange}
                        style = {{width: "100"}}
                      />
                    
                    <div className="form-buttons">
                      <button type = "button" onClick = {() => setShowForm(false)}>Cancel</button>
                      <button type="submit">Add Class</button>
                    </div>
                  </form>
                ) : (
                <button className="add-button" onClick = {handleAddButtonClick}>+</button> 
                )}
              </>
            }
          />
          <Route path="/Projects/:id/*" element={<ClassPage />} />
        </Routes>
      </div>
    </MainLayout>
  );
};

export default Projects;
