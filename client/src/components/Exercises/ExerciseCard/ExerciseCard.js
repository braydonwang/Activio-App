import { Link } from "react-router-dom";
import { Chip, Stack, Typography } from "@mui/material";
import classes from "./ExerciseCard.module.css";

export default function ExerciseCard({ exercise }) {
  return (
    <Link className={classes.cardContainer} to={`/exercise/${exercise.id}`}>
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
      <Stack direction="row">
        <Chip
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#BF5AF2",
            fontSize: "18px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
          label={exercise.bodyPart}
        />
        <Chip
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#5E5CE6",
            fontSize: "18px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
          label={exercise.target}
        />
      </Stack>
    </Link>
  );
}
