import React, { useState } from "react";
import ProfImg from './images/ProfImg.png';
import MessageImg from './images/Messages.png';
import MyProj from './images/MyProj.png';
import { useLocation, useNavigate , Link } from "react-router-dom";
import './HomePage.css';
import MainLayout from "./MainLayout";

function HomePage() {
    const location = useLocation();
    // State variables, hooks
    let navigate = useNavigate();
    let fullname = location.state.email.split('@')[0];
    let firstname = fullname.split('.')[0];
    let lastname = fullname.split('.')[1];
    let upperfirst = firstname.charAt(0).toUpperCase() + firstname.slice(1);
    let upperlast = lastname.charAt(0).toUpperCase() + lastname.slice(1);

    const redirectToProfilePage = () => {
        navigate("/ProfilePage", {
            state: {
                email: location.state.email
            }
        });
    };

    const redirectToMessagePage = () => {
        navigate("/Messages", {
            state: {
                email: location.state.email
            }
        });
    };

    const redirectToMyProjects = () => {
        navigate("/Projects", {
            state: {
                email: location.state.email
            }
        });
    };
    let myUsr = { myEmail: 'alexandra.iotzova@emory.edu', firstName: 'Alexandra' , lastName: 'Iotzova'}
    return (
        <MainLayout usr ={myUsr}>
        <div className="HomePageRoot">
            <h3>Home Page for {upperfirst} {upperlast} </h3>
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
}

export default HomePage;



