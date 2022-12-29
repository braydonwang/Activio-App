import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home/Home";
import Exercises from "./components/Exercises/Exercises";
import Planner from "./components/Planner/Planner";
import Tracker from "./components/Tracker/Tracker";
import Explore from "./components/Explore/Explore";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ExerciseDetails from "./components/ExerciseDetails/ExerciseDetails";
import { useSelector } from "react-redux";
import PlanDetails from "./components/PlanDetails/PlanDetails";

export default function App() {
  const { authData } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/exercises/search" element={<Exercises />} />
        <Route path="/exercise/:id" element={<ExerciseDetails />} />
        <Route
          path="/planner"
          element={!authData ? <Navigate to="/login" replace /> : <Planner />}
        />
        <Route
          path="/tracker"
          element={!authData ? <Navigate to="/login" replace /> : <Tracker />}
        />
        <Route
          path="/explore"
          element={!authData ? <Navigate to="/login" replace /> : <Explore />}
        />
        <Route path="/plan/:planId" element={<PlanDetails />} />
      </Routes>
    </Router>
  );
}
