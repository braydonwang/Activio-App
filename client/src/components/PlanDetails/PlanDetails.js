import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ResponsiveGridLayout from "react-grid-layout";
import { CircularProgress, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import classes from "./PlanDetails.module.css";
import TimerIcon from "@mui/icons-material/Timer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FileBase from "react-file-base64";
import { copyPlanDraft } from "../../features/planDrafts/planDraftSlice";
import {
  getPlan,
  updateLikes,
  updatePlan,
} from "../../features/plans/planSlice";
import axios from "axios";

const limit = 100;

const getWindowDimensions = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
  };
};

export default function PlanDetails() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth.authData);
  const { isLoading, plan } = useSelector((state) => state.plans);

  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [desc, setDesc] = useState("");
  const [likes, setLikes] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const [time, setTime] = useState(0);

  const [updateTitle, setUpdateTitle] = useState(false);
  const [updateDesc, setUpdateDesc] = useState(false);
  const [deletePop, setDeletePop] = useState(false);

  const isCreator = user.username === username;

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}-5px`;

    e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };

  const [staticLayout, setStaticLayout] = useState([]);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const handleLiked = async () => {
    if (likedUsers.includes(user.username)) {
      setLikedUsers(likedUsers.filter((likeObj) => likeObj !== user.username));
      setLikes(likes - 1);
    } else {
      setLikedUsers([...likedUsers, user.username]);
      setLikes(likes + 1);
    }
    dispatch(updateLikes({ id: plan._id, username: user.username }));
  };

  const handleUpdateTitle = async () => {
    dispatch(
      updatePlan({
        id: plan._id,
        username: user.username,
        desc,
        title,
        likeCount: likes,
        likedUsers: likedUsers,
      })
    );
    setUpdateTitle(false);
  };

  const handleUpdateDesc = async () => {
    dispatch(
      updatePlan({
        id: plan._id,
        username: user.username,
        desc,
        title,
        likeCount: likes,
        likedUsers: likedUsers,
      })
    );
    setUpdateDesc(false);
  };

  const handleUpdateFile = async (base64) => {
    setFile(base64);
    try {
      await axios.put(`/plans/${plan._id}`, {
        username: user.username,
        photo: base64,
      });
    } catch (err) {}
  };

  const handleDeletePlan = async () => {
    try {
      await axios.delete(`/plans/${plan._id}`, {
        data: { username: user.username },
      });
      navigate("/explore");
    } catch (err) {}
  };
  const handleCopy = () => {
    dispatch(
      copyPlanDraft({
        navigate,
        data: {
          username: user.username,
          exercises: plan.exercises,
          layout: plan.savedLayout,
        },
      })
    );
  };

  useEffect(() => {
    dispatch(getPlan(path));
  }, [path]);

  useEffect(() => {
    if (plan) {
      setTitle(plan.title);
      setFile(plan.photo);
      setUsername(plan.username);
      setDesc(plan.desc);
      setLikes(plan.likeCount);
      setLikedUsers(plan.likedUsers);
      let totalTime = 0;
      plan.exercises.forEach((e) => (totalTime += parseInt(e.time)));
      setTime(totalTime);
    }
  }, [plan]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setStaticLayout(
      plan?.savedLayout?.map((planObj) => ({
        ...planObj,
        static: true,
      }))
    );
  }, [plan?.savedLayout]);

  if (!plan || isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress size="7em" style={{ color: "#bf5af2" }} />
      </div>
    );
  }

  console.log(file);

  return (
    <>
      <Navbar />

      <div className={classes.plan} style={{ opacity: deletePop ? 0.1 : 1 }}>
        <div className={classes.planTop}>
          {file && <img src={file} alt="" className={classes.planImg} />}
          <div className={classes.planTitleDiv}>
            {updateTitle ? (
              <input
                type="text"
                value={title}
                className={classes.planTitleInput}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={25}
                autoFocus={true}
              />
            ) : (
              <span className={classes.planTitle}>{title}</span>
            )}

            {isCreator ? (
              updateTitle ? (
                <i
                  className={classNames(
                    classes.planEditTitleIcon,
                    "fa-solid fa-check"
                  )}
                  onClick={handleUpdateTitle}
                ></i>
              ) : (
                <i
                  className={classNames(
                    classes.planEditTitleIcon,
                    "fa-solid fa-pencil"
                  )}
                  onClick={() => setUpdateTitle(true)}
                ></i>
              )
            ) : null}

            <span className={classes.planAuthor}>by {username}</span>
          </div>

          {isCreator && (
            <div className={classes.planTopRightDiv}>
              <label>
                <i
                  className={classNames(
                    classes.planEditImgIcon,
                    "fa-solid fa-pen-to-square"
                  )}
                ></i>
                <div className={classes.fileTypeContainer}>
                  <FileBase
                    type="file"
                    value={file}
                    multiple={false}
                    onDone={({ base64 }) => handleUpdateFile(base64)}
                  />
                </div>
              </label>
              <i
                className={classNames(
                  classes.planDeleteIcon,
                  "fa-solid fa-trash-can"
                )}
                onClick={() => setDeletePop(true)}
              ></i>
            </div>
          )}

          <span className={classes.planDate}>
            Created On: {new Date(plan.createdAt).toDateString()}
          </span>

          <div
            className={classes.planLikes}
            style={{
              color: likedUsers.includes(user.username)
                ? "rgb(133, 171, 241)"
                : "white",
            }}
          >
            <i
              className={classNames(
                classes.planLikesIcon,
                "fa-regular fa-thumbs-up"
              )}
              onClick={handleLiked}
              style={{
                color: likedUsers.includes(user.username)
                  ? "rgb(133, 171, 241)"
                  : "white",
              }}
            ></i>
            {likes}
          </div>
        </div>
        <div className={classes.planMid}>
          <div className={classes.planCatDiv}>
            <div className={classes.planCat}>
              <span style={{ fontWeight: "700" }}>Category:</span>{" "}
              {plan.categories}
            </div>
          </div>
          <div className={classes.planTimeDiv}>
            <div className={classes.planTime}>
              <span style={{ fontWeight: "700" }}>Duration:</span> {time} sec
            </div>
          </div>
          <div className={classes.planDescDiv}>
            {updateDesc ? (
              <div className={classes.planDescSubDiv}>
                <div className={classes.planDesc}>
                  <span style={{ fontWeight: "700" }}>DESCRIPTION:</span>{" "}
                </div>
                <textarea
                  className={classes.planDescInput}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                />
              </div>
            ) : (
              <div className={classes.planDesc}>
                <span style={{ fontWeight: "700" }}>DESCRIPTION:</span> {desc}
              </div>
            )}
            {isCreator ? (
              updateDesc ? (
                <i
                  className={classNames(
                    classes.planEditDescIcon,
                    "fa-solid fa-check"
                  )}
                  onClick={handleUpdateDesc}
                ></i>
              ) : (
                <i
                  className={classNames(
                    classes.planDescEdit,
                    "fa-solid fa-pen-to-square"
                  )}
                  onClick={() => setUpdateDesc(true)}
                ></i>
              )
            ) : null}
          </div>
          <div className={classes.planButtonDiv}>
            <Button
              style={{
                width: "100%",
                justifyContent: "center",
                fontSize: "15px",
                margin: "0",
                padding: "12px",
                color: "white",
              }}
              onClick={handleCopy}
            >
              <ContentCopyIcon style={{ marginRight: "7px" }} />
              Copy to Planner
            </Button>
          </div>
        </div>
      </div>
      <div
        className={classes.gridLayoutContainer}
        style={{ opacity: deletePop ? 0.1 : 1 }}
      >
        <ResponsiveGridLayout
          margin={[50, 0]}
          cols={1}
          rowHeight={250}
          layout={staticLayout}
          width={windowDimensions.width - 18}
          isBounded
        >
          {plan.exercises?.map((planObj, ind) => {
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

      {deletePop && (
        <div className={classes.planDeletePop}>
          <span className={classes.planDeleteTitle}>
            Are you sure you want to delete this plan?
          </span>
          <span className={classes.planButtonList}>
            <button
              className={classes.planDeleteConfirmButton}
              onClick={handleDeletePlan}
            >
              Confirm
            </button>
            <button
              className={classes.planDeleteCancelButton}
              onClick={() => setDeletePop(false)}
            >
              Cancel
            </button>
          </span>
        </div>
      )}
    </>
  );
}
