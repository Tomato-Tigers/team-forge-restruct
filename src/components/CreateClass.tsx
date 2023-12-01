import React, { useState } from "react";
import axios from "axios";

import "./CreateClass.css";
import MainLayout from "./MainLayout";
import AddClassNavBar from "./AddClassNavBar";

interface User {
  name: string;
  email: string;
}

interface CreateClassProps {
  user: User;
  onLogout: () => void;
}

const CreateClass: React.FC<CreateClassProps> = ({ user, onLogout }) => {
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [capacity, setCapacity] = useState<number>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitle(event.target.value);
  };
  const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCapacity(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(title === "" || subtitle === "" || capacity === undefined){
      alert("Please fill out all fields");
      return;
    } else if (!validateInput(title) ){
      setErrorMessage("Please enter the title and subtitle as it appears in the Emory Course Atlas | Ex. CS 325 (Artificial Intelligence)"); 
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    } else {
      axios
        .post("http://localhost:3001/addClass", {
          title: title,
          subtitle: subtitle,
          email: user?.email,
        })
        .then((res) => {
          alert(res.data.message); //replace with success message
        })
        .catch((error) => {
          if (error.response && error.response.status === 500) {
            const message = error.response.data.message;
            setErrorMessage(message);
            setTimeout(() => {
              setErrorMessage("");
            }, 3000);
          } else {
            setErrorMessage(error.response.data.message);
            setTimeout(() => {
              setErrorMessage("");
            }, 3000);
          }
        });

    }
  };

  const validateInput = (input: string): boolean => {
    // Regular expression to match the pattern 'CS <3 numbers>' or 'MATH <3 numbers>'
    const pattern = /^(CS|MATH|) \d{3}$/;
    return pattern.test(input);
};


  return (
    <MainLayout user={user} onLogout={onLogout}>
      <AddClassNavBar user={user} onLogout={onLogout} />
      <div className="create-class-box">
        <div className="create-class-header">Create Class</div>
        <form className="create-class-form" onSubmit={handleSubmit}>
          {errorMessage && <div className="create-class-error-message">{errorMessage}</div>}
          <div className="subtitle">
            Enter the information for your new class
          </div>
          <div className="form-group">
            <input
              type="title"
              placeholder="Class title"
              value={title}
              onChange={handleTitleChange}
            />
            <input
              type="subTitle"
              placeholder="Class subtitle"
              value={subtitle}
              onChange={handleSubtitleChange}
            />
            <input
              type="capacity"
              placeholder="Class capacity"
              value={capacity}
              onChange={handleCapacityChange}
            />
          </div>
          <footer>
            <button className="create-class-button" type="submit">
              Create
            </button>
          </footer>
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateClass;
