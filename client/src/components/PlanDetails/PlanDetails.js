import axios from "axios";
import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import classes from "./PlanDetails.module.css";

export default function PlanDetails() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const PF = "http://localhost:5000/images/";

  const {user} = useSelector(state => state.auth.authData);

  const [plan, setPlan] = useState({});
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [desc, setDesc] = useState("");
  const [likes, setLikes] = useState(0);
  const [date, setDate] = useState("");

  const handleLiked = async () => {
    setLikes(likes + 1);
    try {
      await axios.put(`/plans/${plan._id}`, {
        username,
        likeCount: likes+1,
      });
    } catch (err) {}
  }

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/plans/" + path);
      setPlan(res.data);
      setTitle(res.data.title);
      setFile(res.data.photo);
      setUsername(res.data.username);
      setDesc(res.data.desc);
      setLikes(res.data.likeCount);
      setDate(res.data.createdAt);
    };
    getPost();
  }, [path]);

  return (
    <>
      <Navbar />
      <div className={classes.plan}>
        <div className={classes.planTop}>
          {file && (
            <img src={PF + file} alt="" className={classes.planImg} />
          )}
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

          <div className={classes.planLikes}>
            <i
              className={classNames(classes.planLikesIcon,"fa-regular fa-thumbs-up")}
              onClick={handleLiked}
            ></i>
            {likes}
          </div>
        </div>
      </div>
    </>
  );
}
