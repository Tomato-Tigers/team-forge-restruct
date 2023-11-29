import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import axios from "axios";

import { BsSliders } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

import "./PopoutComponent.css";

interface CheckboxOption {
  id: string;
  value: string;
}

const skills: CheckboxOption[] = [
  { id: "1", value: "JavaScript" },
  { id: "2", value: "Python" },
  // Add more skills here
];

const interests: CheckboxOption[] = [
  { id: "1", value: "Web Development" },
  { id: "2", value: "Machine Learning" },
  // Add more interests here
];

interface User {
  name: string;
  email: string;
}

interface PopoutComponent {
  user: User;
  classID: string;
  onLogout: () => void;
}

const PopoutComponent: React.FC<PopoutComponent> = ({
  user,
  classID,
  onLogout,
}) => {
  // Popout visibility toggle. Initiated as hidden (false).
  const [sidebar, setSidebar] = useState(false);
  // Hooks for each of the class-specific preferences.
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [preferredSkillsWeight, setPreferredSkillsWeight] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [interestsWeight, setInterestsWeight] = useState(0);

  useEffect(() => {
    if (user?.email) {
      axios
        .post("/api/getClassPreferences", {
          email: user?.email,
          classID: classID,
        })
        .then((res) => {
          const preferences = res.data;
          setSelectedSkills(preferences.preferredSkills);
          setPreferredSkillsWeight(preferences.preferredSkillsWeight);
          setSelectedInterests(preferences.interests);
          setInterestsWeight(preferences.interestsWeight);
        })
        .catch((error) => {
          console.error(`Error fetching preferences: ${error.message}`);
        });
    }
  }, [classID]);

  const showSidebar = () => setSidebar(!sidebar);

  const handleCheckboxChange = (
    setFunction: React.Dispatch<React.SetStateAction<string[]>>,
    selectedValues: string[],
    value: string
  ) => {
    if (selectedValues.includes(value)) {
      setFunction(selectedValues.filter((v) => v !== value));
    } else {
      setFunction([...selectedValues, value]);
    }
  };

  const handleUpdate = async () => {
    if (user?.email) {
      axios
        .post("/api/setClassPreferences", {
          email: user?.email,
          classID: classID,
          preferredSkills: selectedSkills,
          preferredSkillsWeight: preferredSkillsWeight,
          interests: selectedInterests,
          interestsWeight: interestsWeight,
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
                      checked={selectedSkills.includes(skill.value)}
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
                      checked={selectedInterests.includes(interest.value)}
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
            <button className="update-preferenes-button" onClick={handleUpdate}>
              Update
            </button>
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
};

export default PopoutComponent;
