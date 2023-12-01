import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

import "./ClassPageNavBar.css";
import ClassPageProjects from "./ClassPageProjects";
import ClassPagePeople from "./ClassPagePeople";


interface User {
  name: string;
  email: string;
}

interface ClassPageNavBarProps {
  user: User;
  onLogout: () => void;
}

const ClassPageNavBar: React.FC<ClassPageNavBarProps> = ({ user, onLogout }) => {
  const { classID } = useParams<{ classID: string }>();
  const [subtitle, setSubtitle] = useState<string>("Class Name"); // replace with subtitle from classID
  const navigate = useNavigate();
  

  useEffect(() => {
    if (classID) {
      axios
        .post("/api/getClassSubtitle", {
          classID: classID,
        })
        .then((res) => {
          setSubtitle(res.data.subtitle);
        })
        .catch((error) => {
          console.error(`Error fetching subtitle: ${error.response.data.message}`);
        });
    }
  }, []);


  
  const handleLeaveClass = () => {
    if (window.confirm("Are you sure you want to leave this class?") && user?.email) {

      axios.post("/api/leaveClass", {
        email: user?.email,
        classID: classID,
      })
      .then((res) => {
        navigate("/Projects");
    })
    .catch((error) => {
      console.error(`Error leaving class: ${error.response.message}`);
    });
  };
};

  return (
    <div>
      <div className="navigation">
        <h1> {subtitle} </h1>
        <Link className="class-page-nav-item" to={`/./Projects/${classID}/projects`} state={{ subtitle: subtitle }}>
          Projects
        </Link>
        <Link className="class-page-nav-item" to={`/./Projects/${classID}/people`} state={{ subtitle: subtitle }}>
          People
        </Link>
        <button className="leave-class-button" onClick={handleLeaveClass}>
          Leave Class
        </button>
      </div>
    </div>
  );
};

export default ClassPageNavBar;