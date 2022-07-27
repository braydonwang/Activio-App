import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

import classes from "./Home.module.css";
import { useEffect } from "react";
import { numberOfUsers } from "../../features/users/userSlice";
import { numberOfPlans } from "../../features/plans/planSlice";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { numUsers } = useSelector((state) => state.users);
  const { numPlans } = useSelector((state) => state.plans);

  useEffect(() => {
    dispatch(numberOfUsers());
    dispatch(numberOfPlans());
  }, []);

  return (
    <div className={classes.mainContainer}>
      <Navbar />
      <h1 className={classes.heading}>
        The <span className={classes.ultimateWord}>Ultimate</span> Fitness App
      </h1>
      <h1 className={classes.backgroundText}>ACTIVIO</h1>
      <p className={classes.description}>
        Let us help you keep track and reach your full potential in life
      </p>
      <button className={classes.button} onClick={() => navigate("/signup")}>
        Sign Up Now
      </button>
      <div className={classes.statOptions}>
        <div className={classes.stats}>
          <FontAwesomeIcon icon={faDumbbell} color="white" size="6x" />
          <h3 className={classes.number}>1000+</h3>
          <p className={classes.text}>Exercises</p>
        </div>
        <div className={classes.stats}>
          <FontAwesomeIcon icon={faUsers} color="white" size="6x" />
          <h3 className={classes.number}>{numUsers}</h3>
          <p className={classes.text}>Active Users</p>
        </div>
        <div className={classes.stats}>
          <FontAwesomeIcon icon={faPersonRunning} color="white" size="6x" />
          <h3 className={classes.number}>{numPlans}</h3>
          <p className={classes.text}>Workout Plans Shared</p>
        </div>
        <div className={classes.stats}>
          <FontAwesomeIcon icon={faUtensils} color="white" size="6x" />
          <h3 className={classes.number}>100,000+</h3>
          <p className={classes.text}>Calories Tracked</p>
        </div>
      </div>
    </div>
  );
}
