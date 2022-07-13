import axios from "axios";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import classes from "./PlanDetails.module.css";
import TimerIcon from "@mui/icons-material/Timer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function PlanDetails() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const PF = "http://localhost:5000/images/";

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth.authData);

  const [plan, setPlan] = useState({});
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [desc, setDesc] = useState("");
  const [likes, setLikes] = useState(0);
  const [time, setTime] = useState(0);

  const handleLiked = async () => {
    setLikes(likes + 1);
    try {
      await axios.put(`/plans/${plan._id}`, {
        username,
        likeCount: likes + 1,
      });
    } catch (err) {}
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/plans/" + path);
      setPlan(res.data);
      setTitle(res.data.title);
      setFile(res.data.photo);
      setUsername(res.data.username);
      setDesc(res.data.desc);
      setLikes(res.data.likeCount);
      let totalTime = 0;
      res.data.exercises.forEach(e => totalTime += parseInt(e.time));
      setTime(totalTime);
    
    };
    getPost();
  }, [path]);

  return (
    <>
      <Navbar />

      <div className={classes.plan}>
        <div className={classes.planTop}>
          {file && <img src={PF + file} alt="" className={classes.planImg} />}
          <div className={classes.planTitleDiv}>
            <span className={classes.planTitle}>{title}</span>
            <i
              className={classNames(
                classes.planEditTitleIcon,
                "fa-solid fa-pencil"
              )}
            ></i>
            <span className={classes.planAuthor}>by {username}</span>
          </div>

          <label htmlFor="fileInput">
            <i
              className={classNames(
                classes.planEditImgIcon,
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

          <span className={classes.planDate}>
            Created On: {new Date(plan.createdAt).toDateString()}
          </span>

          <div className={classes.planLikes}>
            <i
              className={classNames(
                classes.planLikesIcon,
                "fa-regular fa-thumbs-up"
              )}
              onClick={handleLiked}
            ></i>
            {likes}
          </div>
        </div>
        <div className={classes.planMid}>
          <div className={classes.planCatDiv}>
            <div className={classes.planCat}>Category: {plan.categories}</div>
          </div>
          <div className={classes.planTimeDiv}>
            <div className={classes.planTime}>Duration: {time} s</div>
          </div>
          <div className={classes.planDescDiv}>
            <div className={classes.planDesc}>Description: {desc}</div>
            <i
              className={classNames(
                classes.planDescEdit,
                "fa-solid fa-pen-to-square"
              )}
            ></i>
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
