import { Link } from "react-router-dom";
import classes from "./Plan.module.css";
import classnames from "classnames";
import { Image } from "../../images/login.jpg";
import defaultImage from "../../images/defaultImage.png";

export default function Plan({ plan }) {
  const PF = "http://localhost:5000/images/";
  return (
    <Link to={`/plan/${plan._id}`} className={classes.plan}>
      <img
        className={classes.planImg}
        src={plan.photo || defaultImage}
        alt=""
      />

      <div className={classes.planInfo}>
        <div className={classes.planCat}>{plan.categories}</div>
        <div className={classes.planTitleLine}>
          <div className={classes.planLikesDiv}>
            <i
              className={classnames(
                classes.planLikesIcon,
                "fa-regular",
                "fa-thumbs-up"
              )}
            ></i>
            {plan.likeCount}
          </div>
          <span className={classes.planTitle}>{plan.title}</span>
          <div className={classes.planTemp}></div>
        </div>
        <span className={classes.planAuthor}>By: {plan.username}</span>
        <span className={classes.planDate}>
          {new Date(plan.createdAt).toDateString()}
        </span>
      </div>
      <p className={classes.planDesc}>{plan.desc}</p>
    </Link>
  );
}
