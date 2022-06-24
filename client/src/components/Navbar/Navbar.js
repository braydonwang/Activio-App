import { Link } from "react-router-dom";

import classes from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={classes.navContainer}>
      <h3>Activio</h3>
      <ul>
        <li>
          <Link to="/explore">Explore</Link>
        </li>
        <li>
          <Link to="/planner">Planner</Link>
        </li>
        <li>
          <Link to="/tracker">Tracker</Link>
        </li>
      </ul>
    </div>
  );
}
