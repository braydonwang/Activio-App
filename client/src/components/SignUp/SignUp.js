import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonBase from "@mui/material/ButtonBase";
import logoImg from "../../images/logo.png";

import classes from "./SignUp.module.css";

export default function SignUp() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    password2: "",
  });
  const navigate = useNavigate();

  return (
    <>
      <ButtonBase
        style={{ position: "absolute", left: "7%" }}
        onClick={() => navigate("/")}
      >
        <img className={classes.logo} src={logoImg} alt="Logo" />
      </ButtonBase>
      <main>
        <div className={classes.login}>
          <span className={classes.loginTitle}>SIGN UP</span>
          <form className={classes.loginForm} onSubmit={() => {}}>
            <label>Username</label>
            <input
              type="text"
              className={classes.loginInput}
              placeholder="Enter your username"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />
            <label>Password</label>
            <input
              type="password"
              className={classes.loginInput}
              placeholder="Enter your password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <input
              type="password"
              className={classes.loginInput}
              placeholder="Confirm Password"
              value={loginData.password2}
              onChange={(e) =>
                setLoginData({ ...loginData, password2: e.target.value })
              }
            />
            <button className={classes.loginButton} type="submit">
              Sign Up
            </button>
            <button
              className={classes.signUpButton}
              onClick={() => navigate("/login")}
            >
              Already have an account? Log In
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
