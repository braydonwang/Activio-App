import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ResponsiveGridLayout from "react-grid-layout";
import { CircularProgress } from "@mui/material";
import "/node_modules/react-grid-layout/css/styles.css";
import Navbar from "../Navbar/Navbar";
import IconButton from "@mui/material/IconButton";
import TimerIcon from "@mui/icons-material/Timer";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import classes from "./Planner.module.css";
import classnames from "classnames";
import {
  getPlanDraft,
  removePlanDraft,
  updatePlanDraft,
} from "../../features/planDrafts/planDraftSlice";

const getWindowDimensions = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
  };
};

export default function Planner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, planExercises } = useSelector((state) => state.planDrafts);
  const user = JSON.parse(localStorage.getItem("user"));
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [popUp, setPopUp] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({
    id: "",
    gifUrl: "",
    name: "",
  });
  const [formData, setFormData] = useState({
    time: "",
    sets: "",
    reps: "",
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    dispatch(getPlanDraft({ username: user.user.username }));
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRemove = (e, id) => {
    e.stopPropagation();
    dispatch(
      removePlanDraft({
        username: user.user.username,
        exercise: {
          id,
        },
      })
    );
  };

  const handleEdit = (e, time, sets, reps) => {
    e.stopPropagation();
    setPopUp(true);
    setFormData({ time, sets, reps });
  };

  const handleAddExercise = () => {
    dispatch(
      updatePlanDraft({
        data: {
          username: user.user.username,
          exercise: {
            ...formData,
            ...currentEdit,
          },
        },
        navigate,
      })
    );
    setPopUp(false);
  };

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress size="7em" />
      </div>
    );
  }

  return (
    <>
      <main
        style={{
          opacity: popUp ? 0.1 : 1,
        }}
      >
        <Navbar />
        <div className={classes.mainContainer}>
          <h1
            className={classes.heading}
          >{`${user.user.name}'s Workout Plan`}</h1>

          <ResponsiveGridLayout
            margin={[0, 0]}
            cols={1}
            rowHeight={250}
            width={windowDimensions.width - 18}
            isBounded
            useCSSTransforms
          >
            {planExercises.map((planObj, ind) => {
              const { gifUrl, name, id } = planObj;
              return (
                <div className={classes.exerciseContainer} key={ind}>
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
                    aria-label="edit"
                    onClick={(e) => {
                      handleEdit(e, planObj.time, planObj.sets, planObj.reps);
                      setCurrentEdit({ id, gifUrl, name });
                    }}
                  >
                    <MoreHorizIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    style={{
                      position: "absolute",
                      right: "30px",
                    }}
                    color="inherit"
                    aria-label="details"
                    onClick={() => navigate(`/exercise/${id}`)}
                  >
                    <ArrowForwardIosIcon fontSize="large" />
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
      </main>

      {popUp && (
        <div className={classes.planPopUp}>
          <span className={classes.planPopUpBigTitle}>EDIT EXERCISE</span>
          <div className={classes.planPopUpItem}>
            <span className={classes.planPopUpTitle}>TIME(S)</span>
            <input
              maxLength={3}
              className={classes.planPopUpInput}
              placeholder="0"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
            />
          </div>
          <div className={classes.planPopUpItem}>
            <span className={classes.planPopUpTitle}>SETS</span>
            <input
              maxLength={3}
              className={classes.planPopUpInput}
              placeholder="0"
              value={formData.sets}
              onChange={(e) =>
                setFormData({ ...formData, sets: e.target.value })
              }
            />
          </div>
          <div className={classes.planPopUpItem}>
            <span className={classes.planPopUpTitle}>REPS</span>
            <input
              className={classes.planPopUpInput}
              placeholder="0"
              maxLength={3}
              value={formData.reps}
              onChange={(e) =>
                setFormData({ ...formData, reps: e.target.value })
              }
            />
          </div>
          <span className={classes.popUpButton}>
            <button
              className={classes.popUpConfirmButton}
              onClick={() => handleAddExercise()}
            >
              <AddCircleIcon style={{ marginRight: "3px", fontSize: "18px" }} />{" "}
              Confirm
            </button>
            <button
              className={classes.popUpCancelButton}
              onClick={() => {
                setPopUp(false);
                setFormData({
                  time: "",
                  sets: "",
                  reps: "",
                });
              }}
            >
              <RemoveCircleIcon
                style={{ marginRight: "3px", fontSize: "18px" }}
              />
              Cancel
            </button>
          </span>
        </div>
      )}
    </>
  );
}
