import React, { ReactNode, useState } from "react";
import NavBar from "./NavBar";

// Define the shape of a user object
interface User {
  name: string;
  email: string;
}

// Define the props expected by the MainLayout component
interface MainLayoutProps {
  children: ReactNode;  
  user: User;           
  onLogout: () => void; 
}

// Functional component representing the main layout structure
const MainLayout: React.FC<MainLayoutProps> = ({
  user,
  onLogout,
  children,
}) => {
  return (
    <>
      {/* Render the NavBar component with user information and logout handler */}
      <NavBar user={user} onLogout={onLogout} />

      {/* Render the children components passed to MainLayout */}
      {children}
    </>
  );
};

export default MainLayout;

