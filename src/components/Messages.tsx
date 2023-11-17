import React from "react";
import "./Projects.css";
import { Link } from "react-router-dom";

import MainLayout from "./MainLayout";

interface User {
  name: string;
  email: string;
}

interface MessagesProps {
  user: User;
  onLogout: () => void;
}

const Messages: React.FC<MessagesProps> = ({ user, onLogout }) => {
  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div>Messages</div>
    </MainLayout>
  );
};

export default Messages;
