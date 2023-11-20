import React, { useState, useEffect } from "react";
import {
  useParams,
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";

import MainLayout from "./MainLayout";
import ClassPageNavBar from "./ClassPageNavBar";
import "./ClassPage.css";
import axios from "axios";

interface User {
  name: string;
  email: string;
}

interface Project {
  title: string;
  description: string;
  members: string[];
}

interface ClassPageProps {
  user: User;
  onLogout: () => void;
}

const ClassPage: React.FC<ClassPageProps> = ({ user, onLogout }) => {
  const { classID } = useParams<{ classID: string }>();

  
  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div className="class-page">
        <ClassPageNavBar />
        <Outlet />
      </div>
    </MainLayout>
  );
};

export default ClassPage;
