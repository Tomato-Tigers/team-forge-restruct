import useLocalState from "../components/useLocalStorage.js";
import{Navigate} from "react-router-dom";
import React, { ReactNode, ReactElement } from 'react';



interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }): ReactElement | null => {
    console.log("privateRoute");
  const [jwt, setJwt] = useLocalState("", "jwt");
  return jwt ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;