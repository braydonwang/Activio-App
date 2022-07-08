import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveGridLayout from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import Navbar from "../Navbar/Navbar";
import IconButton from "@mui/material/IconButton";
import TimerIcon from "@mui/icons-material/Timer";
import CloseIcon from "@mui/icons-material/Close";
import exercises from "../Exercises/ExerciseData";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import classes from "./Planner.module.css";
import classnames from "classnames";

const getWindowDimensions = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
  };
};

export default function Planner() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const plan = [
    { id: "0001", time: "1", sets: "4", reps: "8" },
    { id: "0002", time: "5", sets: "3", reps: "10" },
    { id: "1512", time: "1", sets: "4", reps: "8" },
    { id: "1368", time: "10", sets: "5", reps: "9" },
    { id: "3293", time: "60", sets: "7", reps: "12" },
  ];

  const layout = [
    { i: "0001", x: 0, y: 0, w: 1, h: 1 },
    { i: "0002", x: 0, y: 1, w: 1, h: 1 },
    { i: "1512", x: 0, y: 2, w: 1, h: 1 },
    { i: "1368", x: 0, y: 3, w: 1, h: 1 },
    { i: "3293", x: 0, y: 4, w: 1, h: 1 },
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
        <h1
          className={classes.heading}
        >{`${user.user.name}'s Workout Plan`}</h1>

        <ResponsiveGridLayout
          margin={[0, 0]}
          layout={layout}
          cols={1}
          rowHeight={250}
          width={windowDimensions.width}
          isBounded
          useCSSTransforms
        >
          {plan.map((planObj, ind) => {
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
                  <p className={classes.time}>{planObj.time} SEC</p>
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
        </ResponsiveGridLayout>
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
