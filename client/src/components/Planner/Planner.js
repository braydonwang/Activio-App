import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import IconButton from "@mui/material/IconButton";
import TimerIcon from "@mui/icons-material/Timer";
import CloseIcon from "@mui/icons-material/Close";
import exercises from "../Exercises/ExerciseData";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import classes from "./Planner.module.css";
import classnames from "classnames";
import { getExercise } from "../../features/exercises/exerciseSlice";
import axios from "axios";

export default function Planner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const plan = [
    { id: "62bd02d0465663d38d386353", time: "1", sets: "4", reps: "8" },
    { id: "0002", time: "5", sets: "3", reps: "10" },
    { id: "1512", time: "1", sets: "4", reps: "8" },
    { id: "1368", time: "10", sets: "5", reps: "9" },
    { id: "3293", time: "60", sets: "7", reps: "12" },
  ];

  const handleRemove = (e, id) => {
    e.stopPropagation();
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
  };

  return (
    <>
      <Navbar />
      <div className={classes.mainContainer}>
        <h1 className={classes.heading}>First Last's Workout Plan</h1>
        {plan.map(async (planObj, ind) => {
          const { gifUrl, name, id } = exercises.find(
            (exercise) => exercise.id === planObj.id
          );
          return (
            <div
              className={classes.exerciseContainer}
              onClick={() => navigate(`/exercise/${id}`)}
              key={ind}
            >
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
              <IconButton
                style={{ position: "absolute", right: "60px", top: "10px" }}
                color="inherit"
                aria-label="remove"
                onClick={(e) => handleRemove(e, id)}
              >
                <RemoveCircleIcon fontSize="large" />
              </IconButton>
              <IconButton
                style={{ position: "absolute", right: "15px", top: "10px" }}
                color="inherit"
                aria-label="remove"
                onClick={(e) => handleEdit(e, id)}
              >
                <MoreHorizIcon fontSize="large" />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div className={classes.buttonContainer}>
        <button
          className={classnames(classes.button, classes.addButton)}
          onClick={() => navigate("/exercises")}
        >
          Add More Exercises
        </button>
        <button className={classnames(classes.button, classes.startButton)}>
          Start Workout
        </button>
      </div>
    </>
  );
}
