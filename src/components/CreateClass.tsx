import React, { useState } from "react";
import axios from "axios";

import "./CreateClass.css";
import MainLayout from "./MainLayout";

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
    console.log("Class created called ${title}");
  };
  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div className="create-class-box">
        <div className="create-class-header">Create Class</div>
        <form className="create-class-form" onSubmit={handleSubmit}>
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
