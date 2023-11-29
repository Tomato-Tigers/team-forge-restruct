import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from 'rc-slider';
import './ProfilePage.css';
import MainLayout from "./MainLayout";
import axios from "axios";
interface User {
    name: string;
    email: string;
  }

interface Profilerops {
    user: User;
    onLogout: () => void;
  }
  const ProfilePage: React.FC<Profilerops> = ({ user, onLogout })  =>  {
    
        const [interestValue, setInterestValue] = useState(1);
        const [availabilityValue, setAvailabilityValue] = useState(1);
        const [teamExperienceValue, setTeamExperienceValue] = useState(1);
        const [ExperienceValue, setExperienceValue] = useState(1);
        const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
        const [availability, setAvailability] = useState<{ [day: string]: string }>({});
        const [selectedDays, setSelectedDays] = useState<string[]>([]);


    
        const handleInterestChange = (newValue: number | number[]) => {
            if (typeof newValue === 'number') {
                setInterestValue(newValue);
            } else {
                setInterestValue(newValue[0]);
            }
        };
    
        const handleAvailabilityChange = (newValue: number | number[]) => {
            if (typeof newValue === 'number') {
                setAvailabilityValue(newValue);
            } else {
                setAvailabilityValue(newValue[0]);
            }
        };
    
        const handleTeamExperienceChange = (newValue: number | number[]) => {
            if (typeof newValue === 'number') {
                setTeamExperienceValue(newValue);
            } else {
                setTeamExperienceValue(newValue[0]);
            }
        };

    
        const handleExperienceChange = (newValue: number | number[]) => {
            if (typeof newValue === 'number') {
                setExperienceValue(newValue);
            } else {
                setExperienceValue(newValue[0]);
            }
        };
    
        const handleAnswerSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
            const selectedOption = event.target.value;
            const updatedAnswers = [...selectedAnswers];
    
            if (updatedAnswers.includes(selectedOption)) {
                const index = updatedAnswers.indexOf(selectedOption);
                if (index !== -1) {
                    updatedAnswers.splice(index, 1);
                }
            } else {
                updatedAnswers.push(selectedOption);
            }
    
            setSelectedAnswers(updatedAnswers);
        };
        const handleDaySelection = (day: string) => {
            const updatedDays = [...selectedDays];
    
            if (updatedDays.includes(day)) {
                const index = updatedDays.indexOf(day);
                if (index !== -1) {
                    updatedDays.splice(index, 1);
                }
            } else {
                updatedDays.push(day);
            }
    
            setSelectedDays(updatedDays);
        };
    
        const handleTimeChange = (day: string, newValue: string) => {
            setAvailability((prevAvailability) => ({
                ...prevAvailability,
                [day]: newValue,
            }));
        };
    
        const handleSubmission = async () => {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
            const preferenceData = {
                //userId:user.id, 
                selectedSkills: selectedAnswers,
                availability: availability
            };
       
            try {
                await axios.post('/api/staticPreferences', preferenceData, { headers });
                alert("Preferences saved successfully!");
            } catch (error) {
                console.error('Error saving preferences:', error);
                alert("Error saving preferences.");
            }
        };
    
        const location = useLocation();
        let myUsr = { myEmail: 'alexandra.iotzova@emory.edu', firstName: 'Alexandra' , lastName: 'Iotzova'}
   
    
    return (
        <MainLayout user ={user} onLogout={onLogout}>
            <div className="ProfilePage" id="login">
                <div className="question">
                    <h2>Personal Information</h2>
                    <div className="Pane">
                        <div className="LPane"></div>
                        <div className="MPane">
   

            

                    <label style={{ color: 'white' }}>Select Skills:</label>
                    <form className="question-options" id="quiz-form">
                            <input type="checkbox" name="answer" id="Java" value="Java" onChange={() => {}} />
                            <label style={{ color: 'white' }} htmlFor="Mondays">Java</label><br />
                            <input type="checkbox" name="answer" id="JavaScript" value="JavaScript" onChange={() => {}} />
                            <label style={{ color: 'white' }} htmlFor="JavaScript">JavaScript</label><br />
                            <input type="checkbox" name="answer" id="C" value="C" onChange={() => {}} />
                            <label style={{ color: 'white' }} htmlFor="C">C</label><br />
                            <input type="checkbox" name="answer" id="R" value="R" onChange={() => {}} />
                            <label style={{ color: 'white' }} htmlFor="R">R</label><br />
                            <input type="checkbox" name="answer" id="Python" value="Python" onChange={() => {}} />
                            <label style={{ color: 'white' }} htmlFor="Python">Python</label><br />
                            <input type="checkbox" name="answer" id="SQL" value="SQL" onChange={() => {}} />
                            <label style={{ color: 'white' }} htmlFor="SQL">SQL</label><br />
                            <input type="checkbox" name="answer" id="AWS" value="AWS" onChange={() => {}} />
                            <label style={{ color: 'white' }} htmlFor="AWS">AWS</label><br />
                            <input type="checkbox" name="answer" id="Azure" value="Azure" onChange={() => {}} />
                            <label style={{ color: 'white' }} htmlFor="Azure">Azure</label><br />


                    </form>
                        </div>
                        <div className="RPane"></div>
                    </div>
                </div>
    
                <h2 className="AvailabilityHeader">Availability</h2>
                <div className="Pane">
                    <div className="LPane"></div>
                    <div className="MPane">
                        <form className="question-options" id="quiz-form">
                            <label style={{ color: 'white' }}></label><br />
                            <table>
      <thead>
        <tr>
          <th> <label style={{ color: 'white' }}></label></th>
          
        
        </tr>
      </thead>
      <tbody>

            <tr>
            <td>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
    <label style={{ color: 'white', marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        name="answer"
        id="Mondays"
        value="Mondays"
        onChange={() => handleDaySelection("Mondays")}
        style={{ marginRight: '5px' }}
      />
      Mondays
      <input
        type="text"
        value={availability["Mondays"] || ''}
        onChange={(e) => handleTimeChange("Mondays", e.target.value)}
        placeholder="Enter times"
      />
    </label>
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
    <label style={{ color: 'white', marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        name="answer"
        id="Tuesdays"
        value="Tuesdays"
        onChange={() => handleDaySelection("Tuesdays")}
        style={{ marginRight: '5px' }}
      />
      Tuesdays
      <input
        type="text"
        value={availability["Tuesdays"] || ''}
        onChange={(e) => handleTimeChange("Tuesdays", e.target.value)}
        placeholder="Enter times"
      />
    </label>
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
    <label style={{ color: 'white', marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        name="answer"
        id="Wednesdays"
        value="Wednesdays"
        onChange={() => handleDaySelection("Wednesdays")}
        style={{ marginRight: '5px' }}
      />
      Wednesdays
      <input
        type="text"
        value={availability["Wednesdays"] || ''}
        onChange={(e) => handleTimeChange("Wednesdays", e.target.value)}
        placeholder="Enter times"
      />
    </label>
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
    <label style={{ color: 'white', marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        name="answer"
        id="Thursdays"
        value="Thursdays"
        onChange={() => handleDaySelection("Thursdays")}
        style={{ marginRight: '5px' }}
      />
      Thursdays
      <input
        type="text"
        value={availability["Thursdays"] || ''}
        onChange={(e) => handleTimeChange("Thursdays", e.target.value)}
        placeholder="Enter times"
      />
    </label>
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
    <label style={{ color: 'white', marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        name="answer"
        id="Fridays"
        value="Fridays"
        onChange={() => handleDaySelection("Fridays")}
        style={{ marginRight: '5px' }}
      />
      Fridays
      <input
        type="text"
        value={availability["Fridays"] || ''}
        onChange={(e) => handleTimeChange("Fridays", e.target.value)}
        placeholder="Enter times"
      />
    </label>
  </div>
</td>



                            
                            
    



    
          </tr>
        
      </tbody>
    </table>
                            
                           

    
    
    
                           
                            <button type="submit" onClick = {handleSubmission}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
                            }
export default ProfilePage;