import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ClassPageNavBar.css";
import SuccessMessage from "./SuccessMessage";

// Define the User interface
interface User {
  name: string;
  email: string;
}

// Define the props interface for ClassPageNavBar component
interface ClassPageNavBarProps {
  user: User;
  onLogout: () => void;
}

// Define the ClassPageNavBar functional component
const ClassPageNavBar: React.FC<ClassPageNavBarProps> = ({ user, onLogout }) => {
  // Extract classID from the URL parameters
  const { classID } = useParams<{ classID: string }>();

  // State variables for subtitle and success message
  const [subtitle, setSubtitle] = useState<string>("Class Name"); // replace with subtitle from classID
  const [successMessage, setSuccessMessage] = useState<string>("");

  
  // Access the navigation object for programmatic navigation
  const navigate = useNavigate();


  // Fetch the subtitle for the class using classID when the component mounts
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


  // Handle leaving the class when the Leave Class button is clicked

  const handleLeaveClass = () => {
    if (window.confirm("Are you sure you want to leave this class?") && user?.email) {
      axios.post("/api/leaveClass", {
        email: user?.email,
        classID: classID,
      })
      .then((res) => {
        setSuccessMessage(res.data.message);
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/Projects");
        }, 3000);
      })
      .catch((error) => {
        console.error(`Error leaving class: ${error.response.message}`);
      });
    }


  };

  return (
    <div>
      <div className="navigation">
        <div className="container">
          <h1> {subtitle} </h1>
          <Link className="class-page-nav-item" to={`/./Projects/${classID}/projects`} state={{ subtitle: subtitle }}>
            Projects
          </Link>
          <Link className="class-page-nav-item" to={`/./Projects/${classID}/people`} state={{ subtitle: subtitle }}>
            People
          </Link>
          {successMessage && <SuccessMessage message={successMessage} />}
          <button className="leave-class-button" onClick={handleLeaveClass}>
            Leave Class
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassPageNavBar;
