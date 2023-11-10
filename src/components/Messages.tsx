import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

import "./Projects.css";
import MainLayout from "./MainLayout";

interface User {
  name: string;
  email: string;
}

interface MessagesProps {
  user: User;
  onLogout: () => void;
}

const Messages: React.FC<MessagesProps> = ({user, onLogout}) => {
  return (
    <MainLayout user = {user} onLogout = {onLogout}>
      <div>Messages</div>
    </MainLayout>
  );
};

export default Messages;
