import React from "react";
import "./Projects.css";
import { Link } from "react-router-dom";

import MainLayout from "./MainLayout";

interface Class {
  id: string;
  title: string;
  subtitle: string;
  members: number;
}

interface ProjectProps {
  classes: Class[];
}

const Projects: React.FC<ProjectProps> = ({ classes }) => {
  return (
    <MainLayout>
      <div className="projects-container">
        {classes.map(({ id, title, subtitle, members }) => (
          <Link to={"/projects/${id}"}>
            <div key={id} className="class-card">
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
        <button className="add-button">+</button>
      </div>
    </MainLayout>
  );
};

export default Projects;
