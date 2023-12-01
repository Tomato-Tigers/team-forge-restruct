import React, { useReducer, useState } from "react";

import "./Projects.css";

import MainLayout from "./MainLayout";
import "./ClassPage.css";
import "./ClassPageNavBar.css";
import "./ClassPagePeople.css";

import { useParams } from "react-router-dom";
import ClassPageNavBar from "./ClassPageNavBar";
import { listenerCount } from "process";

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

  // useEffect(() => {
  //   if (user?.email) {
  //     axios
  //       .post("/api/getStudentByClassID", {
  //         email: user?.email,
  //       })
  //       .then((res) => {
  //         setProfiles(res.data);
  //       })
  //       .catch((error) => {
  //         console.error(`Error fetching people: ${error.message}`);
  //       });
  //   }
  // }, []);

  // TODO: get pref from website
  var pref = {
    interest: 5,
    skill: 5,
    hasSki: [], // skills that must have
    hasInt: [], // interests that must have
    notSki: [], // skills that must not have
    notInt: [], // interests that must not have
    maySki: [], // skills prefered
    mayInt: [], // interests prefered
  };

  if (profiles.length === 0) {
    console.log("set profile");
    // setPeople(Search.search(people, user.id, pref));
    setProfiles([
      {
        id: "1",
        name: "Person 1",
        email: "123@gmail.com",
        skills: [
          "Java",
          "Placeholder",
          "Placeholder",
          "Placeholder",
          "Placeholder",
        ],
        interests: [
          "music",
          "Placeholder",
          "Placeholder",
          "Placeholder",
          "Placeholder",
        ],
        availability: [";08:00-9:00;10:00-13:00", "", "", "", "", "", ""],
        relation: ["2"],
      },
      {
        id: "2",
        name: "Person 2",
        email: "123@gmail.com",
        skills: ["Java"],
        interests: ["food"],
        availability: [";08:00-9:00;10:00-13:00", "", "", "", "", "", ""],
        relation: [],
      },
      {
        id: "3",
        name: "Person 3",
        email: "123@gmail.com",
        skills: ["graphic design"],
        interests: ["food"],
        availability: [";08:00-9:00;10:00-13:00", "", "", "", "", "", ""],
        relation: ["2"],
      },
      {
        id: "4",
        name: "Person 4",
        email: "123@gmail.com",
        skills: ["C"],
        interests: ["biking"],
        availability: [";08:00-9:00;10:00-13:00", "", "", "", "", "", ""],
        relation: [],
      },
      {
        id: "5",
        name: "Person 4",
        email: "123@gmail.com",
        skills: ["C"],
        interests: ["biking"],
        availability: [";08:00-9:00;10:00-13:00", "", "", "", "", "", ""],
        relation: [],
      },
      {
        id: "6",
        name: "Person 4",
        email: "123@gmail.com",
        skills: ["C"],
        interests: ["biking"],
        availability: [";08:00-9:00;10:00-13:00", "", "", "", "", "", ""],
        relation: [],
      },
      {
        id: "7",
        name: "Person 4",
        email: "123@gmail.com",
        skills: ["C"],
        interests: ["biking"],
        availability: [";08:00-9:00;10:00-13:00", "", "", "", "", "", ""],
        relation: [],
      },
      {
        id: "8",
        name: "Person 4",
        email: "123@gmail.com",
        skills: ["C"],
        interests: ["biking"],
        availability: [";08:00-9:00;10:00-13:00", "", "", "", "", "", ""],
        relation: [],
      },
    ]);
  } else {
    console.log("profile already set");
  }
  console.log("profiles: " + JSON.stringify(profiles));

  const heart = (id: string) => {
    if (relation.includes(id)) relation.splice(relation.indexOf(id), 1);
    else relation.push(id);
    forceUpdate();
  };

  const [num, setNum] = useState<number | null>(null);
  const [input, setInput] = useState<string>("");
  const [list, setList] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setNum(parseInt(input));
    setInput("");
  };

  React.useEffect(() => {
    if (num !== null) {
      const newList: string[] = [];
      for (let i = 1; i <= num; i++) {
        newList.push(`String number ${i}`);
      }
      setList(newList);
    }
  }, [num]);

  return (
    <MainLayout user={user} onLogout={onLogout}>
      <ClassPageNavBar user={user} onLogout={onLogout} />
      <div className="class-page-people">
        <div className="group-form-box">
          <form onSubmit={handleSubmit}>
            <div>Grouping</div>
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
          {list.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
        <div className="profiles-container">
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
    </MainLayout>
  );
};

export default Test;
