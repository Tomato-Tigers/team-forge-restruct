import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from 'rc-slider';
import './ProfilePage.css';
import MainLayout from "./MainLayout";
import axios from "axios";

interface User {
  name: string;
  email: string;
}

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfileProps> = ({ user, onLogout }) => {
  // Add states for skills and interests
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [availability, setAvailability] = useState<{ [day: string]: { [time: string]: boolean } }>({});


  useEffect(() => {
    fetchPreferences();
  }, [user.email]);

  const fetchPreferences = () => {
    axios.get(`/api/getStablePreferences?email=${encodeURIComponent(user.email)}`)
      .then(response => {
        const { stableSkills, stableInterests } = response.data;
        setSelectedSkills(stableSkills || []);
        setSelectedInterests(stableInterests || []);
      })
      .catch(error => console.error('Error fetching preferences:', error));
  };

  const handleSkillChange = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleInterestChange = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['Morning', 'Afternoon', 'Evening', 'Night'];

  const handleAvailabilityChange = (day: string, time: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: !(prev[day]?.[time] || false) // Toggle the value
      }
    }));
  };
  const handleSubmission = () => {
    axios.post('/api/setStablePreferences', {
      email: user.email,
      stableSkills: selectedSkills,
      stableInterests: selectedInterests,
      availability: availability
    })
    .then(() => {
      alert("Preferences saved successfully!");
    })
    .catch(error => {
      console.error('Error saving preferences:', error);
      alert("Error saving preferences.");
    });
  };


 

return (
  <MainLayout user={user} onLogout={onLogout}>
    <div className="ProfilePage">
      <div className="center-container">
        <div className="grid-container">
          <div className="section">
            <h2 className="blue-text">Skills:</h2>
            {["C", "C#", "C++", "Go", "Java", "JavaScript", "Perl", "Python","R","SQL"].map((skill) => (
              <div key={skill} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => handleSkillChange(skill)}
                />
                <label>{skill}</label>
              </div>
            ))}
          </div>

          <div className="section">
            <h2 className="blue-text">Interests:</h2>
            {["Reading", "Traveling", "Fishing", "Crafting", "Television", "Bird Watching", "Collecting", "Music", "Gardening", "Video Games", "Hiking"].map((interest) => (
              <div key={interest} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedInterests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
                />
                <label>{interest}</label>
              </div>
            ))}
          </div>

          <div className="section">
            <h2 className="blue-text">Availability:</h2>
            {daysOfWeek.map((day) => (
              <div key={day} className="availability-day">
                <h3>{day}</h3>
                <div className="time-slots">
                  {timeSlots.map((time) => (
                    <label key={time}>
                      <input
                        type="checkbox"
                        checked={availability[day]?.[time] || false}
                        onChange={() => handleAvailabilityChange(day, time)}
                      />
                      {time}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="submit-button" onClick={handleSubmission}>
          Submit
        </button>
      </div>
    </div>
  </MainLayout>
);
                  };
      export default ProfilePage;