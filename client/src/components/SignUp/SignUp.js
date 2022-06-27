import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonBase from "@mui/material/ButtonBase";
import logoImg from "../../images/logo.png";

import classes from "./SignUp.module.css";

export default function SignUp() {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
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
            <label>Name</label>
            <span>
              <input
                type="text"
                className={classes.loginInput}
                placeholder="First Name"
                value={signUpData.firstName}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, firstName: e.target.value })
                }
              />
              <input
                type="text"
                className={classes.loginInput}
                placeholder="Last Name"
                value={signUpData.lastName}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, lastName: e.target.value })
                }
              />
            </span>
            <label>Username</label>
            <input
              type="text"
              className={classes.loginInput}
              placeholder="Enter your username"
              value={signUpData.username}
              onChange={(e) =>
                setSignUpData({ ...signUpData, username: e.target.value })
              }
            />
            <label>Password</label>
            <input
              type="password"
              className={classes.loginInput}
              placeholder="Enter your password"
              value={signUpData.password}
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
            />
            <input
              type="password"
              className={classes.loginInput}
              placeholder="Confirm Password"
              value={signUpData.password2}
              onChange={(e) =>
                setSignUpData({ ...signUpData, password2: e.target.value })
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
