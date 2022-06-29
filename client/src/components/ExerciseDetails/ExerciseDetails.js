import { useParams } from "react-router-dom";
import { Stack, Typography, Button } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import classes from "./ExerciseDetails.module.css";

import exercises from "../Exercises/ExerciseData";
import bodyPartImg from "../../images/body-part.png";
import equipmentImg from "../../images/equipment.png";
import targetImg from "../../images/target.png";

export default function ExerciseDetails() {
  const { id } = useParams();
  const { bodyPart, gifUrl, name, target, equipment } = exercises.find(
    (exercise) => exercise.id === id
  );

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
            {extraDetail?.map((item) => (
              <div className={classes.items}>
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
    </main>
  );
}
