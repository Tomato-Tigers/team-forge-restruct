import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

import { useState , useEffect} from "react";

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
import ClassPageProjects from "./components/ClassPageProjects";
import ClassPagePeople from "./components/ClassPagePeople";
import PrivateRoute from "./PrivateRoutes/index";



import { getEmailFromJWT, getUsernameFromJWT } from './jwtUtils';

 


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


  
  useEffect(() => {
    const decodedUsername = getUsernameFromJWT();
    const decodedEmail = getEmailFromJWT();
    if (decodedUsername  ) {
      setUser({
        name: decodedUsername,
        email: decodedEmail
        // Set other properties as needed
      });
    }
  }, []);
 

  const handleLogin = (user: User) => {
    setUser(user);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('jwt');
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
            element={
            <PrivateRoute>
            <Home user={user} onLogout={handleLogout} />
            </PrivateRoute>
            }
          />


          <Route 
          path="/ProfilePage" 
          element={
              <PrivateRoute>
              <ProfilePage user={user} onLogout={handleLogout} />
              </PrivateRoute> 
                }
          />
         
          <Route path="/Projects">
            <Route
              path=""
              element={
              <PrivateRoute>
                <Projects user={user} onLogout={handleLogout} />
              </PrivateRoute>
              }
            />
            <Route
              path="/Projects/:classID"
              element={
                <PrivateRoute>
              <ClassPage user={user} onLogout={handleLogout} />
              </PrivateRoute>
              }
            />
            <Route 
                path="/Projects/:classID/projects" 
                element={
                  <PrivateRoute>
                <ClassPageProjects user = {user} onLogout={handleLogout}/>
                </PrivateRoute>
                }
              />
              <Route 
                path="/Projects/:classID/people" 
                element={
                  <PrivateRoute>
                <ClassPagePeople user = {user} onLogout={handleLogout} />
                </PrivateRoute>
                }
              />
            <Route
              path="/Projects/AddClass"
              element={
                <PrivateRoute>
              <AddClass user={user} onLogout={handleLogout} />
              </PrivateRoute>
              }
            >
              <Route
                path="/Projects/AddClass/JoinClass"
                element={
                  <PrivateRoute>
                <JoinClass user={user} onLogout={handleLogout} />
                </PrivateRoute>
                }
              />
              <Route
                path="/Projects/AddClass/CreateClass"
                element={
                  <PrivateRoute>
                <CreateClass user={user} onLogout={handleLogout} />
                </PrivateRoute>
                }
              />
               
            </Route>
          </Route>
          <Route
            path="/Messages"
            element={
              <PrivateRoute>
            <Messages user={user} onLogout={handleLogout}  />
            </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;