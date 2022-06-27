import { Box, Stack } from "@mui/material";
import ExerciseCard from "./ExerciseCard/ExerciseCard";
import Navbar from "../Navbar/Navbar";

import classes from "./Exercises.module.css";
import exercises from "./ExerciseData";

export default function Exercises() {
  return (
    <div className={classes.container}>
      <Navbar />
      <h1 className={classes.heading}>Exercises</h1>
      <Box sx={{ mt: { lg: "30px" } }} mt="30px" p="20px">
        <Stack
          direction="row"
          sx={{ gap: { lg: "60px", xs: "40px" } }}
          flexWrap="wrap"
          justifyContent="center"
        >
          {exercises.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))}
        </Stack>
      </Box>
    </div>
  );
}
