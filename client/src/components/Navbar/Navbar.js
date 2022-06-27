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
          <Link className={classes.option} to="/exercises">
            Exercises
          </Link>
        </li>
        <li>
          <Link className={classes.option} to="/planner">
            Planner
          </Link>
        </li>
        <li>
          <Link className={classes.option} to="/tracker">
            Tracker
          </Link>
        </li>
        <li>
          <Link className={classes.option} to="/explore">
            Explore
          </Link>
        </li>
      </ul>
      <button className={classes.button} onClick={() => navigate("/login")}>
        Log In
      </button>
    </div>
  );
}
