import { useState, useEffect } from "react";
import "./Projects.css";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import axios from "axios";

import MainLayout from "./MainLayout";
import ClassPage from "./ClassPage";
import AddClass from "./AddClass";
import ClassPagePeople from "./ClassPagePeople";

interface User {
  name: string;
  email: string;
  id: string;
}

interface Class {
  classID: string;
  title: string;
  subtitle: string;
  members: string[];
}

interface ProjectsProps {
  user: User;
  onLogout: () => void;
}

interface RouteParams {
  classID: string;
  [key: string]: string | undefined;
}

const Projects: React.FC<ProjectsProps> = ({ user, onLogout }) => {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .post("/api/getClasses", {
          email: user?.email,
        })
        .then((res) => {
          setClasses(res.data);
        })
        .catch((error) => {
          // alert(`Error fetching classes: ${error.message}`);
          console.error(`Error fetching classes: ${error.message}`);
        });
    }
  }, []);

  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div className="projects-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {Array.isArray(classes) &&
                  classes.map(({ classID, title, subtitle, members }) => (
                    <Link
                      to={`./${classID}`}
                      state={{ subtitle: subtitle }}
                      style={{ textDecoration: "none" }}
                      key={classID}
                    >
                      <div className="class-card">
                        <div className="title-subtitle">
                          <div className="title">{title}</div>
                          <div className="subtitle">{subtitle}</div>
                        </div>
                        <div className="members">
                          Members:{" "}
                          <span className="membersCount">{members.length}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                <Link
                  to="/Projects/AddClass"
                  style={{ textDecoration: "none" }}
                >
                  <button className="add-button">+</button>
                </Link>
                <Link
                  to="/Projects/test"
                  style={{ textDecoration: "none" }}
                >
                  <button className="add-button">test</button>
                </Link>
              </>
            }
          />
          <Route
            path="/Projects/AddClass/*"
            element={<AddClass user={user} onLogout={onLogout} />}
          />
          <Route
            path="/Projects/:classID/*"
            element={<ClassPage user={user} onLogout={onLogout} />}
          />
          <Route
            path="/Projects/test/*"
            element={<ClassPagePeople user={user} onLogout={onLogout} />}
          />
        </Routes>
        <Outlet />
      </div>
    </MainLayout>
  );
};

export default Projects;
