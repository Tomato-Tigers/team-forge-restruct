import React from "react";
import "./Projects.css";
import { useParams, Link, Routes, Route } from "react-router-dom";

import MainLayout from "./MainLayout";
import ClassPage from "./ClassPage";

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
        <Routes>
          <Route
            path="/"
            element={
              <>
                {classes.map(({ id, title, subtitle, members }) => (
                  <Link to={"/Projects/${id}"}>
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
              </>
            }
          />
          <Route path=":id/*" element={<ClassPage />} />
        </Routes>
      </div>
    </MainLayout>
  );
};

export default Projects;
