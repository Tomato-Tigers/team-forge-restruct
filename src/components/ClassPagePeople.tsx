import React, { useReducer, useState } from "react";

import "./Projects.css";

import MainLayout from "./MainLayout";
import "./ClassPage.css";
import "./ClassPageNavBar.css";
import "./ClassPagePeople.css";

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

const Test: React.FC<ClassPagePeopleProps> = ({ user, onLogout }) => {
  const { classID } = useParams<{ classID: string }>();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [relation, setRelation] = useState<string[]>([]);
  var x = 0;
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  if (profiles.length === 0) {
    const profileData = { email: user.email, classID: classID };
    axios
      .post("/api/search", profileData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("search result: " + JSON.stringify(res.data));
        setProfiles(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const relationData = { user: user.email };
    axios
      .post("/api/getRelation", relationData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("user relation: " + JSON.stringify(res.data));
        setRelation(res.data.relation);
        console.log("data: " + JSON.stringify(res.data));
        console.log("relation: " + JSON.stringify(relation));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const heart = (id: string) => {
    if (relation.includes(id)) relation.splice(relation.indexOf(id), 1);
    else relation.push(id);
    forceUpdate();
    const data = { user: user.email, relation: relation };
    axios
      .post("/api/updateRelation", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("set relation to " + relation);
  };

  return (
    <MainLayout user={user} onLogout={onLogout}>
      <ClassPageNavBar user={user} onLogout={onLogout} />
      <div className="profiles-container">
        <div className="profile-table">
          <div className="people-title">People</div>
          <div>
            {profiles.map((profile) => (
              <div className="profile-card" key={profile.id}>
                <div className="profile-head">
                  <div className="profile-name">{profile.name}</div>
                  <div className="profile-email">{profile.email}</div>
                </div>
                <div>
                  <div className="section-title">Skills</div>
                  {profile.skills.map((skill) => (
                    <div className="section-content">{skill}</div>
                  ))}
                  <div className="placeholder"></div>
                </div>
                <div>
                  <div className="section-title">Interests</div>
                  {profile.interests.map((interest) => (
                    <div className="section-content">{interest}</div>
                  ))}
                  <div className="placeholder"></div>
                </div>
                <div className="profile-tail">
                  <button className="heart" onClick={() => heart(profile.id)}>
                    <div>
                      {relation.includes(profile.id) ? "❤️" : "🤍"}
                      <div className="placeholder"></div>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Test;
