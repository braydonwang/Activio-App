import { Box, Stack } from "@mui/material";
import ExerciseCard from "./ExerciseCard/ExerciseCard";
import Navbar from "../Navbar/Navbar";

import classes from "./Exercises.module.css";
import exercises from "./ExerciseData";

export default function Exercises() {
  return (
    <>
      <Navbar />
      <Box sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
        <Stack
          direction="row"
          sx={{ gap: { lg: "110px", xs: "50px" } }}
          flexWrap="wrap"
          justifyContent="center"
        >
          {exercises.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))}
        </Stack>
      </Box>
    </>
  );
}
