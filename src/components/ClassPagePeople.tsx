import React, { useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import ClassPageNavBar from "./ClassPageNavBar";
import axios from "axios";
import { listenerCount } from "process";

import "./Projects.css";

import MainLayout from "./MainLayout";
import "./ClassPage.css";
import "./ClassPageNavBar.css";
import "./ClassPagePeople.css";


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
  const [profiles, setProfiles] = useState<Profile[]>([]); // user profiles
  const [relation, setRelation] = useState<string[]>([]); // relation of the current user
  const [num, setNum] = useState<number>(0);
  const [input, setInput] = useState<string>(""); // Number of students for the group form function
  const [, forceUpdate] = useReducer((x) => x + 1, 0); // force Update function
  React.useEffect(() => {
    if (num === 0) {
      axios
        .get("/api/search?email=" + user.email + "&classID=" + classID)
        .then((res) => {
          // console.log("search result: " + JSON.stringify(res.data));
          setProfiles(res.data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("/api/getRelation?user=" + user.email)
        .then((res) => {
          // console.log("user relation: " + JSON.stringify(res.data));
          setRelation(res.data.relation);
          // console.log("data: " + JSON.stringify(res.data));
          // console.log("relation: " + JSON.stringify(relation));
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      axios
        .get("/api/group?email=" + user.email + "&classID=" + classID + "&size=" + num)
        .then((res) => {
          console.log("search result: " + JSON.stringify(res.data));
          setProfiles(res.data);
        })
    .catch((error) => {
      console.log(error);
    });
}
  }, [num]);

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
  // console.log("set relation to " + relation);
};

// Parses the numerical input and sends it as a parameter to the algorithm call.
// As a default, will print "String 1" through "String x" where x = input.
const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  setNum(parseInt(input));
};

return (
  <MainLayout user={user} onLogout={onLogout}>
    <ClassPageNavBar user={user} onLogout={onLogout} />
    <div className="group-form-container">
      <div className="group-form-box">
        <form onSubmit={handleSubmit}>
          <div className="group-form-title">Grouping</div>
          <input className="group-form-title"
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="group-form-button" onSubmit={handleSubmit}>Group</button>
        </form>
      </div>
    </div>
    <div className="profiles-container">
      {profiles.map((profile) => (
        <div className="profile-card" key={profile.id}>
          <table className="profile-table">
            <tbody>
              <tr className="profile-row" key={profile.id}>
                <td className="profile-head">
                  <div className="placeholder"></div>
                  <div className="profile-name">
                    {profile.name}
                  </div>
                  <div className="profile-email">
                    {profile.email}
                  </div>
                  <div className="placeholder"></div>
                </td>
                <td>
                  <div className="section-title">Skills</div>
                  {profile.skills.map((skill) => (
                    <div className="section-content">{skill}</div>
                  ))}
                  <div className="placeholder"></div>
                </td>
                <td>
                  <div className="section-title">Interests</div>
                  {profile.interests.map((interest) => (
                    <div className="section-content">{interest}</div>
                  ))}
                  <div className="placeholder"></div>
                </td>
                <td className="profile-tail">
                  <button className="heart" onClick={() => heart(profile.id)}>
                    <div>
                      {relation.includes(profile.id) ? "❤️" : "🤍"}
                      <div className="placeholder"></div>
                    </div>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  </MainLayout>
);
};

export default Test;
