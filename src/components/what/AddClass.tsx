import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import AddClassNavBar from "./AddClassNavBar";
import MainLayout from "./MainLayout";
import "./ClassPage.css";

// Define interfaces for user and class information
interface User {
  name: string;
  email: string;
}

interface Class {
  id: string;
  title: string;
  subtitle: string;
  members: string[];
}

// Define props for the AddClass component
interface AddClassProps {
  user: User;
  onLogout: () => void;
}

// Define the AddClass component
const AddClass: React.FC<AddClassProps> = ({ user, onLogout }) => {
  // State hooks to manage classes, new class information, form visibility, and error messages
  const [classes, setClasses] = useState<Class[]>([]);
  const [newClassTitle, setNewClassTitle] = useState<string>("");
  const [newClassSubtitle, setNewClassSubtitle] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // React Router hooks for navigation and location
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect to handle redirection when on the "/Projects/AddClass" route
  useEffect(() => {
    if (location.pathname === "/Projects/AddClass") {
      navigate("/Projects/AddClass/JoinClass");
    }
  }, [navigate, location.pathname]);

  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div className="add-class-page">
        {/* Render AddClassNavBar component for navigation */}
        <div className="add-class-page">
          <AddClassNavBar user={user} onLogout={onLogout} />
        </div>
      </div>
      {/* Render nested routes using the Outlet component */}
      <Outlet />
    </MainLayout>
  );
};

export default AddClass;
