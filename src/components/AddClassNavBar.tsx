import React, { useState } from "react";
import { useParams, Link, Routes, Route } from "react-router-dom";
import "./AddClassNavBarcss.css";

// Define interfaces for user information
interface User {
  name: string;
  email: string;
}

// Define props for the AddClassNavBar component
interface AddClassNavBarProps {
  user: User;
  onLogout: () => void;
}

// Define the AddClassNavBar component
const AddClassNavBar: React.FC<AddClassNavBarProps> = ({ user, onLogout }) => {
  // Extract the 'id' parameter from the current route using useParams hook
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <div className="navigation">
        {/* Display the title for the Add Class section */}
        <h1>Add Class</h1>
        {/* Create navigation links for Join Class and Create Class routes */}
        <Link className="class-page-nav-item" to={"/./Projects/AddClass/JoinClass"}>
          Join Class
        </Link>
        <Link className="class-page-nav-item" to={"/./Projects/AddClass/CreateClass"}>
          Create Class
        </Link>
      </div>
    </>
  );
};

export default AddClassNavBar;
