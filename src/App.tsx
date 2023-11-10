import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";


import Login from "./components/Login";
import Register from "./components/Register";
import RQTest from "./components/RQTest";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Messages from "./components/Messages";
import ClassPage from "./components/ClassPage";
import MainLayout from "./components/MainLayout";

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
          <Route path="/RQTest" element={<RQTest />} />
          <Route path="/Register" element={<Register />} />

          <Route path="/Home" element={
              
                <MainLayout user={user} onLogout={handleLogout} >
                  <Home user = {user} onLogout={handleLogout} />
                </MainLayout> } />

          <Route path="/Projects" element={

              <MainLayout user={user} onLogout={handleLogout} >
                <Projects user = {user} onLogout = {handleLogout} />
              </MainLayout> }>

            <Route index element={<ClassPage />} />
            <Route path=":id" element={<ClassPage />} />
          </Route>
          <Route path="/Messages" element={
            
              <MainLayout user={user} onLogout={handleLogout}>
                <Messages user={user} onLogout={handleLogout} />
            </MainLayout> 
          } />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
