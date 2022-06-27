import classes from "./Login.module.css";

export default function Login() {
  return (
    <div className={classes.login}>
      <span className={classes.loginTitle}>LOGIN</span>
      <form className={classes.loginForm}>
        <label>Username</label>
        <input
          type="text"
          className={classes.loginInput}
          placeholder="Enter your username..."
        />
        <label>Password</label>
        <input
          type="password"
          className={classes.loginInput}
          placeholder="Enter your password..."
        />
        <button className={classes.loginButton} type="submit">
          LOGIN
        </button>
      </form>
      <button className={classes.loginRegisterButton}>
        Register
      </button>
    </div>
  );
}
