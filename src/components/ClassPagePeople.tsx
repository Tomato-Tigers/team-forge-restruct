import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import "./Projects.css";

import MainLayout from "./MainLayout";
import ClassPageNavBar from "./ClassPageNavBar";
import "./ClassPage.css";
import "./ClassPageNavBar.css";

import axios from "axios";

interface User {
  name: string;
  email: string;
}

interface Project {
  id: string;
  creator: string;
  title: string;
  description: string;
  members: string[];
}

interface ClassPagePeopleProps {
  user: User;
  onLogout: () => void;
}

const ClassPagePeople: React.FC<ClassPagePeopleProps> = ({
  user,
  onLogout,
}) => {

  const location = useLocation();
  const subtitle = location.state.subtitle || "Class Name";

  const classID = useParams<{ classID: string }>();


  const [people, setPeople] = useState<User[]>([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .post("/api/getPeople", {
          email: user?.email,
        })
        .then((res) => {
          setPeople(res.data);
        })
        .catch((error) => {
          console.error(`Error fetching people: ${error.message}`);
        });
    }
  }, []);

  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div className="class-page-projects">
        <ClassPageNavBar user={user} onLogout={onLogout} />
        <ClassPageNavBar user={user} onLogout={onLogout} />
        {Array.isArray(people) &&
          people.map(({ name }) => (
            <div className="class-card">
              <div className="title-subtitle">
                <div className="title">{name}</div>
              </div>
            </div>
          ))}
      </div>
    </MainLayout>
  );
};

export default ClassPagePeople;
