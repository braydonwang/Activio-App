import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar, ButtonBase } from "@mui/material";
import logoImg from "../../images/logo.png";
import { logout } from "../../features/auth/authSlice";

import classes from "./Navbar.module.css";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
      {!user ? (
        <button className={classes.login} onClick={() => navigate("/login")}>
          Log In
        </button>
      ) : (
        <div className={classes.rightNav}>
          <Avatar style={{ backgroundColor: "purple" }}>
            {user.user.name.charAt(0)}
          </Avatar>
          <button className={classes.logout} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
