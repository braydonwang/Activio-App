import { Link, useNavigate } from "react-router-dom";
import ButtonBase from "@mui/material/ButtonBase";
import logoImg from "../../images/logo.png";

import classes from "./Navbar.module.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className={classes.navContainer}>
      <ButtonBase
        style={{ position: "absolute", left: "7%" }}
        onClick={() => navigate("/")}
      >
        <img className={classes.logo} src={logoImg} alt="Logo" />
      </ButtonBase>
      <ul className={classes.optionContainer}>
        <li>
          <Link to="/exercises">
            <span className={classes.option}>Exercises</span>
          </Link>
        </li>
        <li>
          <Link to="/planner">
            <span className={classes.option}>Planner</span>
          </Link>
        </li>
        <li>
          <Link to="/tracker">
            <span className={classes.option}>Tracker</span>
          </Link>
        </li>
        <li>
          <Link to="/explore">
            <span className={classes.option}>Explore</span>
          </Link>
        </li>
      </ul>
      <button className={classes.button} onClick={() => navigate("/login")}>
        Log In
      </button>
    </div>
  );
}
