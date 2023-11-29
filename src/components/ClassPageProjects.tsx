import axios from "axios";
import React, { useEffect, useState } from "react";

import "./Projects.css";

import MainLayout from "./MainLayout";
import ClassPageNavBar from "./ClassPageNavBar";
import "./ClassPage.css";
import "./ClassPageNavBar.css";

interface User {
  name: string;
  email: string;
}

interface Project {
  id: string;
  creator: string;
  title: string;
  description: string;
  members: string[];
}

interface ClassPageProjectsProps {
  user: User;
  onLogout: () => void;
  classID: string | undefined;
}

const ClassPageProjects: React.FC<ClassPageProjectsProps> = ({
  user,
  onLogout,
  classID,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .post("/api/getProjects", {
          email: user?.email,
        })
        .then((res) => {
          setProjects(res.data);
        })
        .catch((error) => {
          console.error(`Error fetching projects: ${error.message}`);
        });
    }
  }, []);

  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div className="class-page-projects">
        <ClassPageNavBar user={user} onLogout={onLogout} />
        {Array.isArray(projects) &&
          projects.map(({ title, creator, description, members }) => (
            <div className="class-card">
              <div className="title-subtitle">
                <div className="title">{title}</div>
                <div className="subtitle">{description}</div>
              </div>
              <div className="creator">{creator}</div>
              <div className="members">
                Members: <span className="membersCount">{members.length}</span>
              </div>
            </div>
          ))}
      </div>
    </MainLayout>
  );
};

export default ClassPageProjects;
