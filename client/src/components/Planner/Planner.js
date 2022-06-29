import Navbar from "../Navbar/Navbar";
import IconButton from "@mui/material/IconButton";
import TimerIcon from "@mui/icons-material/Timer";
import CloseIcon from "@mui/icons-material/Close";
import exercises from "../Exercises/ExerciseData";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import classes from "./Planner.module.css";
import classnames from "classnames";

export default function Planner() {
  const plan = [
    { id: "0001", time: "1", sets: "4", reps: "8" },
    { id: "0002", time: "5", sets: "3", reps: "10" },
    { id: "1512", time: "1", sets: "4", reps: "8" },
    { id: "1368", time: "10", sets: "5", reps: "9" },
    { id: "3293", time: "60", sets: "7", reps: "12" },
  ];

  return (
    <>
      <Navbar />
      <div className={classes.mainContainer}>
        <h1 className={classes.heading}>First Last's Workout Plan</h1>
        {plan.map((planObj) => {
          const { gifUrl, name } = exercises.find(
            (exercise) => exercise.id === planObj.id
          );
          return (
            <div className={classes.exerciseContainer}>
              <img
                className={classes.image}
                src={gifUrl}
                alt={name}
                loading="lazy"
              />
              <div className={classes.timeContainer}>
                <TimerIcon sx={{ fontSize: 50 }} />
                <p className={classes.time}>{planObj.time} MIN</p>
              </div>
              <div className={classes.setReps}>
                <p className={classes.sets}>{planObj.sets} SETS</p>
                <CloseIcon sx={{ fontSize: 30 }} />
                <p className={classes.sets}>{planObj.reps} REPS</p>
              </div>
              <h3 className={classes.name}>{name}</h3>
              <IconButton color="inherit" aria-label="remove">
                <RemoveCircleIcon fontSize="large" />
              </IconButton>
              <IconButton color="inherit" aria-label="remove">
                <MoreHorizIcon fontSize="large" />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div className={classes.buttonContainer}>
        <button className={classnames(classes.button, classes.addButton)}>
          Add More Exercises
        </button>
        <button className={classnames(classes.button, classes.startButton)}>
          Start Workout
        </button>
      </div>
    </>
  );
}
