import { Link, useNavigate } from "react-router-dom";
import { Chip, Stack } from "@mui/material";
import classes from "./ExerciseCard.module.css";

export default function ExerciseCard({ exercise }) {
  const navigate = useNavigate();
  const handleBodyPart = (e) => {
    e.preventDefault();
    navigate(`/exercises/search?page=1&bodyPart=${exercise.bodyPart}`);
  };

  const handleTarget = (e) => {
    e.preventDefault();
    navigate(`/exercises/search?page=1&target=${exercise.target}`);
  };

  return (
    <Link
      className={classes.cardContainer}
      to={`/exercise/${exercise._id}`}
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <img
        className={classes.image}
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
      />
      <Stack direction="row">
        <Chip
          className={classes.chip}
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#BF5AF2",
            fontSize: "18px",
            borderRadius: "20px",
            textTransform: "capitalize",
            marginTop: "15px",
          }}
          label={exercise.bodyPart}
          clickable={true}
          onClick={handleBodyPart}
        />
        <Chip
          className={classes.chip}
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#5E5CE6",
            fontSize: "18px",
            borderRadius: "20px",
            textTransform: "capitalize",
            marginTop: "15px",
          }}
          label={exercise.target}
          clickable={true}
          onClick={handleTarget}
        />
      </Stack>
      <h2 className={classes.name}>{exercise.name}</h2>
    </Link>
  );
}
