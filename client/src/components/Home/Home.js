import Navbar from "../Navbar/Navbar";

import classes from "./Home.module.css";

// test

export default function Home() {
  return (
    <div className={classes.mainContainer}>
      <Navbar />
      <h1 className={classes.heading}>
        The <span className={classes.ultimateWord}>Ultimate</span> Workout App
      </h1>
      <p className={classes.description}>
        Explore, plan, track and share all within your control
      </p>
      <button>Sign Up Now</button>
    </div>
  );
}
