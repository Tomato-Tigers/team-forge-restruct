import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import RQTest from "./components/RQTest";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Messages from "./components/Messages";
import ClassPage from "./components/ClassPage";

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
          <Route path="/Home" element={<Home />} />
          <Route path="/Projects" element={<Projects classes={classes} />} />
          <Route path="/Messages" element={<Messages />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
