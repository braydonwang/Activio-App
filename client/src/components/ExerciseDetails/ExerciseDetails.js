import { useParams } from "react-router-dom";
import { Stack, Typography, Button } from "@mui/material";
import Navbar from "../Navbar/Navbar";
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
    <div className={classes.mainContainer}>
      <Navbar />
      <div className={classes.detailContainer}>
        <div className={classes.exerciseContainer}>
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className={classes.image}
          />
          <div className={classes.text}>
            <h1 className={classes.heading}>{name}</h1>
            <Typography
              sx={{ fontSize: { lg: "24px", xs: "18px" } }}
              color="white"
              marginBottom="30px"
            >
              Exercising is an essential aspect of life that not only keeps you
              healthy, but also improves your mood and mental well-being.{" "}
              <span style={{ textTransform: "capitalize", fontWeight: "700" }}>
                {name}
              </span>{" "}
              is one of the best{" "}
              <span style={{ fontWeight: "700" }}>{equipment}</span> exercises
              to target your <span style={{ fontWeight: "700" }}>{target}</span>
              .
            </Typography>
            {extraDetail?.map((item) => (
              <Stack
                key={item.name}
                direction="row"
                gap="24px"
                alignItems="center"
              >
                <Button
                  sx={{
                    background: "rgb(78, 6, 137)",
                    borderRadius: "50%",
                    width: "100px",
                    height: "100px",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={item.icon}
                    alt={bodyPart}
                    style={{ width: "50px", height: "50px" }}
                  />
                </Button>
                <Typography
                  textTransform="capitalize"
                  sx={{ fontSize: { lg: "30px", xs: "20px" } }}
                >
                  {item.name}
                </Typography>
              </Stack>
            ))}
          </div>
        </div>
        <span className={classes.button}>
          <button>Add to Workout Plan</button>
          <button>Remove from Workout Plan</button>
        </span>
      </div>
    </div>
  );
}
