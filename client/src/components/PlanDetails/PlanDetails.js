import axios from "axios";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { CircularProgress } from "@mui/material";
import classes from "./PlanDetails.module.css";
import TimerIcon from "@mui/icons-material/Timer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FileBase from "react-file-base64";

const limit = 100;

export default function PlanDetails() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth.authData);

  const [plan, setPlan] = useState({});
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [desc, setDesc] = useState("");
  const [likes, setLikes] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const [time, setTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [updateTitle, setUpdateTitle] = useState(false);
  const [updateDesc, setUpdateDesc] = useState(false);

  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`; 
    console.log(e.target.style.height);
    // In case you have a limitation
    e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  }

  const handleLiked = async () => {
    if (likedUsers.includes(user.username)) {
      const idx = likedUsers.indexOf(user.username);
      likedUsers.splice(idx, 1);
      setLikedUsers(likedUsers);
      setLikes(likes - 1);
      try {
        await axios.put(`/plans/${plan._id}`, {
          username,
          likeCount: likes - 1,
          likedUsers: likedUsers,
        });
      } catch (err) {}
    } else {
      likedUsers.push(user.username);
      setLikedUsers(likedUsers);
      setLikes(likes + 1);
      try {
        await axios.put(`/plans/${plan._id}`, {
          username,
          likeCount: likes + 1,
          likedUsers: likedUsers,
        });
      } catch (err) {}
    }
  };

  const handleUpdateTitle = async () => {
    try {
      await axios.put(`/plans/${plan._id}`, {
        username: user.username,
        title,
      });
    } catch (err) {}
    setUpdateTitle(false);
  };

  const handleUpdateDesc = async () => {
    try {
      await axios.put(`/plans/${plan._id}`, {
        username: user.username,
        desc,
      });
    } catch (err) {}
    setUpdateDesc(false);
  };

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      const res = await axios.get("/plans/" + path);
      setPlan(res.data);
      setTitle(res.data.title);
      setFile(res.data.photo);
      setUsername(res.data.username);
      setDesc(res.data.desc);
      setLikes(res.data.likeCount);
      setLikedUsers(res.data.likedUsers);
      let totalTime = 0;
      res.data.exercises.forEach((e) => (totalTime += parseInt(e.time)));
      setTime(totalTime);
      setIsLoading(false);
    };
    getPost();
  }, [path]);

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress size="7em" style={{ color: "#bf5af2" }} />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className={classes.plan}>
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
            {updateTitle ? (
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
            )}

            <span className={classes.planAuthor}>by {username}</span>
          </div>

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
                onDone={({ base64 }) => setFile(base64)}
              />
            </div>
          </label>

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
              <span style={{ fontWeight: "700" }}>Duration:</span> {time} s
            </div>
          </div>
          <div className={classes.planDescDiv}>
            {updateDesc ? (
              <div className={classes.planDescSubDiv}>
                <div className={classes.planDesc}>Description: </div>
                <textarea
                  className={classes.planDescInput}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                />
              </div>
            ) : (
              <div className={classes.planDesc}>Description: {desc}</div>
            )}
            {updateDesc ? (
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
            )}
          </div>
        </div>
      </div>
      <div className={classes.exercises}>
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
      </div>
    </>
  );
}
