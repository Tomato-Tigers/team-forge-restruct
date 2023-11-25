import MainLayout from "./MainLayout";
import { useLocation, useNavigate , Link } from "react-router-dom";
import React, { useState } from "react";
import ProfImg from './images/ProfImg.png';
import MessageImg from './images/Messages.png';
import MyProj from './images/MyProj.png';
import './Home.css';




interface User {
  name: string;
  email: string;
}

interface HomeProps {
  user: User;
  onLogout: () => void;
}


const Home: React.FC<HomeProps> = ({ user, onLogout }) => {
  let navigate = useNavigate();

  const redirectToProfilePage = () => {
    navigate("/ProfilePage", {
      state: {
        email: 'ggg'
    }
    });
  };
  const redirectToMessagePage = () => {
    navigate("/Messages", {
        state: {
            user: user,
        }
    });
  };
  const redirectToMyProjects = () => {
    navigate("/Projects", {
        state: {
            email: 'ggg'
        }
    });
  };
  
  return (
    <MainLayout user={user} onLogout={onLogout}>
       <div className="HomePageRoot">
            <h3>Home Page for {user.name} </h3>
            <div className="TwoPanes">
                <div className="Images">
                    <button
                        className="toProfilePage"
                        type="button"
                        onClick={redirectToProfilePage}
                    >
                        <img src={ProfImg} alt="Profile" />
                    </button>
                    <button
                        className="toMessagesePage"
                        type="button"
                        onClick={redirectToMessagePage}
                    >
                        <img src={MessageImg} alt="Messages" />
                    </button>
                    <button
                        className="toMessagesePage"
                        type="button"
                        onClick={redirectToMyProjects}
                    >
                        <img src={MyProj} alt="My Projects" />
                    </button>
                    
                </div>
            </div>
        </div>
    </MainLayout>
  );
};

export default Home;
