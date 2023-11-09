import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import MainLayout from "./MainLayout";
import UsrProps from "./UsrProps";

function Home( ) {
  const location = useLocation();
  const usr=location.state;
  
  return (
    <MainLayout usr={usr} >
      <div>Home Page </div>;
    </MainLayout>
  );
}
export default Home;

