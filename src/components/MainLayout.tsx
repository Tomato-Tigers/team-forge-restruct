import React, { ReactNode } from "react";
import NavBar from "./NavBar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default MainLayout;
