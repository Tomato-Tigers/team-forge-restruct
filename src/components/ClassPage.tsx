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
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [newProjectTitle, setNewProjectTitle] = useState<string>("");
  const [newProjectDesc, setNewProjectDesc] = useState<string>("");
  const [newGroupName, setNewGroupName] = useState<string>("");
  axios
    .post("/api/createProject", {
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
          members: [user.name],
        },
      ]);
      setNewProjectTitle("");
      setNewProjectDesc("");
    })
    .catch((error) => {
      console.error(`Error creating project: ${error.message}`);
    });
  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div className="class-page">
        <ClassPageNavBar />
      </div>
    </MainLayout>
  );
};

export default ClassPage;
