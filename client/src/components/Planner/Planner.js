import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ResponsiveGridLayout from "react-grid-layout";
import { CircularProgress } from "@mui/material";
import "/node_modules/react-grid-layout/css/styles.css";
import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import IconButton from "@mui/material/IconButton";
import TimerIcon from "@mui/icons-material/Timer";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import defaultImg from "../../images/white.png";
import classes from "./Planner.module.css";
import classnames from "classnames";
import {
  getPlanDraft,
  removePlanDraft,
  updatePlanDraft,
} from "../../features/planDrafts/planDraftSlice";
import axios from "axios";

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
  const [layout, setLayout] = useState([]);
  const [workoutTimer, setWorkoutTimer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [previousExercise, setPreviousExercise] = useState({
    gifUrl: "",
    name: "",
  });
  const [nextExercise, setNextExercise] = useState({
    gifUrl: "",
    name: "",
  });
  const [currentExercise, setCurrentExercise] = useState({
    id: "",
    gifUrl: "",
    name: "",
    time: "",
    sets: "",
    reps: "",
    ind: -1,
  });
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
  const [sharePop, setSharePop] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [desc, setDesc] = useState("");
  const [catDropDown, setCatDropDown] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (currentExercise.ind + 1 < layout.length) {
      const next = planExercises.find(
        (planObj) => planObj.name === layout[currentExercise.ind + 1].i
      );
      setNextExercise({ name: next.name, gifUrl: next.gifUrl });
    } else {
      setNextExercise({ name: "", gifUrl: "" });
    }
  }, [currentExercise]);

  const handleCatDropDown = () => {
    setCatDropDown(!catDropDown);
  };
  const handleChooseCat = (cat) => {
    setCatDropDown(false);
    setCategory(cat);
  };

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
        data: {
          username: user.user.username,
          exercise: {
            id,
          },
        },
        navigate,
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

  const handleSharePlan = async () => {
    const newPlan = {
      title,
      desc,
      username: user.user.username,
      categories: category,
      likeCount: 0,
      exercises: planExercises,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPlan.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/plans", newPlan);
      window.location.replace("/explore");
    } catch (err) {}
  };

  const handleStartWorkout = async () => {
    await setLayout((prevLayout) =>
      prevLayout.sort((a, b) => {
        return a.y - b.y;
      })
    );
    setCurrentExercise({
      ...planExercises.find((planObj) => planObj.name === layout[0].i),
      ind: 0,
    });
    if (layout.length > 1) {
      const next = planExercises.find(
        (planObj) => planObj.name === layout[1].i
      );
      setNextExercise({ name: next.name, gifUrl: next.gifUrl });
    }
    setWorkoutTimer(true);
  };

  const changeExerciseTime = async () => {
    if (currentExercise.ind === layout.length - 1) {
      setIsPlaying(false);
      return { shouldRepeat: false };
    }
    setPreviousExercise({
      gifUrl: currentExercise.gifUrl,
      name: currentExercise.name,
    });
    setCurrentExercise({
      ...planExercises.find(
        (planObj) => planObj.name === layout[currentExercise.ind + 1].i
      ),
      ind: currentExercise.ind + 1,
    });
    return {
      shouldRepeat: true,
      delay: 5000,
      newInitialRemainingTime: currentExercise.time,
    };
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
          opacity: popUp || sharePop || workoutTimer ? 0.1 : 1,
        }}
      >
        <Navbar />
        <div className={classes.mainContainer}>
          <h1
            className={classes.heading}
          >{`${user.user.name}'s Workout Plan`}</h1>
          <button
            className={classes.shareButton}
            onClick={() => setSharePop(true)}
          >
            <span className={classes.shareTitle}>Share</span>
            <i
              className={classnames(
                classes.shareIcon,
                "fa-solid",
                "fa-share-from-square"
              )}
            ></i>
          </button>

          <ResponsiveGridLayout
            margin={[0, 0]}
            cols={1}
            rowHeight={250}
            layout={layout}
            onLayoutChange={(layouts) => setLayout(layouts)}
            width={windowDimensions.width - 18}
            isBounded
          >
            {planExercises.map((planObj, ind) => {
              const { gifUrl, name, id } = planObj;
              return (
                <div className={classes.exerciseContainer} key={name}>
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
          <button
            className={classnames(classes.button, classes.startButton)}
            onClick={handleStartWorkout}
          >
            Start Workout
          </button>
        </div>
      </main>

      <Fade in={popUp}>
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
      </Fade>

      <Fade in={sharePop}>
        <div className={classes.sharePop}>
          {file && (
            <div className={classes.writeImgDiv}>
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className={classes.writeImg}
              />
              <label htmlFor="fileInput">
                <i
                  className={classnames(
                    classes.writeEditIcon,
                    "fa-solid fa-pen-to-square"
                  )}
                ></i>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          )}

          {!file && (
            <>
              <label htmlFor="fileInput">
                <i className={classnames(classes.writeIcon, "fas fa-plus")}></i>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </>
          )}

          <div className={classes.writeForm}>
            <div className={classes.writeFormGroup}>
              <div className={classes.writeFormSubGroup}>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  className={classes.writeInput}
                  autoFocus={true}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className={classes.dropDown}>
                  <button
                    className={classes.dropDownButton}
                    onClick={handleCatDropDown}
                    style={{
                      borderRadius: catDropDown
                        ? "10px 10px 0px 0px"
                        : "10px 10px 10px 10px",
                    }}
                  >
                    {category === "" ? "CATEGORIES" : category}{" "}
                    <i className="downArrow fa-solid fa-caret-down"></i>
                  </button>

                  {catDropDown && (
                    <div className={classes.dropDownOptionList}>
                      <div
                        className={classes.dropDownOptions}
                        onClick={() => handleChooseCat("all")}
                      >
                        All
                      </div>
                      <div
                        className={classes.dropDownOptions}
                        onClick={() => handleChooseCat("aerobic")}
                      >
                        Aerobic
                      </div>
                      <div
                        className={classes.dropDownOptions}
                        onClick={() => handleChooseCat("strength")}
                      >
                        Strength
                      </div>
                      <div
                        className={classes.dropDownOptions}
                        onClick={() => handleChooseCat("flexibility")}
                      >
                        Flexibility
                      </div>
                      <div
                        className={classes.dropDownOptions}
                        onClick={() => handleChooseCat("balance")}
                        style={{
                          borderRadius: "0px 0px 10px 10px",
                          borderBottom: "groove",
                        }}
                      >
                        Balance
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <textarea
                placeholder="Workout description..."
                value={desc}
                type="text"
                className={classes.writeText}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>

            <span className={classes.shareButtonList}>
              <button className={classes.shareSubmit} onClick={handleSharePlan}>
                Share
              </button>
              <button
                className={classes.shareCancel}
                onClick={() => setSharePop(false)}
              >
                Cancel
              </button>
            </span>
          </div>
        </div>
      </Fade>

      <Slide
        style={{ left: "5vw", top: "10vh" }}
        direction="up"
        in={workoutTimer}
        mountOnEnter
        unmountOnExit
      >
        <div className={classes.timerContainer}>
          <IconButton
            style={{
              position: "absolute",
              right: "15px",
              top: "15px",
              borderRadius: "50%",
              backgroundColor: "rgba(191, 90, 242, 0.4)",
            }}
            color="inherit"
            aria-label="remove"
            onClick={() => {
              setPreviousExercise({ name: "", gifUrl: "" });
              setNextExercise({ name: "", gifUrl: "" });
              setWorkoutTimer(false);
              setIsPlaying(false);
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          <h1 className={classes.timerTitle}>{currentExercise.name}</h1>
          <h2 className={classes.timerStats}>
            {currentExercise.sets} SETS{" "}
            <span
              style={{ fontSize: "20px", margin: "0 15px", opacity: "0.8" }}
            >
              of
            </span>{" "}
            {currentExercise.reps} REPS
          </h2>
          <div className={classes.prevExercise}>
            <h2 className={classes.nextTitle}>Previous Exercise</h2>
            <h3 className={classes.nextName}>
              {previousExercise.name !== "" ? previousExercise.name : ""}
            </h3>
            <img
              className={classes.timeNextImage}
              src={
                previousExercise.name !== ""
                  ? previousExercise.gifUrl
                  : defaultImg
              }
              alt={"Previous Exercise"}
              loading="lazy"
            />
          </div>
          <img
            className={classes.timerImage}
            src={currentExercise.gifUrl}
            alt={"Current Exercise"}
            loading="lazy"
          />
          <div style={{ position: "fixed" }}>
            <CountdownCircleTimer
              key={currentExercise.name}
              strokeWidth={20}
              size={windowDimensions.height / 2}
              isPlaying={isPlaying}
              duration={currentExercise.time}
              colors={["#8B008B", "#8A2BE2", "#360e95", "#116ab3"]}
              colorsTime={[60, 30, 15, 0]}
              onComplete={() => changeExerciseTime()}
            >
              {({ remainingTime, color }) => {
                setRemainingTime(remainingTime);
                return (
                  <div className={classes.timeWrapper}>
                    <div className={classes.textAround}>Remaining</div>
                    <div style={{ color }} className={classes.timeText}>
                      {remainingTime}
                    </div>
                    <div className={classes.textAround}>seconds</div>
                  </div>
                );
              }}
            </CountdownCircleTimer>
          </div>
          <div className={classes.nextExercise}>
            <h2 className={classes.nextTitle}>Next Exercise</h2>
            <h3 className={classes.nextName}>
              {nextExercise.name !== "" ? nextExercise.name : ""}
            </h3>
            <img
              className={classes.timeNextImage}
              src={nextExercise.name !== "" ? nextExercise.gifUrl : defaultImg}
              alt={"Next Exercise"}
              loading="lazy"
            />
          </div>
          <div className={classes.timerIcons}>
            <IconButton
              style={{ fontSize: "60px" }}
              color="inherit"
              aria-label="remove"
              onClick={() => {}}
            >
              <SkipPreviousIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              style={{ fontSize: "60px" }}
              color="inherit"
              aria-label="remove"
              onClick={() => {
                if (!isPlaying && currentExercise.ind === layout.length - 1) {
                  setPreviousExercise({ name: "", gifUrl: "" });
                  setCurrentExercise({
                    ...planExercises.find(
                      (planObj) => planObj.name === layout[0].i
                    ),
                    ind: 0,
                  });
                }
                setIsPlaying(!isPlaying);
              }}
            >
              {!isPlaying ? (
                <PlayCircleOutlineIcon fontSize="inherit" />
              ) : (
                <PauseCircleOutlineIcon fontSize="inherit" />
              )}
            </IconButton>
            <IconButton
              style={{ fontSize: "60px" }}
              color="inherit"
              aria-label="remove"
              onClick={() => {}}
            >
              <SkipNextIcon fontSize="inherit" />
            </IconButton>
          </div>
          <h2 className={classes.timeNumber}>
            {remainingTime < 10
              ? `00:0${remainingTime}`
              : `00:${remainingTime}`}
          </h2>
          <Box sx={{ width: "90%", position: "absolute", bottom: "3vh" }}>
            <LinearProgress
              variant="determinate"
              value={
                ((currentExercise.time - remainingTime) /
                  currentExercise.time) *
                100
              }
            />
          </Box>
        </div>
      </Slide>
    </>
  );
}
