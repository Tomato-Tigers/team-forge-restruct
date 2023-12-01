import React, {useState, useEffect} from "react";
import { useLocation, useParams, Link, Routes, Route, Outlet } from "react-router-dom";
import ClassPageNavBar from "./ClassPageNavBar";

import axios from "axios";

import "./ClassPage.css";

import MainLayout from "./MainLayout";


interface User {
  name: string;
  email: string;
}

interface ClassPageProps {
  user: User;
  onLogout: () => void;
}

interface Project{
    title: string;
    description: string;
    members: string[];
  }

const ClassPage: React.FC<ClassPageProps> = ({user, onLogout}) => {
  const { classID } = useParams<{ classID: string }>();

  

  const [projects, setProjects] = React.useState<Project[]>([]);
  const [newProjectTitle, setNewProjectTitle] = useState<string>("");
  const [newProjectDesc, setNewProjectDesc] = useState<string>("");
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
 
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
    axios
      .post("http://localhost:3001/createProject", { //replace with user.token
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
        <ClassPageNavBar user = {user} onLogout = {onLogout} />
        <Outlet />
      </div>
    </MainLayout>
  );
};



export default ClassPage;
