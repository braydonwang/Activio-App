import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { CircularProgress } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import classes from "./ExerciseDetails.module.css";
import {
  getExercise,
  getSimilarBodyPart,
} from "../../features/exercises/exerciseSlice";

import bodyPartImg from "../../images/body-part.png";
import equipmentImg from "../../images/equipment.png";
import targetImg from "../../images/target.png";
import HorizontalScrollbar from "../HorizontalScrollbar/HorizontalScrollbar";

export default function ExerciseDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { exercises, exercise, similarBodyPart, isLoading } = useSelector(
    (state) => state.exercises
  );

  useEffect(() => {
    dispatch(getExercise(id));
  }, [id]);

  if (!exercise) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress size="7em" />
      </div>
    );
  }

  const { bodyPart, gifUrl, name, target, equipment } = exercise;

  const extraDetail = [
    { icon: bodyPartImg, name: bodyPart },
    { icon: targetImg, name: target },
    { icon: equipmentImg, name: equipment },
  ];

  return (
    <main className={classes.mainContainer}>
      <Navbar />
      <main className={classes.detailContainer}>
        <main className={classes.exerciseContainer}>
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className={classes.image}
          />
          <div className={classes.text}>
            <h1 className={classes.heading}>{name}</h1>
            <h3 className={classes.description}>
              Exercising is an essential aspect of life that not only keeps you
              healthy, but also improves your mood and mental well-being.{" "}
              <span style={{ textTransform: "capitalize", fontWeight: "700" }}>
                {name}
              </span>{" "}
              is one of the best{" "}
              <span style={{ fontWeight: "700" }}>{equipment}</span> exercises
              to target your <span style={{ fontWeight: "700" }}>{target}</span>
              .
            </h3>
            {extraDetail?.map((item, ind) => (
              <div className={classes.items} key={ind}>
                <Button
                  sx={{
                    background: "rgb(78, 6, 137)",
                    borderRadius: "50%",
                    width: "100px",
                    height: "100px",
                    margin: "10px 0",
                  }}
                >
                  <img
                    src={item.icon}
                    alt={bodyPart}
                    style={{ width: "50px", height: "50px" }}
                  />
                </Button>
                <h2 className={classes.itemName}>{item.name}</h2>
              </div>
            ))}
          </div>
        </main>
        <span className={classes.button}>
          <button className={classes.addButton}>
            <AddCircleIcon style={{ marginRight: "10px" }} /> Add to Plan
          </button>
          <button className={classes.removeButton}>
            <RemoveCircleIcon style={{ marginRight: "10px" }} />
            Remove from Plan
          </button>
        </span>
      </main>
      <h2 className={classes.subheading}>
        Similar <span style={{ color: "#bf5af2" }}>Body Part</span> Exercises:
      </h2>
      <HorizontalScrollbar data={similarBodyPart} />
      <h2 className={classes.subheading}>
        Similar <span style={{ color: "#5E5CE6" }}>Target Muscle</span>{" "}
        Exercises:
      </h2>
      <HorizontalScrollbar data={exercises} />
      <h2 className={classes.subheading}>
        Similar <span style={{ color: "#60BFF4" }}>Equipment</span> Exercises:
      </h2>
      <HorizontalScrollbar data={exercises} />
    </main>
  );
}
