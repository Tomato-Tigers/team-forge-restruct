import React, { ReactNode } from "react";
import NavBar from "./NavBar";
import { useState } from "react";


interface MainLayoutProps {
  children: ReactNode;
  user: User;
  onLogout: () => void;

}

interface User {
  name: string;
  email: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ user, onLogout, children }) => {

  return (
    <>
      <NavBar user = {user} onLogout={onLogout}/>
      {children}
    </>
  );
};

export default MainLayout;
