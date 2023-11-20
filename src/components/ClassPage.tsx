import React, { useState } from "react";
import {
  useParams,
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import MainLayout from "./MainLayout";
import ClassPageNavBar from "./ClassPageNavBar";
import "./ClassPage.css";
import axios from "axios";

interface User {
  name: string;
  email: string;
}

interface Project {
  title: string;
  description: string;
  members: string[];
}

interface ClassPageProps {
  user: User;
  onLogout: () => void;
}

const ClassPage: React.FC<ClassPageProps> = ({ user, onLogout }) => {
  const { classID } = useParams<{ classID: string }>();

  const location = useLocation();
  const subtitle = location.state.subtitle|| "Class Page";

  
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [newProjectTitle, setNewProjectTitle] = useState<string>("");
  const [newProjectDesc, setNewProjectDesc] = useState<string>("");
  const [newGroupName, setNewGroupName] = useState<string>("");

  useEffect(() => {
    if (classID) {
       axios.post("http://localhost:3001/getProjects", {
            classID: classID
          })
          .then((res) => {
            setProjects(res.data);
          })
          .catch((error) => {
          // alert(`Error fetching classes: ${error.message}`);
            console.error(`Error fetching projects: ${error.message}`);
          });}
  }, []);

  
  const handleNewProjectTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProjectTitle(e.target.value);
  };
  
  const handleNewProjectDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProjectDesc(e.target.value);
  };

  const handleNewGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGroupName(e.target.value);
  }

  const handleNewProjectSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newProjectTitle === "" || newProjectDesc === "") {
      setErrorMessage("Please fill out both fields.");
      return;
    }
    axios.post("/api/createProject", {
        email: user?.email,
        title: newProjectTitle,
        description: newProjectDesc,
        classID: classID,
        groupName: newGroupName,
      })
      .then((res) => {
        setProjects((prevProjects) => [
          ...prevProjects,
          {
            title: newProjectTitle,
            description: newProjectDesc,
            members: [user?.name],
          },
        ]);
        setNewProjectTitle("");
        setNewProjectDesc("");
        setShowForm(false);
      })
      .catch((error) => {
        setErrorMessage(`Error creating project: ${error.message}`);
        console.error(`Error creating project: ${error.message}`);
      });
  };

  
  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div className="class-page">
        <div className="navigation">
        <h1>{subtitle}</h1>
        <Link className="class-page-nav-item" to={`./people`}>
          Explore People
        </Link>
        <p className="class-page-nav-item" onClick = {() => setShowForm(!showForm)}> Add a Project</p>
        {showForm && (
          <form className={`new-project-form ${showForm ? 'animate' : ''}`} onSubmit={handleNewProjectSubmission}>
            <input
              type="text"
              placeholder="Group Name"
              value={newProjectTitle}
              onChange={handleNewProjectTitleChange}
            />
            <input
              type="text"
              placeholder="Project Name"
              value={newGroupName}
              onChange={handleNewGroupNameChange}
            />
            <input
              type="text"
              placeholder="Project Description"
              value={newProjectDesc}
              onChange={handleNewProjectDescChange}
            />
            <button type="submit">Add Project</button>
          </form>
        )}
        <p className="class-code">Class Code: {classID}</p>
      </div>
      <div className="projects">
        <h2>Projects</h2>
    
          {Array.isArray(projects) && projects.map(({ title, description, members }) => (

            <div className="class-card">
            <div className="title-subtitle">
              <div className="title">{title}</div>
              <div className="description">{description}</div>
            </div>
            <div className="members">
              Members: <span className="membersCount">{members}</span>
            </div>
          </div>
          ))}
      <Routes>
        <Route
          path="Projects"
          element={<div>Projects content goes here</div>}
        />
        <Route path="./People" element={<div>People content goes here</div>} />
      </Routes>
      </div>
        <ClassPageNavBar />
      </div>
    </MainLayout>
  );
};

export default ClassPage;
