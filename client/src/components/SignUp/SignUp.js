import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonBase from "@mui/material/ButtonBase";
import logoImg from "../../images/logo.png";
import { signup } from "../../features/auth/authSlice";
import { numberOfUsers } from "../../features/users/userSlice";
import { createPlanDraft } from "../../features/planDrafts/planDraftSlice";

import classes from "./SignUp.module.css";

export default function SignUp() {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(numberOfUsers());
    dispatch(signup({ formData: signUpData, navigate }));
    dispatch(createPlanDraft({ username: signUpData.username }));
  };

  return (
    <>
      <ButtonBase
        style={{ position: "absolute", left: "7%" }}
        onClick={() => navigate("/")}
      >
        <img className={classes.logo} src={logoImg} alt="Logo" />
      </ButtonBase>
      <main className={classes.main}>
        <div className={classes.login}>
          <span className={classes.loginTitle}>SIGN UP</span>
          <form className={classes.loginForm} onSubmit={handleSubmit}>
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
            <label>Email</label>
            <input
              type="email"
              className={classes.loginInput}
              placeholder="Enter your email"
              value={signUpData.email}
              onChange={(e) =>
                setSignUpData({ ...signUpData, email: e.target.value })
              }
            />
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
