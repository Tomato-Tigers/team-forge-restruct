// Import React and necessary hooks/components from react-router-dom
import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link, Routes, Route, Outlet } from "react-router-dom";
import ClassPageNavBar from "./ClassPageNavBar";
import axios from "axios";
import "./ClassPage.css";
import MainLayout from "./MainLayout";

// Define interfaces for user and project information
interface User {
  name: string;
  email: string;
}

interface Project {
  title: string;
  description: string;
  members: string[];
}

// Define props for the ClassPage component
interface ClassPageProps {
  user: User;
  onLogout: () => void;
}

// Define the ClassPage component
const ClassPage: React.FC<ClassPageProps> = ({ user, onLogout }) => {
  // Extract the 'classID' parameter from the current route using useParams hook
  const { classID } = useParams<{ classID: string }>();

  // State hooks for managing project-related information and form fields
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [newProjectTitle, setNewProjectTitle] = useState<string>("");
  const [newProjectDesc, setNewProjectDesc] = useState<string>("");
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Event handler for handling changes in the new project title field
  const handleNewProjectTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProjectTitle(e.target.value);
  };

  // Event handler for handling changes in the new project description field
  const handleNewProjectDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProjectDesc(e.target.value);
  };

  // Event handler for handling changes in the new group name field
  const handleNewGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGroupName(e.target.value);
  }

  // Event handler for submitting a new project
  const handleNewProjectSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newProjectTitle === "" || newProjectDesc === "") {
      setErrorMessage("Please fill out both fields.");
      return;
    }
    // Make a POST request to create a new project
    axios
      .post("http://localhost:3001/createProject", { // replace with user.token
        email: user?.email,
        title: newProjectTitle,
        description: newProjectDesc,
        classID: classID,
        groupName: newGroupName,
      })
      .then((res) => {
        // Update the projects state with the new project
        setProjects((prevProjects) => [
          ...prevProjects,
          {
            title: newProjectTitle,
            description: newProjectDesc,
            members: [user?.name],
          },
        ]);
        // Reset form fields and hide the form
        setNewProjectTitle("");
        setNewProjectDesc("");
        setShowForm(false);
      })
      .catch((error) => {
        // Handle errors when creating a project
        setErrorMessage(`Error creating project: ${error.message}`);
        console.error(`Error creating project: ${error.message}`);
      });
  };

  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div className="class-page">
        {/* Render ClassPageNavBar component */}
        <ClassPageNavBar user={user} onLogout={onLogout} />
        {/* Render nested routes under the Outlet */}
        <Outlet />
      </div>
    </MainLayout>
  );
};

export default ClassPage;
