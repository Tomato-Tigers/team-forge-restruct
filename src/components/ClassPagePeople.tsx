import React, { useEffect, useState } from "react";

import "./Projects.css";

import MainLayout from "./MainLayout";
import ClassPageNavBar from "./ClassPageNavBar";
import "./ClassPage.css";
import "./ClassPageNavBar.css";

import axios from "axios";

const Search = require("./../api/utils/_search.js");


interface User {
  name: string;
  email: string;
  id: string;
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
  // TODO: uncomment this
  // classID: string | undefined;
}

const ClassPagePeople: React.FC<ClassPagePeopleProps> = ({
  // TODO: uncomment these
  user,
  onLogout,
  // classID,
}) => {
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

  // TODO: get pref and filter from website
  var pref = {
    interest: 5,
    skill: 5
  };

  var filter = {
    hasSki: [],     // skills that must have
    hasInt: [],     // interests that must have
    notSki: [],     // skills that must not have
    notInt: [],     // interests that must not have
    maySki: [],     // skills prefered
    mayInt: []      // interests prefered
  }

  setPeople(Search.search(people, user.id, pref, filter));

  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div className="class-page-projects">
        <ClassPageNavBar />
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
