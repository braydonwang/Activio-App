import Navbar from "../Navbar/Navbar";
import classes from "./Tracker.module.css";

export default function Tracker() {
  return (
    <>
      <Navbar />
      <h1 className={classes.heading}>Calorie Tracker</h1>
    </>
  );
}
