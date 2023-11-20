import React, { useState } from "react";
import { useParams, Link, Routes, Route } from "react-router-dom";

import "./ClassPageNavBar.css";

interface Project {
  id: string;
  creator: string;
  title: string;
  description: string;
  members: string[];
}

interface ProjectProps {
  projects: Project[];
}

const ClassPageNavBar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <div className="navigation">
        <h1>Class Name</h1>
        <Link className="class-page-nav-item" to={`./projects`}>
          Projects
        </Link>
        <Link className="class-page-nav-item" to={`./people`}>
          People
        </Link>
      </div>
      <Routes>
        <Route
          path="projects"
          element={<div>Projects content goes here</div>}
        />
        <Route path="people" element={<div>People content goes here</div>} />
      </Routes>
    </>
  );
};

export default ClassPageNavBar;
