import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ResponsiveGridLayout from "react-grid-layout";
import { CircularProgress } from "@mui/material";
import "/node_modules/react-grid-layout/css/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
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
import FileBase from "react-file-base64";
import classes from "./Planner.module.css";
import classnames from "classnames";
import {
  getPlanDraft,
  removePlanDraft,
  updateLayout,
  updatePlanDraft,
} from "../../features/planDrafts/planDraftSlice";
import { createPlan } from "../../features/plans/planSlice";

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
  const { isLoading, planExercises, savedLayout } = useSelector(
    (state) => state.planDrafts
  );
  const isLoadingPlans = useSelector((state) => state.plans.isLoading);
  const user = JSON.parse(localStorage.getItem("user"));
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [popUp, setPopUp] = useState(false);
  const [layout, setLayout] = useState(
    savedLayout.length > 0 ? savedLayout : []
  );
  const [workoutTimer, setWorkoutTimer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [previousExercise, setPreviousExercise] = useState({
    gifUrl: "",
    name: "",
    time: 0,
  });
  const [nextExercise, setNextExercise] = useState({
    gifUrl: "",
    name: "",
    time: 0,
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
  const [hasExercise, setHasExercise] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    if (currentExercise.ind + 1 < layout.length) {
      const next = planExercises.find(
        (planObj) => planObj.name === layout[currentExercise.ind + 1].i
      );
      if (next) {
        setNextExercise({
          name: next.name,
          gifUrl: next.gifUrl,
          time: next.time,
        });
      }
    } else {
      setNextExercise({ name: "", gifUrl: "", time: 0 });
    }
  }, [currentExercise]);

  useEffect(() => {
    setTotalTime((prevTime) => prevTime - 1);
  }, [remainingTime]);

  useEffect(() => {
    const deepCopy = JSON.parse(JSON.stringify(savedLayout));
    setLayout(deepCopy);
  }, [savedLayout]);

  useEffect(() => {
    if (planExercises.length === 0) {
      setHasExercise(false);
    } else {
      setHasExercise(true);
    }
  }, [planExercises]);

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

  const handleRemove = (e, id, name) => {
    e.stopPropagation();
    dispatch(
      removePlanDraft({
        data: {
          username: user.user.username,
          exercise: {
            id,
            name,
          },
          layout,
        },
        navigate,
      })
    );
    setIsSaved(true);
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
      likedUsers: [],
      exercises: planExercises,
      photo: file,
      savedLayout: layout,
    };
    dispatch(createPlan({ navigate, data: newPlan }));
  };

  const handleStartWorkout = async () => {
    if (planExercises.length > 0) {
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
        setNextExercise({
          name: next.name,
          gifUrl: next.gifUrl,
          time: next.time,
        });
      }
      let time = 0;
      for (let i = 0; i < planExercises.length; i++) {
        time = time + Number(planExercises[i].time);
      }
      setTotalTime(time + 1);
      setWorkoutTimer(true);
    }
  };

  const changeExerciseTime = async () => {
    if (currentExercise.ind === layout.length - 1) {
      setIsPlaying(false);
      return { shouldRepeat: false };
    }
    setPreviousExercise({
      gifUrl: currentExercise.gifUrl,
      name: currentExercise.name,
      time: currentExercise.time,
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

  const handleTotalTime = () => {
    const min = Math.floor(totalTime / 60);
    const sec = totalTime % 60;
    let displayMin;
    let displaySec;
    if (min === 0) {
      displayMin = "00";
    } else if (min < 10) {
      displayMin = "0" + min;
    } else {
      displayMin = "" + min;
    }
    if (sec < 10) {
      displaySec = "0" + sec;
    } else {
      displaySec = "" + sec;
    }

    return displayMin + ":" + displaySec;
  };

  const handleSkipPrevious = () => {
    if (currentExercise.ind > 0) {
      setRemainingTime(-1);
      let time = currentExercise.time - remainingTime;
      setTotalTime(totalTime + time + Number(previousExercise.time) + 2);
      if (currentExercise.ind > 1) {
        const prev = planExercises.find(
          (planObj) => planObj.name === layout[currentExercise.ind - 2].i
        );
        setPreviousExercise({
          name: prev.name,
          gifUrl: prev.gifUrl,
          time: prev.time,
        });
      } else {
        setPreviousExercise({ name: "", gifUrl: "" });
      }
      setCurrentExercise({
        ...planExercises.find(
          (planObj) => planObj.name === layout[currentExercise.ind - 1].i
        ),
        ind: currentExercise.ind - 1,
      });
    }
  };

  const handleSkipNext = () => {
    if (currentExercise.ind < layout.length - 1) {
      setRemainingTime(-1);
      setTotalTime(totalTime - remainingTime + 2);
      setPreviousExercise({
        name: currentExercise.name,
        gifUrl: currentExercise.gifUrl,
        time: currentExercise.time,
      });
      setCurrentExercise({
        ...planExercises.find(
          (planObj) => planObj.name === layout[currentExercise.ind + 1].i
        ),
        ind: currentExercise.ind + 1,
      });
    }
  };

  const handleSave = () => {
    dispatch(updateLayout({ username: user.user.username, layout }));
    setIsSaved(true);
  };

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress size="7em" style={{ color: "#bf5af2" }} />
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
          <div className={classes.topBar}>
            <h1 className={classes.heading}>Workout Planner</h1>
            <div className={classes.topButton}>
              <span className={classes.saveButton}>
                <Button
                  onClick={handleSave}
                  style={{
                    color: isSaved ? "rgb(90, 90, 90)" : "inherit",
                    fontSize: "inherit",
                    margin: "0",
                    padding: "0 23px",
                    transition: "0.1s",
                    cursor: isSaved ? "none" : "pointer",
                    backgroundColor: isSaved ? "grey" : "inherit",
                  }}
                  disabled={isSaved}
                >
                  <span style={{ margin: "5px 7px 0 10px" }}>Save</span>
                  <SaveIcon />
                </Button>
              </span>
              <span className={classes.shareButton}>
                <Button
                  onClick={() => setSharePop(true)}
                  style={{
                    color: !hasExercise ? "rgb(90, 90, 90)" : "inherit",
                    fontSize: "inherit",
                    margin: "0",
                    padding: "0 10px",
                    transition: "0.1s",
                    cursor: !hasExercise ? "none" : "pointer",
                    backgroundColor: !hasExercise ? "grey" : "inherit",
                  }}
                  disabled={!hasExercise}
                >
                  <span style={{ margin: "5px 7px 0 10px" }}>Share</span>
                  <i
                    className={classnames(
                      classes.shareIcon,
                      "fa-solid",
                      "fa-share-from-square"
                    )}
                  ></i>
                </Button>
              </span>
            </div>
          </div>

          {planExercises.length === 0 && (
            <div className={classes.noExerciseContainer}>
              <h1 className={classes.noExercises}>
                There are no exercises in your plan
              </h1>
              <h2 className={classes.addExercises}>
                Add some through the{" "}
                <span
                  style={{
                    fontSize: "1.6vw",
                    fontWeight: "800",
                    color: "purple",
                  }}
                >
                  Exercises
                </span>{" "}
                tab!
              </h2>
              <FontAwesomeIcon icon={faDumbbell} color="white" size="10x" />
            </div>
          )}

          <ResponsiveGridLayout
            margin={[0, 0]}
            cols={1}
            rowHeight={250}
            layout={layout}
            onLayoutChange={(layouts) => {
              const temp = JSON.parse(JSON.stringify(savedLayout));
              if (
                JSON.stringify(temp.sort((a, b) => a.y - b.y)) !==
                  JSON.stringify(layouts.sort((a, b) => a.y - b.y)) &&
                planExercises.length !== 0 &&
                layouts.length === layout.length
              ) {
                setIsSaved(false);
              } else {
                setIsSaved(true);
              }
              setLayout(layouts);
            }}
            width={windowDimensions.width - 18}
            isBounded
          >
            {planExercises.map((planObj) => {
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
                    onClick={(e) => handleRemove(e, id, name)}
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
            <span className={classes.planPopUpTitle}>TIME (SEC)</span>
            <input
              type="number"
              className={classes.planPopUpInput}
              placeholder="0"
              value={formData.time}
              onChange={(e) => {
                if (e.target.value < 999) {
                  setFormData({ ...formData, time: e.target.value });
                }
              }}
            />
          </div>
          <div className={classes.planPopUpItem}>
            <span className={classes.planPopUpTitle}>SETS</span>
            <input
              type="number"
              className={classes.planPopUpInput}
              placeholder="0"
              value={formData.sets}
              onChange={(e) => {
                if (e.target.value < 999) {
                  setFormData({ ...formData, sets: e.target.value });
                }
              }}
            />
          </div>
          <div className={classes.planPopUpItem}>
            <span className={classes.planPopUpTitle}>REPS</span>
            <input
              type="number"
              className={classes.planPopUpInput}
              placeholder="0"
              value={formData.reps}
              onChange={(e) => {
                if (e.target.value < 999) {
                  setFormData({ ...formData, reps: e.target.value });
                }
              }}
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
        {isLoadingPlans ? (
          <div className={classes.sharePop}>
            <div className={classes.loadingContainer}>
              <CircularProgress size="7em" style={{ color: "#bf5af2" }} />
            </div>
          </div>
        ) : (
          <div className={classes.sharePop}>
            {file && (
              <div className={classes.writeImgDiv}>
                <img src={file} alt="" className={classes.writeImg} />
                <label>
                  <i
                    className={classnames(
                      classes.writeEditIcon,
                      "fa-solid fa-pen-to-square"
                    )}
                  ></i>
                  <div className={classes.fileTypeContainer}>
                    <FileBase
                      type="file"
                      value={file}
                      multiple={false}
                      onDone={({ base64 }) => setFile(base64)}
                    />
                  </div>
                </label>
              </div>
            )}

            {!file && (
              <>
                <label>
                  <i
                    className={classnames(classes.writeIcon, "fas fa-plus")}
                  ></i>
                  <div className={classes.fileTypeContainer}>
                    <FileBase
                      type="file"
                      value={file}
                      multiple={false}
                      onDone={({ base64 }) => setFile(base64)}
                    />
                  </div>
                </label>
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
                <button
                  className={classes.shareSubmit}
                  onClick={handleSharePlan}
                >
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
        )}
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
              setPreviousExercise({ name: "", gifUrl: "", time: 0 });
              setCurrentExercise({
                id: "",
                gifUrl: "",
                name: "",
                time: "",
                sets: "",
                reps: "",
                ind: -1,
              });
              setNextExercise({ name: "", gifUrl: "", time: 0 });
              setTotalTime(0);
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
              onClick={handleSkipPrevious}
            >
              <SkipPreviousIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              style={{ fontSize: "60px" }}
              color="inherit"
              aria-label="remove"
              onClick={() => {
                if (
                  !isPlaying &&
                  currentExercise.ind === layout.length - 1 &&
                  remainingTime === 0
                ) {
                  setPreviousExercise({ name: "", gifUrl: "", time: 0 });
                  setCurrentExercise({
                    ...planExercises.find(
                      (planObj) => planObj.name === layout[0].i
                    ),
                    ind: 0,
                  });
                  let time = 0;
                  for (let i = 0; i < planExercises.length; i++) {
                    time = time + Number(planExercises[i].time);
                  }
                  setTotalTime(time + 1);
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
              onClick={handleSkipNext}
            >
              <SkipNextIcon fontSize="inherit" />
            </IconButton>
          </div>
          <h2 className={classes.timeNumber}>{handleTotalTime()}</h2>
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
