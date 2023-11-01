import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ClassPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="class-page">
      <div className="navigation">
        <h1>Class Name</h1>
        <Link to={`/class/${id}/projects`}>Projects</Link>
        <Link to={`/class/${id}/people`}>People</Link>
      </div>
      <div className="content">{/* Class content goes here */}</div>
    </div>
  );
};

export default ClassPage;
