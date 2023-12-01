import React, { useReducer, useState } from "react";

import "./Projects.css";

import MainLayout from "./MainLayout";
import "./ClassPage.css";
import "./ClassPageNavBar.css";
import "./ClassPagePeople.css"

import { useParams } from "react-router-dom";
import { search } from "./../api/utils/_search.js";
import ClassPageNavBar from "./ClassPageNavBar";
import { getUserIdByEmail } from "../prismaAPI";
import axios from "axios";

// const Search = require("./../api/utils/_search.js");

interface User {
  name: string;
  email: string;
}
interface Profile {
  id: string;
  name: string;
  email: string;
  skills: string[];
  interests: string[];
  availability: string[];
  relation: string[];
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

const Test: React.FC<ClassPagePeopleProps> = ({
  user,
  onLogout,
}) => {
  const { classID } = useParams<{ classID: string }>();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [relation, setRelation] = useState<string[]>([]);
  var x = 0;
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  if (profiles.length === 0) {
    const data = { email: user.email, classID: classID };
    axios
      .post("/api/search", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setProfiles(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const heart = (id: string) => {
    if (relation.includes(id))
      relation.splice(relation.indexOf(id), 1);
    else
      relation.push(id);
    forceUpdate();
  }

  return (
    <MainLayout user={user} onLogout={onLogout}>
      <ClassPageNavBar user={user} onLogout={onLogout} />
      <div className="profiles-container">
        <table className="profile-table">
          <tbody>
            {profiles.map(profile => (
              <tr className="profile-card" key={profile.id}>
                <td className="profile-head">
                  <div className="profile-name">
                    {profile.name}
                  </div>
                  <div className="profile-email">
                    {profile.email}
                  </div>
                </td>
                <td>
                  <div className="section-title">Skills</div>
                  {profile.skills.map(skill => (
                    <div className="section-content">{skill}</div>
                  ))}
                  <div className="placeholder"></div>
                </td>
                <td>
                  <div className="section-title">Interests</div>
                  {profile.interests.map(interest => (
                    <div className="section-content">{interest}</div>
                  ))}
                  <div className="placeholder"></div>
                </td>
                <td className="profile-tail">
                  <button className="heart" onClick={() => heart(profile.id)}>
                    <div >
                      {relation.includes(profile.id) ? "❤️" : "🤍"}
                      <div className="placeholder"></div>
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table >
      </div>
    </MainLayout>
  );
};

export default Test;
