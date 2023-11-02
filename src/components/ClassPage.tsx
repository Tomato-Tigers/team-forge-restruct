import React from "react";
import { useParams, Link, Routes, Route } from "react-router-dom";

import "./ClassPage.css";

import MainLayout from "./MainLayout";

const ClassPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="class-page">
      <div className="navigation">
        <h1>Class Name</h1>
        <Link className="class-page-nav-item" to={`./${id}/projects`}>
          Projects
        </Link>
        <Link className="class-page-nav-item" to={`./${id}/people`}>
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
    </div>
  );
};

export default ClassPage;
