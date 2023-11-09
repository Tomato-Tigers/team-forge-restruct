import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import RQTest from "./RQTest";
import Home from "./Home";
import Projects from "./Projects";
import Messages from "./Messages";
import ClassPage from "./ClassPage";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage"

const classes = [
  {
    id: "1",
    title: "CS 370",
    subtitle: "Computer Science Practicum",
    members: 17,
  },
  {
    id: "2",
    title: "CS 329",
    subtitle: "Computational Linguistics",
    members: 5,
  },
];

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/RQTest" element={<RQTest />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/Projects" element={<Projects classes={classes} />}>
            <Route index element={<ClassPage />} />
            <Route path=":id" element={<ClassPage />} />
          </Route>
          <Route path="/Messages" element={<Messages />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
