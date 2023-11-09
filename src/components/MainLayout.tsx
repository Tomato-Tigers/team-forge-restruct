import React, { ReactNode } from "react";
import NavBar from "./NavBar";
import UsrProps from "./UsrProps";

interface MainLayoutProps {
  usr:UsrProps;
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children , usr}) => {
  return (
    <>
      <NavBar myEmail={usr.myEmail} firstName={usr.firstName} lastName={usr.firstName} />
      <p>{usr.myEmail}</p>
      {children}
    </>
  );
};

export default MainLayout;
