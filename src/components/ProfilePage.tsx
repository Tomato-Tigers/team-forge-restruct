import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from 'rc-slider';
import './Prof.css';
import MainLayout from "./MainLayout";



function ProfilePage() {
    const [interestValue, setInterestValue] = useState(1);
    const [availabilityValue, setAvailabilityValue] = useState(1);
    const [teamExperienceValue, setTeamExperienceValue] = useState(1);
    const [ExperienceValue, setExperienceValue] = useState(1);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

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

    const handleSubmission = () => {
        alert("Submitted!");
    };

    const location = useLocation();
    let myUsr = { myEmail: 'alexandra.iotzova@emory.edu', firstName: 'Alexandra' , lastName: 'Iotzova'}
    return (
        <MainLayout usr ={myUsr}>
        <div className="ProfilePage" id="login">
            <h3>Personal Information</h3>
            <div className="slider-container">
                <label style={{ color: 'white' }}>Interest:</label>
                <Slider
                    className="ProfileSlider"
                    min={0}
                    max={100}
                    step={1}
                    value={interestValue}
                    onChange={handleInterestChange}
                />
                <div className="SelectedValue" style={{ color: 'white' }}>Selected value: {interestValue}</div>
            </div>
            <div style={{ margin: '20px' }}></div>
            <div className="slider-container">
                <label style={{ color: 'white' }}>Availability Lineup:</label>
                <Slider
                    className="ProfileSlider"
                    min={0}
                    max={100}
                    step={1}
                    value={availabilityValue}
                    onChange={handleAvailabilityChange}
                />
                <div className="SelectedValue" style={{ color: 'white' }}>Selected value: {availabilityValue}</div>
            </div>
            <div style={{ margin: '20px' }}></div>
            <div className="slider-container">
                <label style={{ color: 'white' }}>Team Experience:</label>
                <Slider
                    className="ProfileSlider"
                    min={0}
                    max={100}
                    step={1}
                    value={teamExperienceValue}
                    onChange={handleTeamExperienceChange}
                />
                <div className="SelectedValue" style={{ color: 'white' }}>Selected value: {teamExperienceValue}</div>
            </div>
            <div style={{ margin: '20px' }}></div>
            <div className="slider-container">
                <label style={{ color: 'white' }}>Experience:</label>
                <Slider
                    className="ProfileSlider"
                    min={0}
                    max={100}
                    step={1}
                    value={ExperienceValue}
                    onChange={handleExperienceChange}
                />
                <div className="SelectedValue" style={{ color: 'white' }}>Selected value: {ExperienceValue}</div>
            </div>
            <div className="question">
                <h2>Availability</h2>
                <div className="Pane">
                    <div className="LPane">
                    </div>
                    <div className="MPane">
                        <form className="question-options" id="quiz-form">
                            <input type="checkbox" name="answer" id="Mondays" value="Mondays" onChange={handleAnswerSelection} />
                            <label style={{ color: 'white' }} htmlFor="Mondays">Mondays</label><br />
                            <input type="checkbox" name="answer" id="Tuesdays" value="Tuesdays" onChange={handleAnswerSelection} />
                            <label style={{ color: 'white' }} htmlFor="Tuesdays">Tuesdays</label><br />
                            <input type="checkbox" name="answer" id="Wednesdays" value="Wednesdays" onChange={handleAnswerSelection} />
                            <label style={{ color: 'white' }} htmlFor="Wednesdays">Wednesdays</label><br />
                            <input type="checkbox" name="answer" id="Thursdays" value="Thursdays" onChange={handleAnswerSelection} />
                            <label style={{ color: 'white' }} htmlFor="Thursdays">Thursdays</label><br />
                            <input type="checkbox" name="answer" id="Fridays" value="Fridays" onChange={handleAnswerSelection} />
                            <label style={{ color: 'white' }} htmlFor="Fridays">Fridays</label><br />
                        </form>
                    </div>
                    <div className="RPane">
                    </div>
                </div>
                <button onClick={handleSubmission}>Submit</button>
            </div>
        </div>
        </MainLayout>
    );
}

export default ProfilePage;









