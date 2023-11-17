import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import AddClassNavBar from "./AddClassNavBar";
import MainLayout from "./MainLayout";

import "./ClassPage.css";

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

interface AddClassProps {
  user: User;
  onLogout: () => void;
}

const AddClass: React.FC<AddClassProps> = ({ user, onLogout }) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [newClassTitle, setNewClassTitle] = useState<string>("");
  const [newClassSubtitle, setNewClassSubtitle] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  // Check out the dependency array and mess with it
  useEffect(() => {
    if (location.pathname === "/Projects/AddClass") {
      navigate("JoinClass");
    }
  }, [navigate, location.pathname]);

  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div className="add-class-page">
        <AddClassNavBar user={user} onLogout={onLogout} />
      </div>
    </MainLayout>
  );
};

export default AddClass;
