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
      <h1 className={classes.backgroundText}>ACTIVIO</h1>
      <p className={classes.description}>
        Let us help you keep track and reach your full potential in life
      </p>
      <button className={classes.button}>Sign Up Now</button>
    </div>
  );
}
