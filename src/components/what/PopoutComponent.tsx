import React, { useEffect, useState } from "react";
import { Link, useLocation} from "react-router-dom";
import { IconContext } from "react-icons";
import axios from "axios";

import { BsSliders } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

import "./PopoutComponent.css";
import SuccessMessage from "./SuccessMessage";
//interface of checkbox options
interface CheckboxOption {
  id: string;
  value: string;
}
//skill options 
const skills: CheckboxOption[] = [
  { id: "1", value: "C" },
  { id: "2", value: "C#" },
  { id: "3", value: "C++" },
  { id: "4", value: "Go" },
  { id: "5", value: "Java" },
  { id: "6", value: "JavaScript" },
  { id: "7", value: "Perl" },
  { id: "8", value: "Python" },
  { id: "9", value: "R" },
  { id: "10", value: "SQL" },
];
//interest options
const interests: CheckboxOption[] = [
  { id: "1", value: "AI" },
  { id: "2", value: "Computer Networks" },
  { id: "3", value: "Data Science" },
  { id: "4", value: "Game Design" },
  { id: "5", value: "Graphics" },
  { id: "6", value: "HCI" },
  { id: "7", value: "Information Security" },
  { id: "8", value: "ML" },
  { id: "9", value: "Systems" },
  { id: "10", value: "Theory" },
];
//user interface 
interface User {
  name: string;
  email: string;
}
//Popout component interface 
interface PopoutComponent {
  user: User;
  classID: string;
  onLogout: () => void;
}
//Popout component functional component 
const PopoutComponent: React.FC<PopoutComponent> = ({
  user,
  classID,
  onLogout,
}) => {
  // Popout visibility toggle. Initiated as hidden.
  const [sidebar, setSidebar] = useState(false);
  // Hooks for each of the class-specific preferences.
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [preferredSkillsWeight, setPreferredSkillsWeight] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [interestsWeight, setInterestsWeight] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


//Effect to log default values 
  useEffect(() => {
    console.log(
      "Default values: ",
      selectedSkills,
      preferredSkillsWeight,
      selectedInterests,
      interestsWeight
    );
  }, [
    selectedSkills,
    preferredSkillsWeight,
    selectedInterests,
    interestsWeight,
  ]);
//Effect to fetch user preferences 
  useEffect(() => {
    if (user?.email) {
      axios
        .post("/api/getClassPreferences", {
          email: user.email,
          classID: classID,
        })
        .then((res) => {
          const preferences = res.data;
          console.log("Preferences: ", preferences);
          //set preferences from the response 
          Array.isArray(preferences.preferredSkills) &&
            setSelectedSkills(preferences.preferredSkills);
          preferences.preferredSkillsWeight &&
            setPreferredSkillsWeight(preferences.preferredSkillsWeight);
          Array.isArray(preferences.interests) &&
            setSelectedInterests(preferences.interests);
          preferences.interestsWeight &&
            setInterestsWeight(preferences.interestsWeight);
        })
        .catch((error) => {
          console.error(`Error fetching preferences: ${error.message}`);
        });
    }
  }, [classID]);
//function to toggle sidebar visibility 
  const showSidebar = () => setSidebar(!sidebar);
//function to handle checkbox changes 
  const handleCheckboxChange = (
    setFunction: React.Dispatch<React.SetStateAction<string[]>>,
    selectedValues: string[] = [],
    value: string
  ) => {
    if (selectedValues.includes(value)) {
      setFunction(selectedValues.filter((v) => v !== value));
    } else {
      setFunction([...selectedValues, value]);
    }
  };
//function to handle preferences update 
  const handleUpdate = async () => {
    if (user?.email) {
      axios
        .post("/api/setClassPreferences", {
          email: user.email,
          classID: classID,
          preferredSkills: selectedSkills,
          preferredSkillsWeight: preferredSkillsWeight,
          interests: selectedInterests,
          interestsWeight: interestsWeight,
        })
        .then((res) => {
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 2000);
        })
        .catch((error) => {
          console.error(`Error updating preferences: ${error.message}`);
        });
    }
  };

  return (
    <div className={`popout-component ${sidebar ? "background-active" : ""}`}>
      <IconContext.Provider value={{ color: "white" }}>
        <div className="pref-navbar">
          {!sidebar && (
            <Link to="#" className="menu-bars">
              <BsSliders className="icon-open" onClick={showSidebar} />
            </Link>
          )}
        </div>
        {showSuccessMessage && (
              <SuccessMessage message="Preferences updated!" />
            )}
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="popout-toggle">
              <Link to="#" className="menu-bars">
                <IoMdClose onClick={() => setSidebar(false)} />
              </Link>
            </li>
            <li>
              <div className="nav-text">Preferred Skills</div>
              {skills.map((skill) => (
                <div key={skill.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={
                        Array.isArray(selectedSkills) &&
                        selectedSkills.includes(skill.value)
                      }
                      onChange={() =>
                        handleCheckboxChange(
                          setSelectedSkills,
                          selectedSkills,
                          skill.value
                        )
                      }
                    />
                    {skill.value}
                  </label>
                </div>
              ))}
            </li>
            <li>
              <div className="nav-text">Preferred Skills Weight</div>
              <input
                type="range"
                min="0"
                max="5"
                value={preferredSkillsWeight}
                onChange={(e) =>
                  setPreferredSkillsWeight(Number(e.target.value))
                }
              />
            </li>
            <li>
              <div className="nav-text">Interests</div>
              {interests.map((interest) => (
                <div key={interest.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={
                        Array.isArray(selectedSkills) &&
                        selectedInterests.includes(interest.value)
                      }
                      onChange={() =>
                        handleCheckboxChange(
                          setSelectedInterests,
                          selectedInterests,
                          interest.value
                        )
                      }
                    />
                    {interest.value}
                  </label>
                </div>
              ))}
            </li>
            <li>
              <div className="nav-text">Interests Weight</div>
              <input
                type="range"
                min="0"
                max="5"
                value={interestsWeight}
                onChange={(e) => setInterestsWeight(Number(e.target.value))}
              />
            </li>
            <button className="update-preferences-button" onClick={handleUpdate}>
              Update
            </button>
  
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
};

export default PopoutComponent;
