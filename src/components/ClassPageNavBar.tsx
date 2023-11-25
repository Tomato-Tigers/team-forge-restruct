import React, { useState } from "react";
import { useLocation, useParams, Link, Routes, Route } from "react-router-dom";

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
  const { classID } = useParams<{ classID: string }>();
  
  const location = useLocation();
  const subtitle = location.state.subtitle || "Class Name";
  
  return (
    <>
      <div className="navigation">
        <h1>{subtitle}</h1>
        <Link className="class-page-nav-item" to={`./Projects`}>
          Projects
        </Link>
        <Link className="class-page-nav-item" to={`./People`}>
          People
        </Link>
      </div>
      <Routes>
        <Route
          path="Projects"
          element={<div>Projects content goes here</div>}
        />
        <Route path="People" element={<div>People content goes here</div>} />
      </Routes>
    </>
  );
};

export default ClassPageNavBar;
