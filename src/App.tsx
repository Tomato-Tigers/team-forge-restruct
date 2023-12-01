import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import ClassPageProjects from "./components/ClassPageProjects";
import ClassPagePeople from "./components/ClassPagePeople";

interface User{
  name: string;
  email: string;
}


const App: React.FC = () => {
  const [user, setUser] = useState <User>({name: "", email: ""});
  

  const handleLogin = (user: User) => {
    setUser(user);
  };


    
  const handleLogout = () => {
    setUser({name: "", email: ""});
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login onLogin = {handleLogin}/>} />
          <Route path="/Register" element={<Register />} />
          <Route 
            path="/Home" 
            element={<Home user = {user} onLogout={handleLogout} />}
          />
          <Route 
          path="/ProfilePage" 
          element={<ProfilePage user={user} onLogout={handleLogout} />}
          />
          <Route path="/Projects">
          
            <Route
            path=""
            element={<Projects user = {user} onLogout = {handleLogout} />} />

              <Route 
                path="/Projects/:classID" 
                element={<ClassPage user = {user} onLogout={handleLogout}/>} 
              />
              <Route 
                path="/Projects/:classID/projects" 
                element={<ClassPageProjects user = {user} onLogout={handleLogout}/>}
              />
              <Route 
                path="/Projects/:classID/people" 
                element={<ClassPagePeople user = {user} onLogout={handleLogout} />}
              />
              <Route
                path="/Projects/AddClass"
                element={<AddClass user={user} onLogout={handleLogout} />}
              />
              <Route
                path="/Projects/AddClass/JoinClass"
                element={<JoinClass user={user} onLogout={handleLogout} />}
              />
              <Route
                path="/Projects/AddClass/CreateClass"
                element={<CreateClass user={user} onLogout={handleLogout} />}
              />
          </Route>
          <Route 
          path="/Messages" 
          element={
                <Messages user={user} onLogout={handleLogout} />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
