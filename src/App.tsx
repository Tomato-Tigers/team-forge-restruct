import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

import { useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import RQTest from "./components/RQTest";
import Home from "./components/Home";
import Projects from "./components/Projects";
import ClassPage from "./components/ClassPage";
import AddClass from "./components/AddClass";
import JoinClass from "./components/JoinClass";
import CreateClass from "./components/CreateClass";
import Messages from "./components/Messages";
import ProfilePage from "./components/ProfilePage"

interface User {
  name: string;
  email: string;
}

/* { interface Project {
  id: string;
  creator: string;
  title: string;
  description: string;
  members: string[];
}

interface Class {
  id: string;
  title: string;
  subtitle: string;
  members: string[];
  projects: Project[];
}

const project1: Project = {
  id: "1",
  creator: "Henry Mitchell",
  title: "TeamForge",
  description: "Project grouping tool",
  members: ["Henry Mitchell", "Henry Gao"],
};

const project2: Project = {
  id: "2",
  creator: "Jeff Epstein",
  title: "JQuiz",
  description: "Grading tool",
  members: ["Jeff Epstein"],
};

const project3: Project = {
  id: "3",
  creator: "Henry Mitchell",
  title: "ChatGPT",
  description: "AI Chatbox",
  members: ["Henry Mitchell"],
};

const classes = [
  {
    id: "1",
    title: "CS 370",
    subtitle: "Computer Science Practicum",
    members: [
      "Henry Mitchell",
      "Henry Gao",
      "Xavier Pierce",
      "Alex Iotzova",
      "Nick Ueki",
      "Katya Kurchin",
    ],
    projects: [project1, project2],
  },
  {
    id: "2",
    title: "CS 329",
    subtitle: "Computational Linguistics",
    members: ["Henry Mitchell"],
    projects: [project3],
  },
];

*/

const App: React.FC = () => {
  const { classID } = useParams();

  //  const classObj = classes.find((cls) => cls.id === id);

  const [user, setUser] = useState<User>({ name: "", email: "" });

  const handleLogin = (user: User) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser({ name: "", email: "" });
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/Home"
            element={<Home user={user} onLogout={handleLogout} />}
          />
          <Route path="/ProfilePage"  element={<ProfilePage/>}/>
          <Route path="/Projects/*">
            <Route
              path=""
              element={<Projects user={user} onLogout={handleLogout} />}
            />
            <Route
              path="/Projects/*/:classID"
              element={<ClassPage user={user} onLogout={handleLogout} />}
            />
            <Route
              path="AddClass"
              element={<AddClass user={user} onLogout={handleLogout} />}
            >
              <Route
                path="JoinClass"
                element={<JoinClass user={user} onLogout={handleLogout} />}
              />
              <Route
                path="CreateClass"
                element={<CreateClass user={user} onLogout={handleLogout} />}
              />
            </Route>
          </Route>
          <Route
            path="/Messages"
            element={<Messages user={user} onLogout={handleLogout}  />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
