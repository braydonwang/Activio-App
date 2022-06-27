import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Exercises from "./components/Exercises/Exercises";
import Planner from "./components/Planner/Planner";
import Tracker from "./components/Tracker/Tracker";
import Explore from "./components/Explore/Explore";
import Login from "./components/Login/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </Router>
  );
}
