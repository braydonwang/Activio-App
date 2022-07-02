import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ButtonBase from "@mui/material/ButtonBase";
import logoImg from "../../images/logo.png";
import { login } from "../../features/auth/authSlice";

import classes from "./Login.module.css";

export default function Login() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ formData: loginData, navigate }));
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
          <span className={classes.loginTitle}>LOGIN</span>
          <form className={classes.loginForm} onSubmit={handleSubmit}>
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
            <button className={classes.loginButton} type="submit">
              Log In
            </button>
            <button
              className={classes.signUpButton}
              onClick={() => navigate("/signup")}
            >
              Don't have an account? Sign up
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
