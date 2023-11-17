import React, { useState } from "react";
import { useParams, Link, Routes, Route } from "react-router-dom";

import "./ClassPageNavBar.css";

import JoinClass from "./JoinClass";
import CreateClass from "./CreateClass";

interface User {
  name: string;
  email: string;
}

interface AddClassNavBarProps {
  user: User;
  onLogout: () => void;
}

const AddClassNavBar: React.FC<AddClassNavBarProps> = ({ user, onLogout }) => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <div className="navigation">
        <h1>Add Class</h1>
        <Link className="class-page-nav-item" to={"JoinClass"}>
          Join Class
        </Link>
        <Link className="class-page-nav-item" to={"CreateClass"}>
          Create Class
        </Link>
      </div>
      <Routes>
        <Route
          path="JoinClass"
          element={<JoinClass user={user} onLogout={onLogout} />}
        />
        <Route
          path="CreateClass"
          element={<CreateClass user={user} onLogout={onLogout} />}
        />
      </Routes>
    </>
  );
};

export default AddClassNavBar;
