import React, { ReactNode, useState } from "react";
import NavBar from "./NavBar";


interface User {
  name: string;
  email: string;
}

interface MainLayoutProps {
  children: ReactNode;
  user: User;
  onLogout: () => void;

const MainLayout: React.FC<MainLayoutProps> = ({ user, onLogout, children }) => {

  return (
    <>
      <NavBar user = {user} onLogout={onLogout}/>
      {children}
    </>
  );
};

export default MainLayout;
