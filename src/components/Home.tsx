import MainLayout from "./MainLayout";
import { useLocation, useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import ProfImg from './images/ProfImg.png';
import MessageImg from './images/Messages.png';
import MyProj from './images/MyProj.png';
import './Home.css';

// Defining the User interface for type safety
interface User {
  name: string;
  email: string;
}

// Props interface for the Home component
interface HomeProps {
  user: User;
  onLogout: () => void;
}

// Functional component representing the Home page
const Home: React.FC<HomeProps> = ({ user, onLogout }) => {
  // Using the useNavigate hook from react-router-dom to enable navigation
  let navigate = useNavigate();

  // Function to redirect to the ProfilePage
  const redirectToProfilePage = () => {
    navigate("/ProfilePage", {
      state: {
        email: 'ggg'
      }
    });
  };

  // Function to redirect to the Messages page
  const redirectToMessagePage = () => {
    navigate("/Messages", {
      state: {
        user: user,
      }
    });
  };

  // Function to redirect to the Projects page
  const redirectToMyProjects = () => {
    navigate("/Projects", {
      state: {
        email: 'ggg'
      }
    });
  };

  // Render the Home component
  return (
    <MainLayout user={user} onLogout={onLogout}>
      {/* Main container for the Home page */}
      <div className="HomePageRoot">
        {/* Heading displaying the user's name */}
        <h3>Home Page for {user.name}</h3>

        {/* Container for two panes */}
        <div className="TwoPanes">
          {/* Container for images */}
          <div className="Images">
            {/* Button to navigate to ProfilePage */}
            <button
              className="toProfilePage"
              type="button"
              onClick={redirectToProfilePage}
            >
              {/* Profile image */}
              <img src={ProfImg} alt="Profile" />
            </button>

            {/* Button to navigate to Messages page */}
            <button
              className="toMessagesePage"
              type="button"
              onClick={redirectToMessagePage}
            >
              <img src={MessageImg} alt="Messages" />
            </button>

            {/* Button to navigate to MyProjects page */}
            <button
              className="toMessagesePage"
              type="button"
              onClick={redirectToMyProjects}
            >
              {/* My Projects image */}
              <img src={MyProj} alt="My Projects" />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
